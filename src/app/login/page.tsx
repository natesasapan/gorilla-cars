'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

/*
const LoginForm = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 ">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        <form className="space-y-4">
            <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
            </label>
            <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 mb-1"
                placeholder="Enter your password"
            />
            </div>
            <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
            >
            Sign In

            </button>
        </form>
        </div>
    </div>
  );
};
*/

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
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

        if (formData.username === USER && formData.password === PASS) {
            // Successful login
            console.log('Login successful');
            
            localStorage.setItem('isAuthenticated', 'true');
            
            router.push('/home');
          } else {
            setError('Invalid username or password');
          }
      
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted with:', formData);
      // After successful login, you might want to:
      // - Store the token in localStorage
      // - Update your auth context
      // - Redirect the user
      
    } catch (err) {
      setError('Login failed. Please try again.');
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