import React, { useState } from "react";
import { productsList } from "../data/productsList";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const [products, setProducts] = useState(productsList);
  const removeProduct = (id) => {
    const filtered = products.filter((product) => product.id !== id);
    setProducts(filtered);
  };
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} removeProduct={removeProduct} />
      ))}
    </>
  );
};

export default ProductsList;
