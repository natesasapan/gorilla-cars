'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Login() {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            console.log("Attempting login..."); 
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            // Add error checking
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
              console.log('Login successful!');
              router.push("/home")
            } else {
              console.log('Login failed!');
            }

        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-gray-700 mb-1"
                placeholder="Enter your username"
            />
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-gray-700 mb-1"
                placeholder="Enter your password"
            />
            <button 
                onClick={handleLogin}
                className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
                Test Login
            </button>
        </div>
    );
}

  