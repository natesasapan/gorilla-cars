import CarCard from "../components/Listing/CarCard";

const carData = [
  { name: "Ford Fiesta", price: "$20/day", image: "/images/ford-fiesta.jpg" },
  { name: "BMW M2", price: "$80/day", image: "/images/bmw-m2.jpg" },
  { name: "Camaro SS", price: "$120/day", image: "/images/camaro-ss.jpg" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-center text-white p-8">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">Best deals out there</h1>
      <div className="grid gap-8 md:grid-cols-3">
        {carData.map((car, index) => (
          <CarCard key={index} name={car.name} price={car.price} image={car.image} />
        ))}
      </div>
    </div>
  );
}
