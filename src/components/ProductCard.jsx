import React from 'react';
import {useNavigate} from "react-router-dom"

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const showDetails = ()=>{
    navigate(`/product-details/${product._id}`);
  }
  
  return (
    <div onClick={showDetails} className="cursor-pointer bg-white p-4 rounded-lg shadow-md max-w-xs mx-auto hover:opacity-[0.7]">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
        style={{ borderRadius: '10px' }}
      />

      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-1">Price: ${product.price.toFixed(2)}</p>
      <p className="text-gray-600 mb-1">Rating: {product.rating} / 5</p>
      <p className={`${product.stock<1?"text-red-700":"text-green-700"} mb-1`}>{product.stock<1?"Out of Stock":"In Stock"} items</p>
    </div>
  );
};

export default ProductCard;
