import React from "react";
import "./InputField.css";

export default function InputField({ type, value, onChange, placeholder }) {
  return (
    <input
      className="input-field"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  );
}
