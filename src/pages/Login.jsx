import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import "./Combinedpagesstyles.css";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API = "https://study-planner-backend-3kmg.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page-center">
      <form className="form-container" onSubmit={handleLogin}>
        <h2 className="form-title">Login</h2>

        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" text="Login" />

        <p className="form-footer">
          Not a user?{" "}
          <Link to="/register" className="form-link">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
