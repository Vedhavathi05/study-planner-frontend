import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, logout }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">StudyApp</Link>
      </div>

      <div className={`navbar-links ${open ? "open" : ""}`}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/flashcards">Flashcards</Link>
        <Link to="/quizzies">Quizzes</Link>
        <Link to="/sessions">Sessions</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/resources">Resources</Link>

        {user && (
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        )}
      </div>

      <div className="navbar-hamburger" onClick={() => setOpen(!open)}>
        &#9776;
      </div>
    </nav>
  );
}
