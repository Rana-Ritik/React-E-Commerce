import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/user/login", loginData)
    .then((res) => {
      const { existingUser, token } = res.data.data;
  
      // Save user data and token in localStorage
      localStorage.setItem('user', JSON.stringify(existingUser));
      localStorage.setItem('token', token);
  
      // Redirect based on user role
      if (existingUser.role === 'admin') {
        navigate('/admin-dashboard');  // Navigate to admin dashboard if user is admin
      } else {
        navigate('/');  // Navigate to homepage if user is a regular user
      }
    })
    .catch((err) => {
      setError(err.response?.data?.errmsg || "Login failed. Please try again.");
    });
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              placeholder="youremail@example.com"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>

        {/* Registration Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
