import React, { useState } from "react";
import "./InputField.css";

function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="input-field">
      {label && <label className="input-label">{label}</label>}

      <div className={`input-wrapper ${error ? "input-error" : ""}`}>
        <input
          type={isPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-control"
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            className="input-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
}

export default InputField;
