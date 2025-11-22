import React, { useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!form.email || !form.password) {
      setErrors({
        email: !form.email && "Email required",
        password: !form.password && "Password required",
      });
      return;
    }

    try {
      setSubmitting(true);

      const res = await axios.post(`${API_BASE}/api/auth/login`, form);

      if (!res.data.token) {
        setErrors({ general: "Token missing from server" });
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user?.name || "Learner");

      navigate("/dashboard");
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Login failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <Card
        title="Welcome back!!"
        subtitle="Log in and continue your learning journey."
        className="auth-card"
      >
        <form onSubmit={handleSubmit}>
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
            Login
          </Button>

          <p className="auth-footer">
            Don't have an account? <Link className="link-highlight" to="/register" >Register</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default Login;
