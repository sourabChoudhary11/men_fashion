import React, { useContext } from 'react';
import { FaHome,FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import {Link} from "react-router-dom"
import {UserContext} from "../index.jsx"

const Navbar = () => {

  const {authentication, user} = useContext(UserContext);
  
  return (
    <nav className="relative bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Website Heading */}
        <h1 className="text-5xl font-bold text-blue-900 font-custom tracking-widest">
          Mstore
        </h1>

        {/* Home, Cart and Account Options */}
        <div className="flex space-x-6">
          <div className="flex items-center cursor-pointer">
            <FaHome className="text-2xl text-blue-900" />
            <Link to={"/"} className="ml-2 text-lg text-blue-900">Home</Link>
          </div>
          
          <div className="flex items-center cursor-pointer">
            <FaShoppingCart className="text-2xl text-blue-900" />
            <Link to={"/cart"} className="ml-2 text-lg text-blue-900">Cart</Link>
          </div>

          {
            authentication ?  <div className="cursor-pointer">
              <img className='w-[35px]' src={user?.logo} alt={`user_${user?.name}_logo`} />
            </div> : <div className="flex items-center cursor-pointer">
              <FaUserCircle className="text-2xl text-blue-900" />
              <Link to={"/account"} className="ml-2 text-lg text-blue-900">Account</Link>
            </div>
          }
          
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
