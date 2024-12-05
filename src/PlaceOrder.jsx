import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PlaceOrder = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [addresses, setAddresses] = useState([]);

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const newAddress = { name, address, city, state, zip };
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    setName('');
    setAddress('');
    setCity('');
    setState('');
    setZip('');
  };

  const [paymentType, setPaymentType] = useState('Credit Card');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const newPaymentMethod = {
      type: paymentType,
      cardHolder,
      cardNumber,
      expirationDate,
      cvv,
      paypalEmail,
    };
    setPaymentMethods((prevMethods) => [...prevMethods, newPaymentMethod]);
    resetPaymentFields();
  };

  const resetPaymentFields = () => {
    setCardHolder('');
    setCardNumber('');
    setExpirationDate('');
    setCvv('');
    setPaypalEmail('');
    setPaymentType('Credit Card');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <header className="bg-blue-600 p-4 text-white flex items-center shadow-md">
        <img className="h-10" src="https://t4.ftcdn.net/jpg/04/58/10/35/360_F_458103554_QcilQKhiC78XnvOczeOKwkTH3ilLitCZ.jpg" alt="Logo" />
        <h1 className="text-2xl font-bold ml-4">Confirm Your Order</h1>
      </header>

      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Delivery Address</h2>
        <form onSubmit={handleAddressSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" required />
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" required />
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" required />
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" required />
          <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Zip Code" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" required />
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 col-span-1 md:col-span-2">Save Address</button>
        </form>

        <h2 className="text-2xl font-semibold mt-8 mb-6">Payment Method</h2>
        <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 col-span-1 md:col-span-2">
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Google Pay">Google Pay</option>
            <option value="PhonePe">PhonePe</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>

          {paymentType === 'Credit Card' || paymentType === 'Debit Card' ? (
            <>
              <input type="text" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} placeholder="Cardholder Name" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" required />
              <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" required />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} placeholder="MM/YY" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" required />
                <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="CVV" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" required />
              </div>
            </>
          ) : paymentType === 'PayPal' ? (
            <input type="email" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} placeholder="PayPal Email" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 col-span-1 md:col-span-2" required />
          ) : paymentType === 'Cash on Delivery' ? (
            <p className="col-span-1 md:col-span-2">You have selected Cash on Delivery. Please have the exact amount ready.</p>
          ) : null}

          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 col-span-1 md:col-span-2">Save Payment Method</button>
        </form>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Saved Payment Methods</h3>
          {paymentMethods.length === 0 ? <p>No payment methods saved yet.</p> : (
            <ul className="space-y-2">
              {paymentMethods.map((method, index) => (
                <li key={index} className="p-4 border border-gray-300 rounded-md bg-gray-50 shadow-sm">
                  <p><strong>Type:</strong> {method.type}</p>
                  {method.type === 'Credit Card' || method.type === 'Debit Card' ? (
                    <>
                      <p><strong>Cardholder:</strong> {method.cardHolder}</p>
                      <p><strong>Card Number:</strong> **** **** **** {method.cardNumber.slice(-4)}</p>
                      <p><strong>Expiration:</strong> {method.expirationDate}</p>
                    </>
                  ) : method.type === 'PayPal' ? (
                    <p><strong>PayPal Email:</strong> {method.paypalEmail}</p>
                  ) : (
                    <p><strong>Payment Method:</strong> {method.type}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/thankyou" className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-2 rounded-md hover:bg-gradient-to-l transition duration-200 shadow-lg">Confirm Order</Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
