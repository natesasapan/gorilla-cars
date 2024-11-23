'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from "../components/Nav/Nav";
import Link from 'next/link';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            // Validation checks
            if (!username || !password) {
                alert("Please enter both username and password");
                return;
            }

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
            
            if (!response.ok) {
                if (response.status === 401) {
                    alert("Invalid username or password. Please try again.");
                    return;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            if (data.success) {
                console.log('Login successful!');
                router.push("/home");
            } else {
                if (data.error === 'user_not_found') {
                    alert("Username not found. Please check your username or sign up for a new account.");
                } else if (data.error === 'invalid_password') {
                    alert("Incorrect password. Please try again.");
                } else {
                    alert(data.error || "Login failed. Please try again.");
                }
                console.log('Login failed!');
            }
        } catch (error) {
            console.log("Error:", error);
            alert("An error occurred during login. Please try again.");
        }
    };


    return (
        <>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-black-500 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to your account
                    </p>
                </div>
                <div className="mt-8 space-y-4">
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleLogin}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                        >
                            Sign in
                        </button>
                    </div>
                    
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/signup" className="font-medium text-orange-600 hover:text-orange-500">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
}