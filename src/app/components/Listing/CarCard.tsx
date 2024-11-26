import Image, { StaticImageData } from "next/image";

interface CarCardProps {
  name: string;
  price: string;
  image: string | StaticImageData; // Accept both string and StaticImageData
  onDelete: () => void; // Callback for delete action
  onEdit: () => void; // Callback for edit action
}

export default function CarCard({ name, price, image, onDelete, onEdit }: CarCardProps) {
  const imageSrc = typeof image === "string" ? image : image.src; // Handle both string and StaticImageData

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white text-center">
      <Image
        src={imageSrc} // Use the resolved image source
        alt={name}
        width={500}
        height={300}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4 bg-orange-700">
        <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
        <p className="text-lg font-semibold text-yellow-400 mb-4">From {price}</p>
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
          onClick={onEdit} // Open edit modal
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700 transition ml-2"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
