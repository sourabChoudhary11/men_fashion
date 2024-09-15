import React from "react";

const PriceDetails = ({cartItemsDetails}) => {

    const priceDetails = {
        totalProducts: 0,
        totalPrice: 0,
        discount: 0,
        deliveryCharges: 0,
        totalAmount: 0,
        savings: 0
    }

    cartItemsDetails.forEach(item => {
        priceDetails.totalProducts += item.quantity;
        priceDetails.totalPrice += item.price*item.quantity;
    });

    priceDetails.totalAmount = (priceDetails.totalPrice+priceDetails.deliveryCharges)-priceDetails.discount;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Price Details</h2>

      <div className="flex justify-between py-2">
        <span>Price ({priceDetails.totalProducts} (items with their quantity))</span>
        <span>₹{priceDetails.totalPrice}</span>
      </div>

      <div className="flex justify-between py-2">
        <span>Discount</span>
        <span className="text-green-600">-₹{priceDetails.discount}</span>
      </div>

      <div className="flex justify-between py-2">
        <span>Delivery Charges</span>
        <span>₹{priceDetails.deliveryCharges}</span>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between font-semibold py-2 text-lg">
        <span>Total Amount</span>
        <span>₹{priceDetails.totalAmount}</span>
      </div>

      <div className="text-green-600 text-sm mt-2">
        You will save ₹{priceDetails.savings} on this order.
      </div>
    </div>
  );
};

export default PriceDetails;
