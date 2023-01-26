import React from "react";
import "./Button.css";

const Button = ({ removeProduct, id }) => {
  return (
    <button className="btn-remove" onClick={() => removeProduct(id)}>
      Delete product
    </button>
  );
};

export default Button;
