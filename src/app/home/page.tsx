// src/app/home/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Image, { StaticImageData } from "next/image";
import fordImage from "../assets/images/ford.png";
import m2Image from "../assets/images/m2.png";
import camaroImage from "../assets/images/camaro.png";

const carData = [
  { name: "Ford Fiesta", price: "$20/day", image: fordImage },
  { name: "BMW M2", price: "$80/day", image: m2Image },
  { name: "Camaro SS", price: "$120/day", image: camaroImage },
];

const CarCard = ({ name, price, image }: { name: string; price: string; image: StaticImageData }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white text-center">
      <Image 
        src={image} 
        alt={name} 
        width={500} 
        height={300} 
        className="w-full h-48 object-cover rounded-t-lg" 
      />
      <div className="p-4 bg-blue-700">
        <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
        <p className="text-lg font-semibold text-yellow-400 mb-4">From {price}</p>
        <button className="bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-400 transition">
          Book now
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {

    localStorage.setItem('isAuthenticated', 'false');

    router.push("/");
  };

  /*
  useEffect(() => {

    if (localStorage.getItem('isAuthenticated') !== 'true') {
      router.push('/');
    }
  }, [router]);

  */
 
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-8">
      <div className="flex justify-end w-full mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
      <h1 className="text-4xl font-bold text-blue-400 mb-8">Best deals out there</h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {carData.map((car, index) => (
          <CarCard 
            key={index} 
            name={car.name} 
            price={car.price} 
            image={car.image} 
          />
        ))}
      </div>
    </div>
  );
}

