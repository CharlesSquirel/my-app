import React from "react";
import "./ProductCard.css";
import Button from "./Button";

const ProductCard = (props) => {
  const { id, name, price, imgSrc, isAvaible } = props.product;
  const { removeProduct } = props;
  return (
    <div className="product-card">
      <h2 className="product-title">{name}</h2>
      <div className="product-img">
        <img src={imgSrc} alt={name} />
      </div>
      <h3 className="product-price">{price.toFixed(2)} zł</h3>
      <p className="product-is-avaible" style={{ color: `${isAvaible ? "green" : "red"}`, fontSize: `${isAvaible ? "18px" : "14px"}` }}>
        {isAvaible ? "Produkt dostępny" : "Produkt niedostępny"}
      </p>
      <Button removeProduct={removeProduct} id={id} />
    </div>
  );
};

export default ProductCard;
