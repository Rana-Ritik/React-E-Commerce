import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Profile = () => {
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // If there's no user data in localStorage, show a prompt to register
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 text-center">
          <h1 className="text-3xl font-semibold mb-4">You need to register first</h1>
          <p className="mb-4">Please register to view your profile.</p>
          <button
            onClick={() => navigate('/register')}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Go to Register Page
          </button>
        </div>
      </div>
    );
  }

  // If user exists in localStorage, render profile info
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar></Navbar>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 mx-auto">
        <h2 className="text-xl font-semibold">User Information</h2>
        <p><strong>Name: </strong>{user.name}</p>
        <p><strong>Email: </strong>{user.email}</p>
        <p><strong>Bio: </strong>{user.bio || 'N/A'}</p>
        <p><strong>Age: </strong>{user.age}</p>
        <p><strong>Phone: </strong>{user.phone || 'N/A'}</p>
        <p><strong>Address: </strong>{user.address || 'N/A'}</p>
        <p><strong>City: </strong>{user.city || 'N/A'}</p>
        <p><strong>Country: </strong>{user.country || 'N/A'}</p>
      </div>
    </div>
  );
};

export default Profile;
