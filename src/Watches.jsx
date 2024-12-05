import React, { useContext } from 'react';
import data2 from './watchesdata'; // Import the watches data array
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';


const Watches = () => {
  const { addtocart } = useContext(CartContext);
  const { addtowishlist } = useContext(WishlistContext);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Watches Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data2.map((watch) => (
            <div key={watch.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Watch Image */}
              <img className="w-full h-56 object-cover" src={watch.image} alt={watch.name} />

              {/* Watch Info */}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{watch.name}</h2>
                <p className="text-gray-600">{watch.brand}</p>
                <p className="text-gray-700">{watch.speciallity}</p>
                <p className="text-blue-500 font-bold">{watch.price}</p>

                {/* Brand Image */}
                <div className="mt-4 mb-4">
                  <img className="w-24 h-24 object-contain" src={watch.brandimage} alt={watch.brand} />
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                    onClick={() => addtocart(watch)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition duration-300"
                    onClick={() => addtowishlist(watch)}
                  >
                    Wishlist
                  </button>
                </div>

                {/* Place Order Button */}
                <div className="mt-4 text-center">
                  <Link
                    to={`/watches/${watch.id}`}
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

export { Watches };
