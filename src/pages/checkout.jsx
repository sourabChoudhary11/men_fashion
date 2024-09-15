import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../index.jsx';
import { toast } from "react-hot-toast"

const CheckoutForm = () => {

  const navigate = useNavigate();
  const { user, cart } = useContext(UserContext);

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(cart);

  // Handle form submission (checkout action)
  const handleSubmit = async (e) => {
    e.preventDefault();


    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/order/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user._id,
        items: cart.cartItems,
        shippingAddress: formData,
        totalAmount: cart.totalAmount
      })
    });

    await res.json();
    toast("Address saved! Proceed to payment now.");

    navigate("/pay-now")

  };

  useEffect(() => {
    async function fetchData() {
      try {

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/order/all/${user._id}`);
        const {orders} = await res.json();
        console.log(orders)
        const { street,city,state,country,zipCode} = orders[orders.length-1].shippingAddress;
        setFormData({ street,city,state,country,zipCode})
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [])

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md">

      {/* Street */}
      <div className="mb-4">
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
        <input
          type="text"
          name="street"
          id="street"
          value={formData.street}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter your street"
        />
      </div>

      {/* City */}
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          name="city"
          id="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter your city"
        />
      </div>

      {/* State */}
      <div className="mb-4">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          name="state"
          id="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter your state"
        />
      </div>

      {/* Country */}
      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
        <input
          type="text"
          name="country"
          id="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter your country"
        />
      </div>

      {/* Zip Code */}
      <div className="mb-4">
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
        <input
          type="number"
          name="zipCode"
          id="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter your zip code"
        />
      </div>

      {/* Checkout Button */}
      <button
        type="submit"
        className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-green-600"
      >
        Deliever Here
      </button>
    </form>
  );
};

export default CheckoutForm;
