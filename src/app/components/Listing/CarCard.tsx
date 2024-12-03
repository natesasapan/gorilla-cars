import Image, { StaticImageData } from "next/image";

interface CarCardProps {
  name: string;
  price: string;
  image: string | StaticImageData;
  year: string;
  startDate: string;
  endDate: string;
  onDelete: () => void;
  onEdit: () => void;
}

export default function CarCard({ 
  name, 
  price, 
  image, 
  year,
  startDate,
  endDate,
  onDelete, 
  onEdit 
}: CarCardProps) {
  const imageSrc = typeof image === "string" ? image : image.src;

  // Format dates to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T12:00:00'); // Add noon time to avoid timezone issues
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC' // Force UTC interpretation
    });
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white text-center">
      <Image
        src={imageSrc}
        alt={name}
        width={500}
        height={300}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4 bg-orange-700">
        <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
        <p className="text-xl font-bold text-white mb-1">{year}</p>
        <p className="text-lg font-semibold text-yellow-400 mb-2">From {price}</p>
        <div className="text-sm text-white mb-4">
          <p>Available: {formatDate(startDate)} - {formatDate(endDate)}</p>
        </div>
        <button
          className="bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-400 transition"
        >
          Book now
        </button>
        <button
          onClick={onDelete}
          className="bg-red-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-700 transition ml-2"
        >
          Delete
        </button>
        <button
          onClick={onEdit}
          className="bg-gray-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700 transition ml-2"
        >
          Edit
        </button>
      </div>
    </div>
  );
}