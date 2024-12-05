import React, { useContext, useState, useEffect } from 'react';
 // Assuming you have CartContext and WishlistContext
import dataa from './mobiledata'; // Import the mobile data
import Navbar from './Navbar'; // Assuming you have Navbar component
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';

const Mobiles = () => {
  const { addtocart } = useContext(CartContext);
  const { addtowishlist } = useContext(WishlistContext);
  const [mobiles, setMobiles] = useState([]);

  useEffect(() => {
    // Initially setting the mobile data.
    setMobiles(dataa);
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Latest Mobile Phones</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mobiles.map((mobile) => (
            <div key={mobile.id} className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
              {/* Mobile Details */}
              <div className="text-center">
                {/* Brand Image */}
                <img
                  className="h-12 w-auto mx-auto"
                  src={mobile.brandimage}
                  alt={mobile.brand}
                />
                {/* Mobile Image */}
                <img className="h-40 w-full object-contain rounded-md mt-4" src={mobile.image} alt={mobile.name} />
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-800">{mobile.name}</h2>
                  <p className="text-gray-600 mt-1">{mobile.storage}</p>
                  <p className="text-gray-600 mt-1">{mobile.display}</p>
                  <p className="text-gray-600 mt-1">{mobile.camera}</p>
                  <p className="text-gray-600 mt-1">{mobile.processor}</p>
                  <p className="mt-4 text-xl font-bold text-blue-500">{mobile.price}</p>
                </div>
                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                    onClick={() => addtocart(mobile)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition duration-300"
                    onClick={() => addtowishlist(mobile)}
                  >
                    Wishlist
                  </button>
                </div>
                {/* Place Order Button */}
                <div className="mt-4 text-center">
                  <Link
                    to={`/Mobiles/${mobile.id}`}
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

export default Mobiles;
