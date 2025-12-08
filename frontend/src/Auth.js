import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Assets/logo.png";
import { useAuth } from "./App"; // Import the useAuth hook

export default function Auth() {
  const navigate = useNavigate();
  const { login, signup, skip } = useAuth(); // Get auth functions from context
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation for signup
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Create user object with full data
    const userData = {
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      password: formData.password,
    };

    // Call context functions
    if (isLogin) {
      login(userData);
    } else {
      signup(userData);
    }

    navigate("/home");
  };

  const handleSkip = () => {
    skip();
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center font-sans relative overflow-hidden p-4 md:p-8">

      {/* Animated background blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* CSS animations */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.8s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out 0.2s both; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out 0.4s both; }
      `}</style>

      {/* Main card */}
      <div className="relative w-full max-w-[480px] bg-white/5 backdrop-blur-xl rounded-[30px] md:rounded-[40px] shadow-2xl p-8 md:p-12 border border-white/10 z-10 animate-scaleIn">

        {/* Logo + header */}
        <div className="text-center mb-8 animate-slideDown">
          <img src={logo} alt="Cookware Matrix logo" className="w-20 h-20 mx-auto mb-4 drop-shadow-2xl" />
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-3xl md:text-4xl font-bold mb-2">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? "Log in to continue your cookware journey" : "Create an account to get started"}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex gap-2 mb-8 bg-slate-800/60 p-1 rounded-full animate-slideInLeft">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 rounded-full font-semibold transition-all ${
              isLogin ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                      : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Log In
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 rounded-full font-semibold transition-all ${
              !isLogin ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                       : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 animate-fadeInUp">

          {/* Name (signup only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required={!isLogin}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-200"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@email.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-200"
            />
          </div>

          {/* Confirm Password (signup only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required={!isLogin}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-200"
              />
            </div>
          )}

          {/* Forgot password */}
          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-sm text-emerald-400 hover:text-emerald-300">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:scale-[1.02]"
          >
            {isLogin ? "Log In" : "Create Account"}
          </button>

          {/* Skip */}
          <button
            type="button"
            onClick={handleSkip}
            className="w-full bg-slate-800/60 border border-slate-700/50 text-slate-300 py-3.5 rounded-xl font-semibold hover:bg-slate-700/60"
          >
            Skip for now
          </button>
        </form>

        {/* Socials */}
        <div className="mt-8 animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-slate-700/50 flex-1"></div>
            <span className="px-4 text-sm text-slate-500">or continue with</span>
            <div className="border-t border-slate-700/50 flex-1"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            {/* GitHub */}
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-400">
          <Link to="/" className="hover:text-emerald-400">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
