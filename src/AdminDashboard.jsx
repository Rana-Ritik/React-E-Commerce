import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaComment, FaPhoneAlt } from 'react-icons/fa'; // Added phone icon
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // States for orders, feedbacks, contact messages
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [contactMessages, setContactMessages] = useState([]); // New state for contact messages
  const [showOrders, setShowOrders] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showContactMessages, setShowContactMessages] = useState(false); // Toggle contact messages visibility
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // If the user is not an admin, redirect them to the login page
  if (user?.role !== 'admin') {
    navigate('/login');
    return null;
  }

  // Fetch orders, feedbacks, and contact messages when component loads
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/order/allorders', {
          headers: { token },
        });

        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          console.error('Error fetching orders:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchFeedback = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/feedback/', {
          headers: { token },
        });

        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    const fetchContactMessages = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/contact', {
          headers: { token },
        });

        setContactMessages(response.data);
      } catch (error) {
        console.error('Error fetching contact messages:', error);
      }
    };

    fetchOrders();
    fetchFeedback();
    fetchContactMessages(); // Fetch contact messages
  }, []);

  // Confirm an order
  const confirmOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/order/confirm/${orderId}`,
        { status: 'confirmed' },
        {
          headers: { token },
        }
      );

      setConfirmedOrder({ orderId, message: `Order #${orderId} has been confirmed!` });
      console.log('Order Confirmed:', response.data);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 p-8">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-white text-center mb-12">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Orders Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-blue-500 text-white p-4 rounded-full">
                <FaBox className="text-3xl" />
              </div>
              <span className="text-xl font-bold text-blue-500">Orders</span>
            </div>
            <p className="text-gray-700 mb-6">View and manage all customer orders.</p>
            <button
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out"
              onClick={() => setShowOrders(!showOrders)}
            >
              {showOrders ? 'Hide Orders' : 'Show Orders'}
            </button>

            {/* Orders Display */}
            {showOrders && orders.length > 0 ? (
              <div className="mt-6">
                {orders.map((order, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md hover:bg-blue-50 transition duration-300 ease-in-out mb-4">
                    <p className="text-gray-800 font-bold">Order #{order._id}</p>
                    <p className="text-gray-600"><strong>Product Name:</strong> {order.productname}</p>
                    <p className="text-gray-600"><strong>Price:</strong> {order.productprice}</p>
                    <p className="text-gray-600"><strong>User:</strong> {order.username}</p>
                    <p className="text-gray-600"><strong>Shipping Address:</strong> {order.useraddress}</p>
                    <p className="text-gray-600"><strong>Status:</strong> {order.orderstatus}</p>
                    <p className="text-gray-600"><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                    <button
                      className="mt-4 py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => confirmOrder(order._id)}
                    >
                      Confirm Order
                    </button>

                    {/* Display Confirmation Message */}
                    {confirmedOrder && confirmedOrder.orderId === order._id && (
                      <div className="mt-4 text-green-600 font-semibold">
                        {confirmedOrder.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 bg-yellow-100 text-yellow-600 rounded-md">
                No orders yet.
              </div>
            )}
          </div>

          {/* Feedback Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-yellow-500 text-white p-4 rounded-full">
                <FaComment className="text-3xl" />
              </div>
              <span className="text-xl font-bold text-yellow-500">Feedback</span>
            </div>
            <p className="text-gray-700 mb-6">View customer feedback and suggestions.</p>
            <button
              className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 focus:outline-none transition duration-300 ease-in-out"
              onClick={() => setShowFeedback(!showFeedback)}
            >
              {showFeedback ? 'Hide Feedback' : 'Show Feedback'}
            </button>

            {/* Feedback Display */}
            {showFeedback && feedbacks.length > 0 ? (
              <div className="mt-6">
                {feedbacks.map((feedback, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md hover:bg-yellow-50 transition duration-300 ease-in-out mb-4">
                    <p className="text-gray-800 font-bold">{feedback.name}</p>
                    <p className="text-gray-600"><strong>Rating:</strong> {feedback.rating} ★</p>
                    <p className="text-gray-600"><strong>Email:</strong> {feedback.email}</p>
                    <p className="text-gray-600"><strong>Feedback:</strong> {feedback.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 bg-yellow-100 text-yellow-600 rounded-md">
                No feedback yet.
              </div>
            )}
          </div>

          {/* Contact Messages Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-green-500 text-white p-4 rounded-full">
                <FaPhoneAlt className="text-3xl" />
              </div>
              <span className="text-xl font-bold text-green-500">Contact Messages</span>
            </div>
            <p className="text-gray-700 mb-6">View and manage all contact us submissions.</p>
            <button
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none transition duration-300 ease-in-out"
              onClick={() => setShowContactMessages(!showContactMessages)}
            >
              {showContactMessages ? 'Hide Messages' : 'Show Messages'}
            </button>

            {/* Contact Messages Display */}
            {showContactMessages && contactMessages.length > 0 ? (
              <div className="mt-6">
                {contactMessages.map((message, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md hover:bg-green-50 transition duration-300 ease-in-out mb-4">
                    <p className="text-gray-800 font-bold">{message.name}</p>
                    <p className="text-gray-600"><strong>Email:</strong> {message.email}</p>
                    <p className="text-gray-600"><strong>Phone:</strong> {message.phone}</p>
                    <p className="text-gray-600"><strong>Message:</strong> {message.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 bg-green-100 text-green-600 rounded-md">
                No contact messages yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
