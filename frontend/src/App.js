import React from "react";
import "./App.css";
import logo from "./Assets/logo.png";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5DAA7] flex items-center justify-center font-sans relative overflow-hidden">
      {/* --- Vertical maroon stripe (slightly right of center) --- */}
      <div className="absolute left-[70%] top-0 h-full w-44 bg-[#7B2E3A] z-0"></div>

      {/* --- Horizontal navigation bar on top of stripe --- */}
      <div className="absolute top-6 left-[75.84%] -translate-x-1/2 z-20 w-40">
        <nav className="flex justify-between text-white text-sm select-none">
          <a href="#" className="opacity-90 hover:underline">Home</a>
          <a href="#" className="opacity-90 hover:underline">About</a>
          <a href="#" className="opacity-90 hover:underline">Help</a>
        </nav>
      </div>

      {/* --- Main card --- */}
      <div className="relative z-30 w-[100%] max-w-7xl bg-[#EAC988] rounded-3xl p-16 shadow-xl border border-[#D7AF6D]">
        <div className="flex justify-between items-start">
          {/* Left side: logo + title */}
          <div className="flex flex-col items-start space-y-10">
            <div className="flex items-center gap-6">
              <img src={logo} alt="Cookware Matrix logo" className="w-88 h-88" />
              <h1 className="text-white text-7xl font-extrabold leading-tight tracking-wide">
                COOKWARE<br />MATRIX
              </h1>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {/* Button below the title */}
            <button
              className="bg-[#7B2E3A] text-white px-6 py-2 rounded-full text-base font-medium shadow-md hover:bg-[#5c1f29] transition"
              type="button"
            >
              Let’s get started
            </button>
          </div>

          {/* Right side: maroon info bubble overlapping stripe */}
          <div className="relative mt-10 mr-4">
            <div className="bg-[#7B2E3A] text-white p-6 rounded-2xl shadow-md w-72 text-sm leading-relaxed">
              Cookware Matrix helps you choose the best pots and pans. We
              provide simple, clear comparisons so you can find the right tools
              for your kitchen. Stop guessing, start cooking.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
