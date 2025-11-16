import React from "react";
import "./Button.css";

export default function Button({ text, onClick, type = "button" }) {
  return (
    <button className="btn" onClick={onClick} type={type}>
      {text}
    </button>
  );
}
