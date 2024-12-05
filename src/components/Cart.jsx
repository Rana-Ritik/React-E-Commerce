import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartContext';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';

const Cart = () => {
  const {  removeFromCart,addtocart  } = useContext(CartContext);
  const[cartitems,setCartitems] =useState([])

  useEffect(() => {
    let token = localStorage.getItem("token");
 
    if(token){
     axios.get("http://localhost:8000/cart",{headers:{"Token":token}})
     .then((res)=>{
      console.log(res)
     setCartitems(res.data)

    })
     .catch((err)=>console.log(err))
    }
   }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar></Navbar>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Your Cart</h1>
        {cartitems.length === 0 ? (
          <div className="text-center text-lg text-gray-600">Your cart is empty.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cartitems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-4">
                <div className="text-center">
                  <img className="h-40 w-full object-contain rounded-md mt-4" src={item.productimage} alt={item.productname} />
                  <h2 className="text-xl font-semibold text-gray-800">{item.productname}</h2>
                  <p className="text-gray-600 mt-1">{item.productstorage}</p>
                  <p className="mt-4 text-xl font-bold text-blue-500">{item.productprice}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mt-4"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Cart;
