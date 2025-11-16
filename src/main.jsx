import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Import CSS
import "./pages/Combinedpagesstyles.css";
import "./components/Button/Button.css";
import "./components/Card/Card.css";
import "./components/InputField/InputField.css";
import "./components/Loader/Loader.css";
import "./components/Navbar/Navbar.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
