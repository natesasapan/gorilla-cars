// components/Listing/CarCard.tsx

interface CarCardProps {
  name: string;
  price: string;
  image: string;
}

export default function CarCard({ name, price, image }: CarCardProps) {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600">{price}</p>
        <button className="mt-4 w-full bg-yellow-500 text-black py-2 rounded">
          Book now
        </button>
      </div>
    </div>
  );
}

