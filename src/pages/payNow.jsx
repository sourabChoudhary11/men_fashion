import React, { useState, useContext } from 'react';
import {UserContext} from "../index.jsx";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const {cart} = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // State variables for form fields
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/pay-now`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: cart.totalAmount*100,
        customerName,
        customerAddress,
      }),
    });

    const { clientSecret } = await response.json();

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      setSuccess('Payment successful!');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
          Name
        </label>
        <input
          id="customerName"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerAddress">
          Address
        </label>
        <input
          id="customerAddress"
          type="text"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Card Details
        </label>
        <CardElement className="p-2 border border-gray-300 rounded-md shadow-sm" />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">{success}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-2 px-4 text-white font-bold rounded-md ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none`}
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

const PaymentForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentForm;
