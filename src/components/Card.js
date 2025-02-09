
import React, { useState, useEffect } from "react";

export default function Card({ item }) {
  const [quantity, setQuantity] = useState(1); // Default is 1
  const [price, setPrice] = useState(0); // Initialize price

  useEffect(() => {
    if (item.options && item.options.length > 0) {
      const selectedOption = item.options[0]; // Assuming the first option holds the "one" and "two" prices
      setPrice(quantity === 1 ? parseInt(selectedOption.one) : parseInt(selectedOption.two));
    }
  }, [quantity, item]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <div className="card mt-3" style={{ width: "30rem", maxHeight: "800px", overflow: "hidden" }}>
      {/* Image */}
      <img
        className="card-img-top hover-image"
        src={item.img || "https://via.placeholder.com/150"}
        alt={item.name || "Thumbnail representing the card content"}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name || "Coir Pan Brush"}</h5>
        <p className="card-text" style={{ fontSize: "0.85rem" }}>
          {item.description || "An eco-friendly, durable cleaning tool designed to effectively scrub surfaces with its natural coir bristles."}
        </p>

        <div className="container w-100">
          {/* Quantity Dropdown */}
          <select
            className="m-2 bg-success rounded"
            style={{ width: "100%", zIndex: 1, position: "relative", height: "35px", fontSize: "1rem" }}
            value={quantity}
            onChange={handleQuantityChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          
          </select>

          {/* Display the Price */}
          <div className="d-inline h-100 fs-5">Total Price: {price}</div>
        </div>
      </div>
    </div>
  );
}

