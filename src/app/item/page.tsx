'use client'
import React from 'react';
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function CarRentalForm() {
  const [make, setMake] = useState(""); 
  const [carModel, setModel] = useState("");
  const [year, setYear] = useState(""); 
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();

  const isValidDate = (dateString:string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmission = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
   
    // Form validation
    if (!make || !carModel || !year || !price || !startDate || !endDate || !imageUrl) {
      alert("Please fill in all fields");
      return;
    }
 
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(year);
    if (yearNum < 1900 || yearNum > currentYear + 1) {
      alert("Please enter a valid year");
      return;
    }
 
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert("Please enter a valid price");
      return;
    }
 
    if (!isValidDate(startDate)) {
      alert("Start date must be after today");
      return;
    }
    if (!isValidDate(endDate)) {
      alert("End date must be after today");
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      alert("End date must be after start date");
      return;
    }
    if (!isValidUrl(imageUrl)) {
      alert("Please enter a valid image URL");
      return;
    }

    // Database submission
    try {
      console.log("Sending to DB");
      const response = await fetch('/api/addItem', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              make: make,
              model: carModel,
              year: parseInt(year),
              price: parseFloat(price),
              startDate: startDate,
              endDate: endDate,
              imageLink: imageUrl      
          })
      });

      if (response.ok) {
        // Only navigate if the submission was successful
        router.push("/submitAccepted");
      } else {
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
};


  const handleBack = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <button
        onClick={handleBack}
        className="absolute left-4 top-4 bg-orange-500 hover:bg-blue-800 text-black font-semibold px-4 py-2 rounded transition"
        type="submit"
      >
        Back
      </button>
      <div className="w-full max-w-md bg-orange-500 rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center text-black">
            Gorilla Cars
          </h1>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="make" 
              className="block text-black font-medium"
            >
              Vehicle Make:
            </label>
            <input
              id="make"
              type="text"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              placeholder="Enter the vehicle make"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="model" 
              className="block text-black font-medium"
            >
              Vehicle Model:
            </label>
            <input
              id="model"
              type="text"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
              value={carModel}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Enter the vehicle model"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="year" 
              className="block text-black font-medium"
            >
              Year:
            </label>
            <input
              id="year"
              type="number"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter the vehicle year"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="price" 
              className="block text-black font-medium"
            >
              Price Per Day:
            </label>
            <input
              id="price"
              type="number"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter the desired price per day"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="imageUrl" 
              className="block text-black font-medium"
            >
              Image URL:
            </label>
            <input
              id="imageUrl"
              type="url"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter the URL of the vehicle image"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="dates" 
              className="block text-black font-medium"
            >
              Dates Available:
            </label>
            <div className="flex gap-2 items-center">
              <input
                id="dateFrom"
                type="date"
                className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="text-black font-medium">to</span>
              <input
                id="dateTo"
                type="date"
                className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmission}
              className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-2 rounded transition"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


/*
    try {
      console.log("Sending to DB"); 
      const response = await fetch('/api/addItem', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              make: make,
              model: carModel,
              year: year,
              price: price,
              startDate: startDate,
              endDate: endDate,
              imageLink: imageUrl       
          })
      });

    } catch (error) {
      console.log("Error:", error);
    }
*/