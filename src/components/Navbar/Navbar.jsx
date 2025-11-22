import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">📚 Study Planner</div>

   
      <input type="checkbox" id="menu-toggle" className="toggle-checkbox" />
      <label htmlFor="menu-toggle" className="menu-toggle">☰</label>

      <div className="nav-right">
        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
        <NavLink to="/flashcards" className="nav-link">Flashcards</NavLink>
        <NavLink to="/resources" className="nav-link">Resources</NavLink>
        <NavLink to="/sessions" className="nav-link">Sessions</NavLink>
        <NavLink to="/quizzes" className="nav-link">Quizzes</NavLink>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
