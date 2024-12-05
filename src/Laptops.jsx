import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import data from './laptopdata'; // Your laptop data array
import Navbar from './Navbar';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';



const Laptops = () => {
  const { addtocart } = useContext(CartContext);
  const { addtowishlist } = useContext(WishlistContext);
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    // Initially setting the mobile data.
    setLaptops(data);
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Laptops</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((laptop) => (
            <div key={laptop.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Laptop Image */}
              <img className="w-full h-56 object-cover" src={laptop.image} alt={laptop.name} />
              
              {/* Laptop Info */}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{laptop.name}</h2>
                <p className="text-gray-600">{laptop.brand}</p>
                <p className="text-gray-700">{laptop.speciallity}</p>
                <p className="text-blue-500 font-bold">{laptop.price}</p>
                
                {/* Brand Image */}
                <div className="mt-4 mb-4">
                  <img className="w-24 h-24 object-contain" src={laptop['brand-image']} alt={laptop.brand} />
                </div>

               {/* Buttons */}
               <div className="flex justify-between mt-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                    onClick={() => addtocart(laptop)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition duration-300"
                    onClick={() => addtowishlist(laptop)}
                  >
                    Wishlist
                  </button>
                </div>
                {/* Place Order Button */}
                <div className="mt-4 text-center">
                  <Link
                    to={`/Laptops/${laptop.id}`}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                  >
                    Place Order
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Laptops;
