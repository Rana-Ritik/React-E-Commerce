// src/ThankYouPage.js
import React from 'react';

const ThankYouPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-4">
          Your order has been successfully placed. We appreciate your business!
        </p>
        <p className="text-gray-500 mb-6">
          You will receive a confirmation email shortly with the details of your order.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default ThankYouPage;
