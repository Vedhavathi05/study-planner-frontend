import React from "react";
import "./Button.css";

function Button({
  children,
  variant = "primary",
  fullWidth = false,
  loading = false,
  ...rest
}) {
  return (
    <button
      className={`btn btn-${variant} ${fullWidth ? "btn-full" : ""}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading && <span className="btn-spinner" />}
      <span className={loading ? "btn-label loading" : "btn-label"}>
        {children}
      </span>
    </button>
  );
}

export default Button;
