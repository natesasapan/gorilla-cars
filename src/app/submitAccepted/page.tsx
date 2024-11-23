'use client'
import { useRouter } from "next/navigation";

export default function SubmissionSuccess() {
  const router = useRouter();

  const handleHome = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-orange-500 rounded-lg p-8 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-4">
            Submission Accepted!
          </h1>
          <p className="text-lg text-black">
            Your vehicle has been successfully added to our listings.
          </p>
        </div>
        
        <button
          onClick={handleHome}
          className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded transition"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}