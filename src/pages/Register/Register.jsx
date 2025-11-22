import React, { useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";  
import "./Register.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!form.name || !form.email || !form.password) {
      setErrors({
        name: !form.name && "Name required",
        email: !form.email && "Email required",
        password: !form.password && "Password required",
      });
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.post(`${API_BASE}/api/auth/register`, form);

      if (!res.data.token) {
        navigate("/login");
        return;
      }

      
      login(res.data.token);

      localStorage.setItem("username", res.data.user?.name || "Learner");

      navigate("/dashboard");
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Registration failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <Card
        title="Create account"
        subtitle="Join and organize your learning."
        className="auth-card"
      >
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            error={errors.name}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            error={errors.email}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.password}
          />

          {errors.general && <p className="auth-error">{errors.general}</p>}

          <Button type="submit" fullWidth loading={submitting}>
            Register
          </Button>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link className="link-highlight" to="/login">
              Login
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default Register;
