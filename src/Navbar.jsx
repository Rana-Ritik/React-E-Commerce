import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { FaUserCircle } from 'react-icons/fa'; // Font Awesome icon for the profile icon

const Navbar = () => {
  const { user, makeUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

  const handleLogout = () => {
    makeUser(null);
    localStorage.removeItem("token");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='bg-gray-800 p-4 shadow'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-white text-2xl font-bold'>
          A2Z__WORLD__
        </Link>
        <div className='space-x-4'>
          {/* Profile Icon and Menu */}
          <div className='relative'>
            <button onClick={toggleMenu} className='text-gray-300 hover:text-white'>
              <FaUserCircle size={30} />
            </button>
            {isMenuOpen && (
              <div className='absolute right-0 mt-1 w-48 bg-white shadow-lg rounded-md p-4 z-20'>
                <div className='flex flex-col'>
                  <Link to='/profile' className='text-gray-800 hover:bg-gray-100 py-2 px-4 rounded-md'>My Profile</Link>
                  <Link to='/myorders' className='text-gray-800 hover:bg-gray-100 py-2 px-4 rounded-md'>My Orders</Link>
                  <Link to='/cart' className='text-gray-800 hover:bg-gray-100 py-2 px-4 rounded-md'>My Cart</Link>
                  <Link to='/wishlist' className='text-gray-800 hover:bg-gray-100 py-2 px-4 rounded-md'>My Wishlist</Link>
                  <Link to='/contact' className='text-gray-800 hover:bg-gray-100 py-2 px-4 rounded-md'>Contact Us</Link>
                  <Link to='/feedback' className='text-gray-800 hover:bg-gray-100 py-2 px-4 rounded-md'>Feedback</Link>

                  {/* Conditional Rendering for Logout or Login/Register */}
                  {user ? (
                    <button onClick={handleLogout} className='text-gray-800 hover:bg-gray-100 py-2 px-4 rounded-md mt-2'>Log Out</button>
                  ) : (
                    <>
                      <Link to='/login' className='text-gray-800 hover:bg-gray-100 py-2 px-4 rounded-md mt-2'>Login</Link>
                      <Link to='/register' className='text-gray-800 hover:bg-gray-100 py-2 px-4 rounded-md mt-2'>Register</Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
