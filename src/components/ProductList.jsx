import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ selectedCategory }) => {

  const [products, setProducts] = useState([]);
  useEffect(()=>{
     async function fetchData(){
      
    if(selectedCategory === 'all'){ 
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/product/all`,{
      mode: "cors"
    })
    const data = await res.json()
    setProducts(data.products)
    }
    else{
    fetch(`${import.meta.env.VITE_BACKEND_URI}/product/category/${selectedCategory}`)
    .then(res=>res.json())
    .then(data=>setProducts(data.products))
    }
    }
    fetchData()
  },[selectedCategory])
  
  return (
    <div className="flex-1 bg-white p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">
        Products in "{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}" category
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3">
      {
        products.length>0 && products.map((p,index)=>(
          <ProductCard key={index} product={p} />
        ))
      }
      </div>
    </div>
  );
};

export default ProductList