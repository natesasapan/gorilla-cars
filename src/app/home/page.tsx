'use client';

import React, { useEffect, useState } from 'react';
import CarCard from '../components/Listing/CarCard';
import fordImage from "../assets/images/ford.png";
import m2Image from "../assets/images/m2.png";
import camaroImage from "../assets/images/camaro.png";
import { StaticImageData } from 'next/image';
import { useRouter } from "next/navigation"
import Link from 'next/link';

interface Car {
  id: string;
  name: string;
  price: string;
  image: string | StaticImageData;
  make?: string; 
  model?: string;
  year?: string; 
  startDate?: string; 
  endDate?: string; 
}


export default function Home() {
  const hardcodedCars: Car[] = [
    { name: "Ford Fiesta", price: "$20/day", image: fordImage },
    { name: "BMW M2", price: "$80/day", image: m2Image },
    { name: "Camaro SS", price: "$120/day", image: camaroImage },
  ];

  const router = useRouter();
  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    router.push("/");
  };



  const [cars, setCars] = useState<Car[]>([]); // Store fetched + hardcoded cars
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // Fetch cars from the backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars'); // GET request to backend
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json(); // Parse the JSON response
    
        console.log('Fetched cars:', data); // Log the response for debugging
    
        // Update to handle array directly
        const fetchedCars: Car[] = data.map((car: any) => ({
          id: car._id,
          name: `${car.make ?? "Unknown"} ${car.model ?? ""}`, // Combine make + model
          price: car.price ? `$${car.price}/day` : "Price not available",
          image: car.imageLink || "/default-image.png",
        }));
    
        setCars([...hardcodedCars, ...fetchedCars]); // Merge hardcoded and fetched data
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load cars.');
      } finally {
        setLoading(false); // Stop loading
      }
    };
    
    fetchCars();
  }, []);

   // Delete car handler for fetched cars
   const deleteCar = async (id: string) => {
    console.log('Deleting car with id:', id); // Debug log
    try {
      const response = await fetch(`/api/deleteitem?id=${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete car');
      }
  
      // Remove the car from the state
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (err) {
      console.error('Error deleting car:', err);
      setError('Failed to delete car.');
    }
  };
  
  const openEditModal = (car: Car) => {
    setSelectedCar(car); // Set the car to be edited
    setEditModalOpen(true); // Open the modal
  };
  
  const saveEditedCar = async (updatedCar: Car) => {
    try {
      // Split name into make and model
      const [make, model] = updatedCar.name.split(' ');
  
      // Prepare the payload to match backend expectations
      const payload = {
        make,
        model,
        year: '', // Add year if available
        price: updatedCar.price.replace('$', '').replace('/day', ''),
        startDate: '', // Add if needed
        endDate: '', // Add if needed
        imageLink: typeof updatedCar.image === 'string' 
          ? updatedCar.image 
          : updatedCar.image.src
      };
  
      console.log('Editing car - Payload:', payload);
      console.log('Car ID:', updatedCar.id);
  
      const response = await fetch(`/api/edititem?id=${updatedCar.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Failed to edit car');
      }
  
      const { item } = await response.json();
      console.log('Updated item from backend:', item);
  
      // Update the car in the state
      setCars((prevCars) =>
        prevCars.map((car) => 
          car.id === item._id 
            ? { 
                ...car, 
                name: `${item.make} ${item.model}`, 
                price: `$${item.price}/day`,
                image: item.imageLink || car.image
              } 
            : car
        )
      );
  
      setEditModalOpen(false); // Close the modal
    } catch (err) {
      console.error('Complete error in saveEditedCar:', err);
      setError(err instanceof Error ? err.message : 'Failed to edit car.');
    }
  };
  
  const EditModal = ({ car, onSave, onClose }: { 
    car: Car; 
    onSave: (updatedCar: Car) => void; 
    onClose: () => void 
  }) => {
    const [updatedCar, setUpdatedCar] = useState<Car>(car);
  
    const handleChange = (field: keyof Car, value: string) => {
      setUpdatedCar((prev) => ({ ...prev, [field]: value }));
    };

    
    
  
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-1/3">
          <h2 className="text-xl font-bold mb-4">Edit Car</h2>
    
          {/* Name Input */}
          <label htmlFor="car-name" className="block mb-2 font-semibold">Name (Make Model):</label>
          <input
            id="car-name"
            type="text"
            value={updatedCar.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="border p-2 mb-4 w-full"
            placeholder="Name (e.g., Toyota Corolla)"
          />
    
          {/* Price Input */}
          <label htmlFor="car-price" className="block mb-2 font-semibold">Price Per Day:</label>
          <input
            id="car-price"
            type="text"
            value={updatedCar.price}
            onChange={(e) => handleChange('price', e.target.value)}
            className="border p-2 mb-4 w-full"
            placeholder="Price (e.g., $80/day)"
          />
    
          {/* Image URL Input */}
          <label htmlFor="car-image" className="block mb-2 font-semibold">Image URL:</label>
          <input
            id="car-image"
            type="text"
            value={typeof updatedCar.image === 'string' ? updatedCar.image : updatedCar.image.src}
            onChange={(e) => handleChange('image', e.target.value)}
            className="border p-2 mb-4 w-full"
            placeholder="Image URL"
          />
    
          {/* Action Buttons */}
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
  }
  
  
  

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-black text-white p-8">
      <div className="w-full flex items-center justify-center relative mb-8">
        <h1 className="text-3xl font-bold text-orange-500">Gorilla Cars</h1>
        <div className="absolute right-8 flex space-x-4">
          <a href="/item" className="text-orange-400 text-med font-semibold hover:underline">
            Add Items
          </a>
          <button onClick={handleLogout}className="text-orange-400 text-med font-semibold hover:underline">
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
            onDelete={() => deleteCar(car.id)}
            onEdit={() => openEditModal(car)}
          />
        ))}
      </div>
    </div>
  );
};