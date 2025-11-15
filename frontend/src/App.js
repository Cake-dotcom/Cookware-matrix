import React from "react";
import logo from "./Assets/logo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import Help from "./Help";
import Compare from "./Compare";
import ComparisonResult from "./ComparisonResult";
function Home() {
  return (
    <div className="min-h-screen bg-[#F5DAA7] flex items-center justify-center font-sans relative overflow-hidden p-8">
      {/* Vertical maroon stripe on the right */}
      <div className="absolute right-[22%] top-0 h-full w-[15%] bg-[#8B3545]"></div>

      {/* Navigation bar on the stripe */}
      <div className="absolute top-8 right-[23%] z-20">
          <nav className="flex gap-10 text-white text-base">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/help" className="hover:underline">Help</Link>
        </nav>
      </div>

      {/* Main beige card */}
      <div className="relative z-10 w-[90%] max-w-[1200px] bg-[#EAC988] rounded-[50px] shadow-2xl p-20 mr-[8%]">
        {/* Logo and Title */}
        <div className="flex items-center gap-6 mb-48">
          <img src={logo} alt="Cookware Matrix logo" className="w-40 h-40" />
          <h1 className="text-white text-[5rem] font-bold leading-[1.1] tracking-tight">
            COOKWARE<br />MATRIX
          </h1>
        </div>
        
        {/* Button */}
        <Link to="/compare">
          <button
            className="bg-[#5C2832] text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg hover:bg-[#4a1f28] transition-colors"
            type="button"
          >
            Let's get started
          </button>
        </Link>
        </div>

      {/* Info bubble overlapping the stripe */}
      <div className="absolute right-[20%] top-1/2 -translate-y-1/2 z-30">
        <div className="bg-[#8B3545] text-white p-8 rounded-3xl shadow-2xl w-[300px] relative">
          {/* Speech bubble pointer */}
          <div className="translate-x-1/2 -bottom-4 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#8B3545]"></div>
          
          <p className="text-base leading-relaxed">
            Cookware Matrix helps you choose the best pots and pans. We provide simple, clear comparisons so you can find the right tools for your kitchen. Stop guessing, start cooking.
          </p>
        </div>
      </div>
    </div>
  );
}
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/compare" element={<Compare />} /> 
        <Route path="/comparison-result" element={<ComparisonResult />} />
      </Routes>
    </Router>
  );
}