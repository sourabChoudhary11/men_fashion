import React, {useContext} from 'react';
import {toast} from "react-hot-toast";
import {UserContext} form "../index.jsx";

const Payment = () => {

  const {cart} = useContext(UserContext);
  
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  
  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const result = await fetch.post(`${import.meta.env.VITE_BACKEND_URI}/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
      body: JSON.stringify({ amount: cart.totalAmount }),
    }
      );

    if (!result) {
      toast('Server error. Are you online?');
      return;
    }

    const { amount, id: order_id, currency } = result.data.order;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount.toString(),
      currency: currency,
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: order_id,
      handler: function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
        alert(`Order ID: ${response.razorpay_order_id}`);
        alert(`Signature: ${response.razorpay_signature}`);
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9000090000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      toast(`Failed: ${response.error.code}`);
    });

    paymentObject.open();
  };

  return (
    <div>
      {
        handlePayment()
      }
    </div>
  );
};

export default Payment;
