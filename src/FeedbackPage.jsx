import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    feedback: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/feedback/add",formData).then((res)=>console.log(res)).catch((err)=>console.log(err))

    if (!formData.name || !formData.email || !formData.feedback || formData.rating === 0) {
      setError('Please fill in all fields and provide a rating.');
      return;
    }

    setSubmitted(true); // Simulate a successful submission
    setError('');
    // Optionally: Submit the feedback data to a server or API here
    console.log(formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar></Navbar>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">We Value Your Feedback!</h2>

        {/* Feedback Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center text-green-500">
              <h3 className="text-2xl font-semibold mb-4">Thank You for Your Feedback!</h3>
              <p>Your feedback has been received successfully. We appreciate your time!</p>
              <Link to="/" className="text-red-500 hover:text-red-700">Back to Home</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label htmlFor="rating" className="block text-lg font-medium text-gray-700">Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      className={`text-2xl ${formData.rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div className="mb-6">
                <label htmlFor="feedback" className="block text-lg font-medium text-gray-700">Your Feedback</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default FeedbackPage;
