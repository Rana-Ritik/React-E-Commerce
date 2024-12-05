import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import data from './laptopdata'; // Your laptop data array
import Navbar from './Navbar';
import axios from 'axios';
import { UserContext } from './UserContext';

const OrderLaptop = () => {
  const { productId } = useParams(); // Get the laptop id from the URL
  const [orderDetails, setOrderDetails] = useState({
    laptop: null, // Store laptop details
    username: '',
    useraddress: '',
    userphone: '',
   
  });
  const navigate = useNavigate(); // For navigating to the Thank You page
  const {user} =useContext(UserContext);

  // Fetch laptop data based on productId
  useEffect(() => {
    const selectedLaptop = data.find((item) => item.id === parseInt(productId));
    if (selectedLaptop) {
      setOrderDetails((prev) => ({
        ...prev,
        laptop: selectedLaptop // Store the laptop in the orderDetails state
      }));
    }
  }, [productId]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle order placement (send orderDetails to the backend)
  const handlePlaceOrder = async () => {
    if (orderDetails.username && orderDetails.useraddress && orderDetails.userphone) {
      try {
        const orderData = {
          userId:user._id,
          username: orderDetails.username,
          useraddress: orderDetails.useraddress,
          userphone: orderDetails.userphone,
          productId: orderDetails.laptop.id,
          productCategory: 'laptop',
          productImage: orderDetails.laptop.image,
          productname: orderDetails.laptop.name,
          productprice: orderDetails.laptop.price,
          productspeciallity: orderDetails.laptop.speciallity,
          productdisplay: orderDetails.laptop.display,
          productbatterybackup: orderDetails.laptop.batterybackup
        };
        

        // Saving order in localStorage
        const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        savedOrders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(savedOrders));

        // Send the orderDetails to the server
        await axios.post("http://localhost:8000/order/create", orderData);
        alert(`Order placed for ${orderData.productname}!`);
        navigate('/thankyou'); // Redirect to Thank You page after order
      } catch (error) {
        console.error("Error placing order:", error);
        alert("There was an error placing your order. Please try again.");
      }
    } else {
      alert("Please fill in all fields before placing the order.");
    }
  };

  // If laptop data is not available yet, show loading state or placeholder
  if (!orderDetails.laptop) {
    return (
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Laptop Image and Details */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="h-96 w-full object-contain rounded-md"
              src={orderDetails.laptop.image}
              alt={orderDetails.laptop.name}
            />
          </div>
          
          {/* Order Form */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h1 className="text-3xl font-bold text-gray-800">{orderDetails.laptop.name}</h1>
            <p className="text-xl text-gray-600">{orderDetails.laptop.brand}</p>
            <div className="mt-4 text-gray-700">
              <DetailRow label="PRICE" value={orderDetails.laptop.price} />
              <DetailRow label="SPECIALLITY" value={orderDetails.laptop.speciallity} />
              <DetailRow label="DISPLAY" value={orderDetails.laptop.display} />
              <DetailRow label="BATTERY-BACKUP" value={orderDetails.laptop.batterybackup} />
            </div>
            <div className="mt-6 text-xl font-bold text-blue-500">{orderDetails.laptop.price}</div>

            {/* Order Confirmation Form */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h3>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium">Name</label>
              <input
                type="text"
                name="username"
                value={orderDetails.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium">Address</label>
              <input
                type="text"
                name="useraddress"
                value={orderDetails.useraddress}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter your delivery address"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium">Phone Number</label>
              <input
                type="text"
                name="userphone"
                value={orderDetails.userphone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter your phone number"
              />
            </div>
           

            {/* Button to place the order */}
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for displaying label and value pairs
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between text-gray-700 mt-2">
    <span className="font-semibold">{label}:</span>
    <span>{value}</span>
  </div>
);

export default OrderLaptop;
