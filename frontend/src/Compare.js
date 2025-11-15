import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Assets/logo.png";

// Placeholder images - replace with actual product images
const redCooker = "https://via.placeholder.com/60x60/C85A54/FFFFFF?text=Red";
const blackCooker = "https://via.placeholder.com/60x60/3C3C3C/FFFFFF?text=Black";

// Dummy product data
const productCategories = [
  "Pressure Cooker",
  "Frying Pan",
  "Sauce Pan",
  "Wok",
  "Kadhai",
  "Tawa"
];

const productBrands = {
  "Pressure Cooker": ["Prestige", "Pigeon", "Hawkins", "Butterfly", "Wonderchef"],
  "Frying Pan": ["Prestige", "Pigeon", "Hawkins", "Meyer", "Cello"],
  "Sauce Pan": ["Prestige", "Pigeon", "Vinod", "Butterfly", "Meyer"],
  "Wok": ["Prestige", "Pigeon", "Hawkins", "Vinod", "Cello"],
  "Kadhai": ["Prestige", "Pigeon", "Hawkins", "Butterfly", "Vinod"],
  "Tawa": ["Prestige", "Pigeon", "Hawkins", "Cello", "Wonderchef"]
};

export default function Compare() {
  const navigate = useNavigate();
  
  // State for dropdowns
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand1, setSelectedBrand1] = useState("");
  const [selectedBrand2, setSelectedBrand2] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showBrand1Dropdown, setShowBrand1Dropdown] = useState(false);
  const [showBrand2Dropdown, setShowBrand2Dropdown] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
    // Reset brand selections when category changes
    setSelectedBrand1("");
    setSelectedBrand2("");
  };

  const handleBrand1Select = (brand) => {
    setSelectedBrand1(brand);
    setShowBrand1Dropdown(false);
  };

  const handleBrand2Select = (brand) => {
    setSelectedBrand2(brand);
    setShowBrand2Dropdown(false);
  };

  const availableBrands = selectedCategory ? productBrands[selectedCategory] : [];

  return (
    <div className="min-h-screen bg-[#7B2E3A] flex flex-col items-center justify-center p-8">
      {/* Main Container */}
      <div className="w-full max-w-[900px] bg-[#E8D4A0] rounded-[40px] shadow-2xl overflow-hidden pt-6 px-6 pb-6">
        {/* Header Section with rounded top */}
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
          {/* Compare Cookware Section */}
          <div className="bg-[#EAC988] rounded-3xl p-10 mb-6">
            <h2 className="text-white text-2xl font-bold mb-6">Compare Cookware</h2>
            
            {/* Select The Product */}
            <div className="mb-6">
              <h3 className="text-white text-base font-semibold mb-3">Select The Product</h3>
              <div className="flex justify-center relative">
                <button 
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="bg-[#8B3545] text-white px-16 py-2.5 rounded-full text-sm font-medium shadow-lg hover:bg-[#6d2a36] transition-colors relative"
                >
                  {selectedCategory || "Select A Product"}
                </button>
                
                {/* Category Dropdown */}
                {showCategoryDropdown && (
                  <div className="absolute top-full mt-2 bg-white rounded-xl shadow-xl z-50 w-64 max-h-60 overflow-y-auto">
                    {productCategories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategorySelect(category)}
                        className="w-full text-left px-6 py-3 hover:bg-[#EAC988] transition-colors text-[#5C2832] text-sm border-b border-gray-200 last:border-b-0"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Select Brands */}
            <div>
              <h3 className="text-white text-base font-semibold mb-3">Select Brands</h3>
              <div className="flex flex-col items-center gap-4">
                {/* Two product selectors with VS */}
                <div className="flex items-center gap-3">
                  {/* Brand 1 Selector */}
                  <div className="relative">
                    <button 
                      onClick={() => selectedCategory && setShowBrand1Dropdown(!showBrand1Dropdown)}
                      disabled={!selectedCategory}
                      className={`${!selectedCategory ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8B3545] hover:bg-[#6d2a36]'} text-white px-12 py-2.5 rounded-full text-sm font-medium shadow-lg transition-colors`}
                    >
                      {selectedBrand1 || "Select A Product"}
                    </button>
                    
                    {/* Brand 1 Dropdown */}
                    {showBrand1Dropdown && selectedCategory && (
                      <div className="absolute top-full mt-2 bg-white rounded-xl shadow-xl z-50 w-64 max-h-60 overflow-y-auto">
                        {availableBrands.map((brand, index) => (
                          <button
                            key={index}
                            onClick={() => handleBrand1Select(brand)}
                            className="w-full text-left px-6 py-3 hover:bg-[#EAC988] transition-colors text-[#5C2832] text-sm border-b border-gray-200 last:border-b-0"
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
                    VS
                  </div>

                  {/* Brand 2 Selector */}
                  <div className="relative">
                    <button 
                      onClick={() => selectedCategory && setShowBrand2Dropdown(!showBrand2Dropdown)}
                      disabled={!selectedCategory}
                      className={`${!selectedCategory ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8B3545] hover:bg-[#6d2a36]'} text-white px-12 py-2.5 rounded-full text-sm font-medium shadow-lg transition-colors`}
                    >
                      {selectedBrand2 || "Select A Product"}
                    </button>
                    
                    {/* Brand 2 Dropdown */}
                    {showBrand2Dropdown && selectedCategory && (
                      <div className="absolute top-full mt-2 bg-white rounded-xl shadow-xl z-50 w-64 max-h-60 overflow-y-auto">
                        {availableBrands.map((brand, index) => (
                          <button
                            key={index}
                            onClick={() => handleBrand2Select(brand)}
                            className="w-full text-left px-6 py-3 hover:bg-[#EAC988] transition-colors text-[#5C2832] text-sm border-b border-gray-200 last:border-b-0"
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Compare Now Button */}
                <button 
                  onClick={() => {
                    if (selectedCategory && selectedBrand1 && selectedBrand2) {
                      navigate('/comparison-result', {
                        state: {
                          category: selectedCategory,
                          brand1: selectedBrand1,
                          brand2: selectedBrand2
                        }
                      });
                    } else {
                      alert('Please select a product category and both brands to compare!');
                    }
                  }}
                  className="bg-[#5C2832] text-white px-16 py-2.5 rounded-full text-sm font-medium shadow-lg hover:bg-[#4a1f28] transition-colors"
                >
                  Compare Now
                </button>
              </div>
            </div>
          </div>

          {/* Popular Comparisons Section */}
          <div className="bg-[#EAC988] rounded-3xl p-10">
            <h2 className="text-white text-2xl font-bold mb-6">Popular Comparisons:</h2>
            
            {/* Grid of comparisons - 2 columns, 4 rows */}
            <div className="grid grid-cols-2 gap-4">
              {/* Comparison Card 1 */}
              <div className="bg-[#A05663] rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg cursor-pointer hover:bg-[#8B4A56] transition-colors">
                <div className="flex items-center gap-2">
                  <img src={redCooker} alt="Prestige cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Prestige</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs">
                  VS
                </div>
                <div className="flex items-center gap-2">
                  <img src={blackCooker} alt="Pigeon cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Pigeon</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
              </div>

              {/* Comparison Card 2 */}
              <div className="bg-[#A05663] rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg cursor-pointer hover:bg-[#8B4A56] transition-colors">
                <div className="flex items-center gap-2">
                  <img src={redCooker} alt="Prestige cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Prestige</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs">
                  VS
                </div>
                <div className="flex items-center gap-2">
                  <img src={blackCooker} alt="Pigeon cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Pigeon</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
              </div>

              {/* Comparison Card 3 */}
              <div className="bg-[#A05663] rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg cursor-pointer hover:bg-[#8B4A56] transition-colors">
                <div className="flex items-center gap-2">
                  <img src={redCooker} alt="Prestige cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Prestige</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs">
                  VS
                </div>
                <div className="flex items-center gap-2">
                  <img src={blackCooker} alt="Pigeon cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Pigeon</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
              </div>

              {/* Comparison Card 4 */}
              <div className="bg-[#A05663] rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg cursor-pointer hover:bg-[#8B4A56] transition-colors">
                <div className="flex items-center gap-2">
                  <img src={redCooker} alt="Prestige cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Prestige</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs">
                  VS
                </div>
                <div className="flex items-center gap-2">
                  <img src={blackCooker} alt="Pigeon cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Pigeon</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
              </div>

              {/* Comparison Card 5 */}
              <div className="bg-[#A05663] rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg cursor-pointer hover:bg-[#8B4A56] transition-colors">
                <div className="flex items-center gap-2">
                  <img src={redCooker} alt="Prestige cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Prestige</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs">
                  VS
                </div>
                <div className="flex items-center gap-2">
                  <img src={blackCooker} alt="Pigeon cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Pigeon</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
              </div>

              {/* Comparison Card 6 */}
              <div className="bg-[#A05663] rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg cursor-pointer hover:bg-[#8B4A56] transition-colors">
                <div className="flex items-center gap-2">
                  <img src={redCooker} alt="Prestige cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Prestige</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs">
                  VS
                </div>
                <div className="flex items-center gap-2">
                  <img src={blackCooker} alt="Pigeon cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Pigeon</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
              </div>

              {/* Comparison Card 7 */}
              <div className="bg-[#A05663] rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg cursor-pointer hover:bg-[#8B4A56] transition-colors">
                <div className="flex items-center gap-2">
                  <img src={redCooker} alt="Prestige cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Prestige</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs">
                  VS
                </div>
                <div className="flex items-center gap-2">
                  <img src={blackCooker} alt="Pigeon cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Pigeon</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
              </div>

              {/* Comparison Card 8 */}
              <div className="bg-[#A05663] rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg cursor-pointer hover:bg-[#8B4A56] transition-colors">
                <div className="flex items-center gap-2">
                  <img src={redCooker} alt="Prestige cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Prestige</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs">
                  VS
                </div>
                <div className="flex items-center gap-2">
                  <img src={blackCooker} alt="Pigeon cooker" className="w-10 h-10 rounded-lg" />
                  <div className="text-white">
                    <p className="font-semibold text-sm">Pigeon</p>
                    <p className="text-xs">cooker</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}