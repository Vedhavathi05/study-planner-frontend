import React from "react";
import "./Card.css";

function Card({ title, subtitle, rightSection, children, className = "" }) {
  return (
    <div className={`card-root ${className}`}>
      {(title || rightSection) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {rightSection && <div className="card-right">{rightSection}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
