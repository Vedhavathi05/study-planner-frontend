import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import "./Combinedpagesstyles.css";

export default function Register({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Register user
      await axios.post(
        "https://study-planner-backend-3kmg.onrender.com/api/register",
        {
          name,
          email,
          password,
        }
      );

      // Auto-login user after successful register
      const loginRes = await axios.post(
        "https://study-planner-backend-3kmg.onrender.com/api/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      setUser(loginRes.data.user);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page-center">
      <form className="form-container" onSubmit={handleRegister}>
        <h2 className="form-title">Register</h2>

        <InputField
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <Button type="submit" text="Register" />

        <p className="form-footer">
          Already a user?{" "}
          <Link to="/" className="form-link">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
