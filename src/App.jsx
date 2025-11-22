import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Flashcards from "./pages/Flashcards/Flashcards.jsx";
import Resources from "./pages/Resources/Resources.jsx";
import StudySessions from "./pages/StudySessions/StudySessions.jsx";
import Quizzes from "./pages/Quizzes/Quizzes.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar/Navbar.jsx"; // if you have it

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      {token && <Navbar />}

      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/flashcards"
            element={
              <ProtectedRoute>
                <Flashcards />
              </ProtectedRoute>
            }
          />

          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sessions"
            element={
              <ProtectedRoute>
                <StudySessions />
              </ProtectedRoute>
            }
          />

          <Route
            path="/quizzes"
            element={
              <ProtectedRoute>
                <Quizzes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
