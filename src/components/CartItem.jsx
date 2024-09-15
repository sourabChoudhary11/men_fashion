import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit, FiTrash, FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

const backend_url = import.meta.env.VITE_BACKEND_URI;

const CartItem = ({ item }) => {
  const navigate = useNavigate();    
  const [quantity, setQuantity] = useState(item.quantity);

  const increment = () => setQuantity(quantity + 1);

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const updateCartItem = async () => {
    try {
      const response = await fetch(`${backend_url}/cart/${item._id}`, {
        method: "PUT",
        body: JSON.stringify({ quantity }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      toast(data.message);
      navigate("/");
    } catch (err) {
      toast(err.message);
    }
  };
  const deleteCartItem= async () => {
    try {
      const response = await fetch(`${backend_url}/cart/${item._id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      toast(data.message);
      navigate("/");
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center border border-gray-300 rounded-lg shadow-md sm:flex-row">
      <img
        src={item.productID.images[0]} // Assuming one image only
        alt={item.productID.name}
        className="w-[fit-content] rounded-lg"
      />
      <div className="flex flex-col space-y-4 sm:ml-20">
      <h2 className="text-xl font-bold mt-2">{item.productID.name}</h2>
      <p className="text-gray-600 mt-1">Rs. {item.price.toFixed(2)}</p>
      <div className="flex space-x-4 items-center mt-4">
        <button
          onClick={decrement}
          className="bg-gray-200 px-4 py-2 rounded-l-md text-gray-700 hover:bg-gray-300"
        >
          -
        </button>
        <span className="text-gray-700">{quantity}</span>
        <button
          onClick={increment}
          className="bg-gray-200 px-4 py-2 rounded-r-md text-gray-700 hover:bg-gray-300"
        >
          +
        </button>
      </div>
        <div className="flex space-x-4 ml-3">
      <button
        onClick={updateCartItem}
      >
        <FiEdit className="text-2xl" /> {/* Icon instead of text */}
      </button>
      <button
        onClick={deleteCartItem}
      >
         <FiTrash className="text-2xl" />
      </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
