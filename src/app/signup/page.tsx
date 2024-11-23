'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from "../components/Nav/Nav";
import Link from 'next/link';

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const checkUsername = async (username: string) => {
        try {
            const response = await fetch('/api/checkUsername', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return !data.exists;
        } catch (error) {
            console.log("Error checking username:", error);
            return false;
        }
    };

    const handleSignup = async () => {
        try {
            // Username validation
            if (!username) {
                alert("Please enter a username");
                return;
            }

            if (username.length < 3) {
                alert("Username must be at least 3 characters long");
                return;
            }

            // Check if username exists
            const isUsernameAvailable = await checkUsername(username);
            if (!isUsernameAvailable) {
                alert("Username already exists. Please choose another.");
                return;
            }

            // Password validation checks
            if (!password || !confirmPassword) {
                alert("Please fill in both password fields");
                return;
            }

            if (password.length < 8) {
                alert("Password must be at least 8 characters long");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            // If all validations pass, attempt signup
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();
            
            if (response.ok && data.success) {
                console.log('Signup successful!');
                router.push("/signupAccepted");  // Redirect to success page after success
            } else {
                alert(data.error || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.log("Error:", error);
            alert("An error occurred during signup. Please try again.");
        }
    };

    return (
        <>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-black-500 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join us today and get started
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
                                placeholder="Username (minimum 3 characters)"
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
                                placeholder="Password (minimum 8 characters)"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleSignup}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                        >
                            Sign up
                        </button>
                    </div>
                    
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-orange-600 hover:text-orange-500">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
      </>
    );
}