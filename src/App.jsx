import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from "./pages/home.jsx"
import Account from "./pages/account.jsx"
import {BrowserRouter as Router, Route, Routes}from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Cart from './pages/cart.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ProductDetailsPage from './pages/productDetails.jsx'
import CheckoutForm from './pages/checkout.jsx'
import PayNow from './pages/payNow.jsx'
// import {UserContext} from "./index.jsx"
// import {useContext, useEffect} from "react"

export default function App() {
  // const {setUser,setAuthentication} = useContext(UserContext)

  // useEffect(()=>{
  //   try{
  //     async function fetchCookie(){
  //       console.log(import.meta.env.VITE_BACKEND_URI)
  //       const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/get-cookie`,{
  //         method: "GET",
  //         credentials: "include"
  //       })
  //       console.log("response",res)
  //       const data = await res.json();
  //       console.log("cookie got" , data)
  //       const userRes = await fetch(`${import.meta.env.VITE_BACKEND_URI}/user/${cookie._id}`);
  //       const {user} = await userRes.json();
  //       setUser(user)
  //       setAuthentication(true)
  //     }
  //     fetchCookie();
  //   }catch(err){
  //     console.log(err.message)
  //   }
  // })
  
  return (
    <Router>
      <Navbar />
      <Toaster position='top center' />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<ProtectedRoute>
          <Cart />
        </ProtectedRoute>} />
        <Route path="/product-details/:id" element={<ProtectedRoute>
          <ProductDetailsPage />
        </ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute>
          <CheckoutForm />
        </ProtectedRoute>} />
        <Route path="/pay-now" element={<ProtectedRoute>
          <PayNow />
        </ProtectedRoute>} />
      </Routes>
    </Router>
  )
}