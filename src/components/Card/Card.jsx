import React from "react";
import "./Card.css";

export default function Card({ title, description, children }) {
  return (
    <div className="card-container">
      {title && <h3 className="card-title">{title}</h3>}
      {description && <p className="card-description">{description}</p>}
      {children}
    </div>
  );
}
