import Image from "next/image";

interface CarCardProps {
  name: string;
  price: string;
  image: string; // Now only using string for image path
}

export default function CarCard({ name, price, image }: CarCardProps) {
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
}
