import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";

// Main Component containing Sidebar and ProductList
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'watch', 'shirt', 'shoes', 'perfume', 'jeans'];
console.log(selectedCategory)
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <Sidebar categories={categories} setSelectedCategory={setSelectedCategory} />

      {/* ProductList */}
      <ProductList selectedCategory={selectedCategory} />
    </div>
  );
};

export default Home;