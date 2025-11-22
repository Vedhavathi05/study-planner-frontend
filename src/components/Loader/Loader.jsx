import React from "react";
import "./Loader.css";

function Loader({ fullscreen = false }) {
  const el = (
    <div className="loader-circle-wrapper">
      <div className="loader-circle"></div>
      <p className="loader-text">Loading…</p>
    </div>
  );

  if (!fullscreen) return el;

  return <div className="loader-overlay">{el}</div>;
}

export default Loader;
