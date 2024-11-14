'use client'
import React from 'react';
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function CarRentalForm() {
    const router = useRouter();

    const handleLogout = () => {
  
      localStorage.setItem('isAuthenticated', 'false');
  
      router.push("/");
    };

    return (
    
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
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
              />
              <span className="text-black font-medium">to</span>
              <input
                id="dateTo"
                type="date"
                className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-center">
              <button
                onClick={handleLogout}
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
};