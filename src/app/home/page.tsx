'use client';

import React, { useEffect, useState } from 'react';
import CarCard from '../components/Listing/CarCard';
import { StaticImageData } from 'next/image';
import { useRouter } from "next/navigation"

interface Car {
  id: string;
  name: string;
  price: string;
  image: string | StaticImageData;
  make: string;
  model: string;
  year: string;
  startDate: string;
  endDate: string;
}

export default function Home() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();

        console.log('Fetched cars:', data);

        const fetchedCars: Car[] = data.map((car: any) => ({
          id: car._id,
          name: `${car.make ?? "Unknown"} ${car.model ?? ""}`,
          price: car.price ? `$${car.price}/day` : "Price not available",
          image: car.imageLink || "/default-image.png",
          make: car.make ?? "Unknown",
          model: car.model ?? "",
          year: car.year ?? "N/A",
          startDate: car.startDate?.split('T')[0] ?? "Not specified",  // Get just the date part
          endDate: car.endDate?.split('T')[0] ?? "Not specified"      // Get just the date part
        }));

        setCars([...fetchedCars]);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load cars.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);

  const deleteCar = async (id: string) => {
    const isConfirmed = confirm('Are you sure you want to delete this car? This action cannot be undone.');
    
    if (!isConfirmed) {
      return;
    }

    console.log('Deleting car with id:', id);
    try {
      const response = await fetch(`/api/deleteitem?id=${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete car');
      }

      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (err) {
      console.error('Error deleting car:', err);
      setError('Failed to delete car.');
    }
  };
  
  const openEditModal = (car: Car) => {
    setSelectedCar(car);
    setEditModalOpen(true);
  };

  const saveEditedCar = async (updatedCar: Car) => {
    const [make, model] = updatedCar.name.split(' ');
  
    // Make/Model validation
    const makeRegex = /^[A-Za-z\s-]{2,}$/;
    const modelRegex = /^[A-Za-z0-9\s-]{1,}$/;
    
    if (!makeRegex.test(make.trim())) {
      alert("Make must be at least 2 characters long and contain only letters, spaces, and hyphens");
      return;
    }
  
    if (!modelRegex.test(model.trim())) {
      alert("Model must contain only letters, numbers, spaces, and hyphens");
      return;
    }
  
    // Year validation
    const yearNum = parseInt(updatedCar.year);
    const currentYear = new Date().getFullYear();
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear + 1) {
      alert(`Year must be between 1900 and ${currentYear + 1}`);
      return;
    }
  
    // Price validation
    const priceNum = parseFloat(updatedCar.price.replace('$', '').replace('/day', ''));
    if (isNaN(priceNum) || priceNum <= 0 || priceNum > 1000) {
      alert("Price must be a positive number up to $1000 per day");
      return;
    }
  
    // Date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    // Add time to the dates to prevent timezone issues
    const start = new Date(updatedCar.startDate + 'T00:00:00');
    const end = new Date(updatedCar.endDate + 'T00:00:00');
  
    if (start < today) {
      alert("Start date must be today or later");
      return;
    }
  
    if (end < today) {
      alert("End date must be today or later");
      return;
    }
  
    if (end < start) {
      alert("End date must be after start date");
      return;
    }
  
    const daysDifference = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDifference > 30) {
      alert("Maximum rental period is 30 days");
      return;
    }
  
    // Image URL validation
    const imageUrl = typeof updatedCar.image === 'string' ? updatedCar.image : updatedCar.image.src;
    try {
      new URL(imageUrl);
    } catch {
      alert("Please enter a valid image URL");
      return;
    }
      
    try {
      const payload = {
        make: make.trim(),
        model: model.trim(),
        year: yearNum,
        price: priceNum,
        startDate: updatedCar.startDate,
        endDate: updatedCar.endDate,
        imageLink: imageUrl
      };
  
      console.log(JSON.stringify(payload));
  
      const response = await fetch(`/api/editItem?id=${updatedCar.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to edit car');
        return;
      }
  
      const { item } = await response.json();
  
      setCars((prevCars) =>
        prevCars.map((car) => 
          car.id === item._id 
            ? { 
                ...car, 
                name: `${item.make} ${item.model}`,
                year: item.year,
                price: `$${item.price}/day`,
                startDate: item.startDate?.split('T')[0] || '', // Format the date
                endDate: item.endDate?.split('T')[0] || '',     // Format the date
                image: item.imageLink || car.image
              } 
            : car
        )
      );
  
      setEditModalOpen(false);
    } catch (err) {
      console.error('Error in saveEditedCar:', err);
      alert('Failed to edit car. Please try again.');
    }
  };
  
  const EditModal = ({ car, onSave, onClose }: { 
    car: Car; 
    onSave: (updatedCar: Car) => void; 
    onClose: () => void 
  }) => {
    // Format the initial dates when creating the updatedCar state
    const initialCar = {
      ...car,
      startDate: car.startDate ? new Date(car.startDate).toISOString().split('T')[0] : '',
      endDate: car.endDate ? new Date(car.endDate).toISOString().split('T')[0] : ''
    };
    
    const [updatedCar, setUpdatedCar] = useState<Car>(initialCar);
  
    const handleChange = (field: keyof Car, value: string) => {
      setUpdatedCar((prev) => ({ ...prev, [field]: value }));
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-orange-500 p-6 rounded shadow-lg w-1/3">
          <h2 className="text-xl font-bold mb-4 text-center">Edit Car</h2>
  
          <label htmlFor="car-name" className="block mb-2 font-semibold text-black">Name (Make Model):</label>
          <input
            id="car-name"
            type="text"
            value={updatedCar.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="border p-2 mb-4 w-full text-black"
            placeholder="Name (e.g., Toyota Corolla)"
          />
  
          <label htmlFor="car-year" className="block mb-2 font-semibold text-black">Year:</label>
          <input
            id="car-year"
            type="text"
            value={updatedCar.year}
            onChange={(e) => handleChange('year', e.target.value)}
            className="border p-2 mb-4 w-full text-black"
            placeholder="Year (e.g., 2020)"
          />
  
          <label htmlFor="start-date" className="block mb-2 font-semibold text-black">Available From:</label>
          <input
            id="start-date"
            type="date"
            value={updatedCar.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            className="border p-2 mb-4 w-full text-black"
          />
  
          <label htmlFor="end-date" className="block mb-2 font-semibold text-black">Available Until:</label>
          <input
            id="end-date"
            type="date"
            value={updatedCar.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
            className="border p-2 mb-4 w-full text-black"
          />
  
          <label htmlFor="car-price" className="block mb-2 font-semibold text-black">Price Per Day:</label>
          <input
            id="car-price"
            type="text"
            value={updatedCar.price}
            onChange={(e) => handleChange('price', e.target.value)}
            className="border p-2 mb-4 w-full text-black"
            placeholder="Price (e.g., $80/day)"
          />
  
          <label htmlFor="car-image" className="block mb-2 font-semibold text-black">Image URL:</label>
          <input
            id="car-image"
            type="text"
            value={typeof updatedCar.image === 'string' ? updatedCar.image : updatedCar.image.src}
            onChange={(e) => handleChange('image', e.target.value)}
            className="border p-2 mb-4 w-full text-black"
            placeholder="Image URL"
          />
  
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => onSave(updatedCar)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-black text-white p-8">
      <div className="w-full flex items-center justify-center relative mb-8">
        <h1 className="text-3xl font-bold text-orange-500">Gorilla Cars</h1>
        <div className="absolute right-8 flex space-x-4">
          <a href="/item" className="text-orange-400 text-med font-semibold hover:underline">
            Add Items
          </a>
          <button onClick={handleLogout} className="text-orange-400 text-med font-semibold hover:underline">
            Logout
          </button>
        </div>
      </div>
      
      <h2 className="text-4xl font-bold text-gray-400 mb-8">Best deals out there!</h2>
      
      {loading && <p>Loading cars...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {cars.map((car, index) => (
          <CarCard
            key={index}
            name={car.name}
            price={car.price}
            image={car.image}
            year={car.year}
            startDate={car.startDate}
            endDate={car.endDate}
            onDelete={() => deleteCar(car.id)}
            onEdit={() => openEditModal(car)}
          />
        ))}
      </div>

      {editModalOpen && selectedCar && (
        <EditModal
          car={selectedCar}
          onSave={saveEditedCar}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
}