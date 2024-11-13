/*
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const USER = 'admin';
  const PASS = 'password123';

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: 'testuser',
              password: 'testpass'
          })
      });

      const data = await response.json();
      
      if (data.success) {
          console.log('Login successful!');
          // Redirect or update UI
      } else {
          console.log('Login failed!');
          // Show error message
      }
  } catch (error) {
      console.log('Login error:', error);
  } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
            </label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-gray-700 mb-1"
                placeholder="Enter your username"
            />
            </div>
            <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
            </label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-gray-700 mb-1"
                placeholder="Enter your password"
            />
            </div>
            {error && (
            <div className="text-red-500 text-sm">{error}</div>
            )}
            <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
            >
            {loading ? 'Signing in...' : 'Sign In'}
            </button>
        </form>
        </div>
    </div>
  );
};

export default LoginForm;
*/

'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Signup() {
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

  