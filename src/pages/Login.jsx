import React, { useState } from "react";
import BackgroundParticles from "../assets/BackgroundParticles";
import login from "../assets/login.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      // Save token and user info to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      navigate("/user");

    } catch (err) {
      setError("Cannot connect to server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <BackgroundParticles />

      <div className="flex h-screen">

        {/* LEFT SIDE - LOGIN FORM */}
        <div className="w-1/2 flex items-center justify-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900/60 backdrop-blur-lg p-8 rounded-2xl w-[400px] border border-white/10"
          >
            <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>

            {/* Error Message */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input bg-slate-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input bg-slate-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black py-3 rounded-lg font-semibold cursor-pointer transition-colors"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-sm text-slate-400 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-cyan-400 hover:underline">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="w-1/2 relative">
          <motion.img
            src={login}
            alt="bot"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute right-10 top-1/2 -translate-y-1/2 w-[400px] border-4 border-cyan-400 rounded-2xl"
          />
        </div>

      </div>
    </div>
  );
};

export default Login;
