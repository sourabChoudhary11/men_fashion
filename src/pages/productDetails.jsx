import React, { useEffect, useState } from 'react';
import {toast} from 'react-hot-toast';
import {useParams} from "react-router";
import {UserContext} from "../index.jsx";
import {useContext} from "react";

const backend_url = import.meta.env.VITE_BACKEND_URI;

function ProductDetailsPage() {

  const {id} = useParams();
  const {user} = useContext(UserContext);

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const addToCart =async () => {
    try{
      const res = await fetch(`${backend_url}/cart/new`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productID: id,
          userID: user._id,
          quantity,
          price: product.price
        })
      })
      const data = await res.json()
      toast(data.message)
    }catch(err){
      toast(err.message)
    }
  };

  useEffect(()=>{
      try{
    async function fetchData(){
      const res = await fetch(`${backend_url}/product/${id}`)
      const data = await res.json();
      setProduct(data.product);
    }
    fetchData();
      } catch(err){
        toast(err.message)
      }
  },[])

  return (
     <div className=" w-[fit-content] m-4 mx-auto p-4 flex flex-col md:mt-20 md:flex-row gap-8 bg-white shadow-lg rounded-lg">
      {
       product && <>
      
      {/* Product Image Section */}
      <div className="flex-shrink-0">
        <img src={product?.images[0]} alt={product?.name} className="w-full md:w-80 rounded-lg" />
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">{product?.name}</h1>
        <p className="text-gray-700">{product?.description}</p>
        <p className="text-gray-600">Brand: {product?.brand}</p>
        <p className="text-gray-600">Category: {product?.category}</p>
        <p className="text-yellow-500">Rating: {product?.rating} ⭐</p>
        <p className="text-xl font-semibold">Price: ₹{product?.price}</p>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4">
          <button
            onClick={decrementQuantity}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 font-bold rounded"
          >
            -
          </button>
          <span className="text-xl">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 font-bold rounded"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={addToCart}
          className="mt-4 bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
       </>  
}
    </div>
  );
}

export default ProductDetailsPage;
