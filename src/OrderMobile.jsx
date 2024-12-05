import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dataa from './mobiledata'; // Your mobile data array
import Navbar from './Navbar';
import axios from 'axios';
import { UserContext } from './UserContext';

const OrderMobile = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const [orderDetails, setOrderDetails] = useState({
    mobile: null, // Store mobile details
    username: '',
    useraddress: '',
    userphone: '',
  });
  const navigate = useNavigate(); // For navigating to the Thank You page
  const {user} =useContext(UserContext);

  // Fetch mobile data based on productId
  useEffect(() => {
    const selectedMobile = dataa.find((item) => item.id === parseInt(productId));
    if (selectedMobile) {
      setOrderDetails((prev) => ({
        ...prev,
        mobile: selectedMobile, // Store the mobile in the orderDetails state
      }));
    }
  }, [productId]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value,
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
          productId: orderDetails.mobile.id,
          productCategory: 'mobile',
          productImage: orderDetails.mobile.image,
          productname: orderDetails.mobile.name,
          productprice: orderDetails.mobile.price,
          productstorage: orderDetails.mobile.storage,
          productdisplay: orderDetails.mobile.display,
          productcamera: orderDetails.mobile.camera,
          productprocessor: orderDetails.mobile.processor,
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

  // If mobile data is not available yet, show loading state or placeholder
  if (!orderDetails.mobile) {
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
          {/* Mobile Image and Details */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="h-96 w-full object-contain rounded-md"
              src={orderDetails.mobile.image}
              alt={orderDetails.mobile.name}
            />
          </div>

          {/* Order Form */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h1 className="text-3xl font-bold text-gray-800">{orderDetails.mobile.name}</h1>
            <p className="text-xl text-gray-600">{orderDetails.mobile.brand}</p>
            <div className="mt-4 text-gray-700">
              <DetailRow label="STORAGE" value={orderDetails.mobile.storage} />
              <DetailRow label="DISPLAY" value={orderDetails.mobile.display} />
              <DetailRow label="CAMERA" value={orderDetails.mobile.camera} />
              <DetailRow label="PROCESSOR" value={orderDetails.mobile.processor} />
            </div>
            <div className="mt-6 text-xl font-bold text-blue-500">{orderDetails.mobile.price}</div>

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

export default OrderMobile;
