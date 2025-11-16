import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Flashcards from "./pages/Flashcards";
import Resources from "./pages/Resources";
import Progress from "./pages/Progress";
import StudySessions from "./pages/StudySessions";
import Quizzes from "./pages/Quizzes";

import Navbar from "./components/Navbar/Navbar";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const ProtectedRoute = ({ children }) =>
    localStorage.getItem("token") ? children : <Navigate to="/" />;

  return (
    <Router>
      {localStorage.getItem("token") && <Navbar user={user} logout={logout} />}

      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Flashcards */}
        <Route
          path="/flashcards"
          element={
            <ProtectedRoute>
              <Flashcards />
            </ProtectedRoute>
          }
        />

        {/* Resources */}
        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />

        {/* Progress */}
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />

        {/* Sessions */}
        <Route
          path="/sessions"
          element={
            <ProtectedRoute>
              <StudySessions />
            </ProtectedRoute>
          }
        />

        {/* Quizzes */}
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute>
              <Quizzes />
            </ProtectedRoute>
          }
        />

        {/* Fix the typo route */}
        <Route path="/quizzies" element={<Navigate to="/quizzes" />} />
      </Routes>
    </Router>
  );
}

export default App;
