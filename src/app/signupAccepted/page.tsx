'use client'
import { useRouter } from "next/navigation";

export default function SubmissionSuccess() {
    const router = useRouter();
    
    const handleHome = () => {
        router.push("/");
    };
    
    const handleLogin = () => {
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black-500 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Signup Complete!
                    </h2>
                    <p className="mt-2 text-center text-lg text-gray-600">
                        You have successfully signed up.
                    </p>
                </div>
                
                <div className="mt-8 space-y-4">
                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={handleLogin}
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                        >
                            Login
                        </button>
                        
                        <button
                            onClick={handleHome}
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                        >
                            Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}