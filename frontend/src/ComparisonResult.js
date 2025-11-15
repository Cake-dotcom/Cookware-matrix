import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./Assets/logo.png";

// Placeholder images - replace with actual product images
const redCooker = "https://via.placeholder.com/150x150/C85A54/FFFFFF?text=Red+Cooker";
const blackCooker = "https://via.placeholder.com/150x150/3C3C3C/FFFFFF?text=Black+Cooker";

export default function ComparisonResult() {
  const location = useLocation();
  const { category, brand1, brand2 } = location.state || {
    category: "Pressure Cooker",
    brand1: "Prestige",
    brand2: "Pigeon"
  };

  return (
    <div className="min-h-screen bg-[#7B2E3A] flex flex-col items-center justify-center p-8">
      {/* Main Container */}
      <div className="w-full max-w-[900px] bg-[#E8D4A0] rounded-[40px] shadow-2xl overflow-hidden pt-6 px-6 pb-6">
        {/* Header Section with border */}
        <div className="w-full bg-[#7B2E3A] py-6 px-12 flex items-center gap-6 rounded-t-[30px]">
          {/* Logo */}
          <img src={logo} alt="Cookware Matrix logo" className="w-12 h-12" />
          
          {/* Title */}
          <h1 className="text-white text-3xl font-bold flex-1 text-center">Discover Your Perfect Match</h1>
          
          {/* Navigation */}
          <nav className="flex gap-6 text-white text-sm">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/help" className="hover:underline">Help</Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Comparison Title Bar */}
          <div className="bg-[#8B3545] rounded-t-2xl py-3 px-6 mb-0">
            <h2 className="text-white text-lg font-semibold">{brand1} {category} vs {brand2} {category}</h2>
          </div>

          {/* Product Images Section */}
          <div className="bg-[#A05663] rounded-b-2xl p-6 mb-6 grid grid-cols-2 gap-4">
            {/* Product 1 */}
            <div className="bg-[#8B3545] rounded-xl p-6 flex flex-col items-center">
              <img src={redCooker} alt={`${brand1} ${category}`} className="w-32 h-32 object-contain mb-4" />
              <p className="text-white text-base font-semibold">{brand1} {category}</p>
            </div>

            {/* Product 2 */}
            <div className="bg-[#8B3545] rounded-xl p-6 flex flex-col items-center">
              <img src={blackCooker} alt={`${brand2} ${category}`} className="w-32 h-32 object-contain mb-4" />
              <p className="text-white text-base font-semibold">{brand2} {category}</p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-[#A05663] rounded-2xl overflow-hidden mb-6">
            {/* Summary Header */}
            <div className="bg-[#8B3545] py-2 px-6">
              <h3 className="text-white text-base font-semibold">Summary</h3>
            </div>

            {/* Release Date */}
            <div className="border-b border-[#8B3545]">
              <div className="bg-[#8B3545] py-2 px-6">
                <p className="text-white text-sm font-medium text-center">Release Date</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-[#A05663] py-3 px-6 border-r border-[#8B3545]">
                  <p className="text-white text-sm text-center">2023</p>
                </div>
                <div className="bg-[#A05663] py-3 px-6">
                  <p className="text-white text-sm text-center">2022</p>
                </div>
              </div>
            </div>

            {/* Material */}
            <div className="border-b border-[#8B3545]">
              <div className="bg-[#8B3545] py-2 px-6">
                <p className="text-white text-sm font-medium text-center">Material</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-[#A05663] py-3 px-6 border-r border-[#8B3545]">
                  <p className="text-white text-sm text-center">Stainless Steel</p>
                </div>
                <div className="bg-[#A05663] py-3 px-6">
                  <p className="text-white text-sm text-center">Aluminum</p>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div className="border-b border-[#8B3545]">
              <div className="bg-[#8B3545] py-2 px-6">
                <p className="text-white text-sm font-medium text-center">Dimensions</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-[#A05663] py-3 px-6 border-r border-[#8B3545]">
                  <p className="text-white text-sm text-center">25 x 25 x 15 cm</p>
                </div>
                <div className="bg-[#A05663] py-3 px-6">
                  <p className="text-white text-sm text-center">24 x 24 x 14 cm</p>
                </div>
              </div>
            </div>

            {/* Weight */}
            <div className="border-b border-[#8B3545]">
              <div className="bg-[#8B3545] py-2 px-6">
                <p className="text-white text-sm font-medium text-center">Weight</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-[#A05663] py-3 px-6 border-r border-[#8B3545]">
                  <p className="text-white text-sm text-center">2.5 kg</p>
                </div>
                <div className="bg-[#A05663] py-3 px-6">
                  <p className="text-white text-sm text-center">1.8 kg</p>
                </div>
              </div>
            </div>

            {/* Heat Conductivity */}
            <div className="border-b border-[#8B3545]">
              <div className="bg-[#8B3545] py-2 px-6">
                <p className="text-white text-sm font-medium text-center">Heat Conductivity</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-[#A05663] py-3 px-6 border-r border-[#8B3545]">
                  <p className="text-white text-sm text-center">Excellent</p>
                </div>
                <div className="bg-[#A05663] py-3 px-6">
                  <p className="text-white text-sm text-center">Very Good</p>
                </div>
              </div>
            </div>

            {/* Heat Retention */}
            <div className="border-b border-[#8B3545]">
              <div className="bg-[#8B3545] py-2 px-6">
                <p className="text-white text-sm font-medium text-center">Heat Retention</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-[#A05663] py-3 px-6 border-r border-[#8B3545]">
                  <p className="text-white text-sm text-center">High</p>
                </div>
                <div className="bg-[#A05663] py-3 px-6">
                  <p className="text-white text-sm text-center">Medium</p>
                </div>
              </div>
            </div>

            {/* Stovetop/Oven compatibility */}
            <div className="border-b border-[#8B3545]">
              <div className="bg-[#8B3545] py-2 px-6">
                <p className="text-white text-sm font-medium text-center">Stovetop/Oven compatibility</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-[#A05663] py-3 px-6 border-r border-[#8B3545]">
                  <p className="text-white text-sm text-center">Gas, Induction, Oven</p>
                </div>
                <div className="bg-[#A05663] py-3 px-6">
                  <p className="text-white text-sm text-center">Gas, Induction</p>
                </div>
              </div>
            </div>

            {/* Durability/Longevity */}
            <div className="border-b border-[#8B3545]">
              <div className="bg-[#8B3545] py-2 px-6">
                <p className="text-white text-sm font-medium text-center">Durability/Longevity</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-[#A05663] py-3 px-6 border-r border-[#8B3545]">
                  <p className="text-white text-sm text-center">10+ years</p>
                </div>
                <div className="bg-[#A05663] py-3 px-6">
                  <p className="text-white text-sm text-center">5-7 years</p>
                </div>
              </div>
            </div>

            {/* Energy Efficiency */}
            <div className="border-b border-[#8B3545]">
              <div className="bg-[#8B3545] py-2 px-6">
                <p className="text-white text-sm font-medium text-center">Energy Efficiency</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-[#A05663] py-3 px-6 border-r border-[#8B3545]">
                  <p className="text-white text-sm text-center">A+</p>
                </div>
                <div className="bg-[#A05663] py-3 px-6">
                  <p className="text-white text-sm text-center">A</p>
                </div>
              </div>
            </div>

            {/* Price Comparison */}
            <div className="border-b border-[#8B3545]">
              <div className="bg-[#8B3545] py-2 px-6">
                <p className="text-white text-sm font-medium text-center">Price Comparison</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-[#A05663] py-3 px-6 border-r border-[#8B3545]">
                  <p className="text-white text-sm text-center">₹3,500</p>
                </div>
                <div className="bg-[#A05663] py-3 px-6">
                  <p className="text-white text-sm text-center">₹2,800</p>
                </div>
              </div>
            </div>

            {/* User Ratings */}
            <div>
              <div className="bg-[#8B3545] py-2 px-6">
                <p className="text-white text-sm font-medium text-center">User Ratings</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-[#A05663] py-3 px-6 border-r border-[#8B3545]">
                  <p className="text-white text-sm text-center">4.5/5 ⭐</p>
                </div>
                <div className="bg-[#A05663] py-3 px-6">
                  <p className="text-white text-sm text-center">4.2/5 ⭐</p>
                </div>
              </div>
            </div>
          </div>

          {/* Compare Others Button */}
          <div className="flex justify-center">
            <Link to="/compare">
              <button className="bg-[#5C2832] text-white px-16 py-3 rounded-full text-base font-medium shadow-lg hover:bg-[#4a1f28] transition-colors">
                Compare Others
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}