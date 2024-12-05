import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';



const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/contact/add",formData).then((res)=>console.log(res)).catch((err)=>console.log(err))
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }
    
    // Simulate form submission (e.g., send data to a backend API)
    setSubmitted(true);
    setError('');
    console.log(formData); // This can be replaced with an API call to submit the contact form
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar></Navbar>
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>

        {/* Contact Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center text-green-500">
              <h3 className="text-2xl font-semibold mb-4">Thank you for contacting us!</h3>
              <p>We have received your message and will get back to you shortly.</p>
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

              {/* Phone */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Your Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-lg font-medium text-gray-700">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
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
                Submit Message
              </button>
            </form>
          )}
        </div>

        {/* Cafe Location Section */}
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Our Location</h3>
          <p className="text-lg text-gray-600 mb-4">Visit us at:</p>
          <address className="text-lg font-medium text-gray-800 mb-6">
            <p>Sood Electronics</p>
            <p>Talwara </p>
            <p>Talwara, Punjab, 144224</p>
          </address>
          {/* Optionally, you can embed a Google Map here */}
          <div className="mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.656813967634!2d75.87734357392252!3d31.94307352613948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b72befddeb235%3A0xb40bed248f127064!2sCheap%20Cycle%20Store%2C%20Sood%20Xpertise!5e0!3m2!1sen!2sin!4v1731657575836!5m2!1sen!2sin" // Replace with actual Google Maps URL
              width="600"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
          <p className="text-lg font-medium text-gray-800">Phone: (123) 456-7890</p>
        </div>
       

        {/* Social Media Links Section */}
        <div className="mt-12 text-center">
  <h3 className="text-2xl font-semibold text-gray-800 mb-6">Follow Us</h3>
  <div className="flex justify-center space-x-6">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-3xl">
      <i className="fab fa-facebook-square"></i> {/* Facebook Icon */}
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-3xl">
      <i className="fab fa-instagram"></i> {/* Instagram Icon */}
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-3xl">
      <i className="fab fa-twitter-square"></i> {/* Twitter Icon */}
    </a>
  </div>
</div>

      </div>
      

    </div>
  );
};

export default ContactPage;
