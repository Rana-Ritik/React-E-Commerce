import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Assuming you have a Navbar component
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);


  useEffect(() => {
   let token = localStorage.getItem("token");

   if(token){
    axios.get("http://localhost:8000/order",{headers:{"Token":token}})
    .then((res)=>setOrders(res.data))
    .catch((err)=>console.log(err))
   }
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

        {/* Display orders if they exist */}
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <div>
            {orders.map((order, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-6">
                {/* Product Image */}
                <div className="mb-4">
                  <img 
                    src={order.productimage} // Assuming the image URL is saved in the order object
                    alt={order.productname}
                    className="h-48 w-auto object-contain rounded-md mx-auto"
                  />
                </div>

                {/* Product Information */}
                <h3 className="text-2xl font-bold text-gray-800">{order.productname}</h3>
                <p className="text-lg text-gray-600">Category: {order.productcategory}</p>
                <p className="text-xl font-semibold text-blue-500">Price: {order.productprice}</p>

                {/* Conditional rendering based on product category */}
                {order.productCategory === 'mobile' ? (
                  <div className="mt-4 text-gray-700">
                    <DetailRow label="Storage" value={order.productdescription} />
                   
                  </div>
                ) : order.productCategory === 'laptop' ? (
                  <div className="mt-4 text-gray-700">
                    <DetailRow label="Speciality" value={order.productspeciallity} />
                    <DetailRow label="Display" value={order.productdisplay} />
                    <DetailRow label="Battery Backup" value={order.productbatterybackup} />
                  </div>
                ) : order.productCategory === 'tablet' ? (
                  <div className="mt-4 text-gray-700">
                    <DetailRow label="Speciality" value={order.productspeciallity} />
                    <DetailRow label="Display" value={order.productdisplay} />
                    <DetailRow label="Battery Backup" value={order.productbatterybackup} />
                  </div>
                ) : order.productCategory === 'watch' ? (
                    <div className="mt-4 text-gray-700">
                      <DetailRow label="Speciality" value={order.productspeciallity} />
                      <DetailRow label="Display" value={order.productdisplay} />
                      <DetailRow label="Battery Backup" value={order.productusage} />
                    </div>):null}

                {/* Display user details */}
                <div className="mt-4">
                  <h4 className="text-xl font-semibold">Order Details:</h4>
                  <DetailRow label="Name" value={order.username} />
                  <DetailRow label="Address" value={order.useraddress} />
                  <DetailRow label="Phone" value={order.userphone} />
                </div>
              </div>
            ))}
          </div>
        )}
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

export default MyOrders;
