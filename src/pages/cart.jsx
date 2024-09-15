import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import {UserContext} from "../index.jsx";
import {useContext} from "react"

import { FiShoppingCart } from 'react-icons/fi';
import PriceDetails from "../components/CartPriceDetails.jsx";


const Cart = () => {
  const navigate = useNavigate();
  const {user, setCart} = useContext(UserContext);

  const [cartItems, setCartItems] = useState([]);
  async function fetchData() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/cart/${user._id}`,
      );
      
      const data = await res.json();
      console.log(data.cartItems)
      setCartItems(data.cartItems);
      setCart({
        cartItems: data.cartItems.map(i=>({productId: i.productID._id, quantity: i.quantity})),
        totalAmount: data.cartItems.reduce((total,currentValue)=>total+(currentValue.price*currentValue.quantity),0)
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  
  
  const orderNowHandler = ()=>{
    navigate("/checkout");
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex-col p-5">
      {cartItems.length > 0 &&
        cartItems.map((item) =>( 
          <CartItem key={item._id} item={item} />
        ))
      }

      {
        cartItems.length>0 && <PriceDetails cartItemsDetails={cartItems} />
      }

      <button
        onClick={orderNowHandler} 
        className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-green-600 flex justify-center items-center"
      >
        <FiShoppingCart className="text-2xl mr-2" /> 
        Place Order
      </button>
    </div>
  );
};

export default Cart;
