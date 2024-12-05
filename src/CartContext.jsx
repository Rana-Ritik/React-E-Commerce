import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';  // Import axios for API calls
import { UserContext } from './UserContext';

let CartContext = createContext();

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  const{user} =useContext(UserContext);

  // Load cart from localStorage when the component mounts (for fallback)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Function to add item to cart
  async function addtocart(item) {
    try {
      // Send a request to your backend to add the item to the database
      const response = await axios.post('http://localhost:8000/cart/create', {
        userId:user._id,
        productname: item.name,
        productimage: item.image,
        productdisplay: item.display,
        productprice: item.price,
        productspeciallity: item.speciallity,
        productbatterybackup: item.batterybackup,
        productstorage: item.storage,
        productcamera: item.camera,
        productprocessor: item.processor,
        productusage: item.usage,
      });

      // If the item was added successfully, update the cart state
      if (response.status === 200) {
        const updatedCart = [...cart, item]; // Add item to the local cart state
        setCart(updatedCart);

        // Store the updated cart in localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

  // Function to remove item from cart
  async function removeFromCart(itemId) {
    try {
      // Optionally, you could also delete the item from the backend (if your API supports it)
      // const response = await axios.delete(`http://localhost:8000/cart/remove/${itemId}`);

      const updatedCart = cart.filter(item => item.id !== itemId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }

  return (
    <CartContext.Provider value={{ cart, addtocart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartContextProvider };
