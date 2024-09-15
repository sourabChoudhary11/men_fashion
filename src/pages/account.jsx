import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import {useContext} from "react"
import {UserContext} from "../index.jsx" 
import { useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast"


const Account = () => {
  const navigate = useNavigate();
  const {setUser, setAuthentication} = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin); 
    setUsername(''); 
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/user/login`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:username,password}),
        credentials: "include",
      });
        const {user} = await res.json();
        console.log("login user ", user)
        setAuthentication(true)
        setUser(user)
        toast(`Welcome back ${user.name}`)
        console.log(user)
        navigate("/")
      } catch(err){
        toast(err.message)
      }
    } else {
      try{
        if(password !== confirmPassword) {
          setPassword('');
          setConfirmPassword('');
          toast("password and confirm password should be same","className='bg-green-700'")
        }
        else{
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/user/register`,{
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:username,password}),
            credentials: "include",
          });
          const {user} = await res.json();
          setAuthentication(true)
          setUser(user)
          toast(`Welcome ${user.name}! you register successfully`)
          navigate("/")
        }
      } catch(err){
        toast(err.message)
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? 'Login' : 'Register'} Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border-b border-gray-500 py-2">
            <FaUser className="mr-2 text-gray-600" />
            <input
              type="text"
              placeholder="Username"
              className="w-full py-2 px-2 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex items-center border-b border-gray-500 py-2">
            <FaLock className="mr-2 text-gray-600" />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-2 px-2 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Show Confirm Password field only in Register form */}
          {!isLogin && (
            <div className="flex items-center border-b border-gray-500 py-2">
              <FaLock className="mr-2 text-gray-600" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full py-2 px-2 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className={`w-full ${
              isLogin ? 'bg-blue-500' : 'bg-green-500'
            } text-white py-2 px-4 rounded`}
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {/* Toggle between login and register */}
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={toggleForm}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Account;
