// Materials.js
import React, { useState } from "react";
import { ArrowLeft, Sparkles, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "./Assets/logo.png";

export default function MaterialsPage() {
  const navigate = useNavigate();
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const materials = [
    {
      id: 1,
      name: "Stainless Steel",
      icon: "🔩",
      gradient: "from-gray-400 to-gray-600",
      description: "Durable and versatile metal alloy commonly used in cookware",
      advantages: [
        "Extremely durable and long-lasting",
        "Resistant to rust and corrosion",
        "Non-reactive with acidic foods",
        "Dishwasher safe and easy to clean",
        "Maintains heat well for even cooking",
        "Professional appearance"
      ],
      disadvantages: [
        "Can be expensive, especially high-grade steel",
        "Food may stick if not properly preheated",
        "Poor heat conductor without aluminum/copper core",
        "Can discolor over time with high heat"
      ],
      bestFor: "Sautéing, browning, and deglazing"
    },
    {
      id: 2,
      name: "Cast Iron",
      icon: "⚫",
      gradient: "from-zinc-700 to-zinc-900",
      description: "Heavy-duty iron cookware known for excellent heat retention",
      advantages: [
        "Exceptional heat retention and distribution",
        "Naturally non-stick when seasoned properly",
        "Can go from stovetop to oven",
        "Lasts for generations with proper care",
        "Adds small amounts of dietary iron to food",
        "Affordable compared to other materials"
      ],
      disadvantages: [
        "Very heavy and difficult to handle",
        "Requires regular seasoning and maintenance",
        "Can rust if not dried properly",
        "Slow to heat up",
        "Reactive with acidic foods (can affect taste)",
        "Not dishwasher safe"
      ],
      bestFor: "Searing, frying, and slow-cooking"
    },
    {
      id: 3,
      name: "Non-Stick (PTFE/Teflon)",
      icon: "✨",
      gradient: "from-slate-400 to-slate-600",
      description: "Coating that prevents food from sticking during cooking",
      advantages: [
        "Food slides off easily, minimal sticking",
        "Requires less oil or butter for cooking",
        "Very easy to clean",
        "Lightweight and easy to handle",
        "Great for delicate foods like eggs and fish",
        "Affordable"
      ],
      disadvantages: [
        "Coating can scratch and degrade over time",
        "Not suitable for high-heat cooking",
        "Cannot use metal utensils",
        "Coating may release harmful fumes if overheated",
        "Typically needs replacement every 3-5 years",
        "Not oven-safe at high temperatures"
      ],
      bestFor: "Low-heat cooking, eggs, and delicate foods"
    },
    {
      id: 4,
      name: "Copper",
      icon: "🟤",
      gradient: "from-orange-400 to-orange-700",
      description: "Premium metal with superior heat conductivity",
      advantages: [
        "Best heat conductor of all cookware materials",
        "Heats up and cools down quickly",
        "Precise temperature control",
        "Beautiful aesthetic appearance",
        "Even heat distribution prevents hot spots",
        "Professional chef's choice"
      ],
      disadvantages: [
        "Very expensive",
        "Requires regular polishing to maintain appearance",
        "Can react with acidic foods (needs lining)",
        "Typically lined with tin or stainless steel",
        "Heavy and requires careful handling",
        "Not dishwasher safe"
      ],
      bestFor: "Sauces, caramel, and temperature-sensitive dishes"
    },
    {
      id: 5,
      name: "Aluminum",
      icon: "⚪",
      gradient: "from-slate-300 to-slate-500",
      description: "Lightweight metal with good heat conductivity",
      advantages: [
        "Excellent heat conductor",
        "Lightweight and easy to handle",
        "Heats up quickly",
        "Affordable",
        "Even heat distribution",
        "Good for everyday cooking"
      ],
      disadvantages: [
        "Can react with acidic and alkaline foods",
        "Not as durable as other materials",
        "Can warp at high temperatures",
        "May discolor over time",
        "Concerns about aluminum leaching into food",
        "Cannot be used on induction cooktops (unless magnetic base)"
      ],
      bestFor: "Boiling water, everyday cooking tasks"
    },
    {
      id: 6,
      name: "Ceramic",
      icon: "🏺",
      gradient: "from-amber-300 to-amber-600",
      description: "Natural non-stick coating made from sand-derived materials",
      advantages: [
        "PTFE and PFOA-free (safer alternative to Teflon)",
        "Non-stick surface without synthetic chemicals",
        "Can withstand higher heat than traditional non-stick",
        "Easy to clean",
        "Beautiful, often colorful designs",
        "Eco-friendly option"
      ],
      disadvantages: [
        "Non-stick properties degrade faster than PTFE",
        "Can chip or crack if dropped",
        "Not as durable as metal cookware",
        "Sensitive to thermal shock",
        "Cannot use metal utensils",
        "Hand washing recommended despite claims"
      ],
      bestFor: "Moderate-heat cooking and aesthetic presentation"
    },
    {
      id: 7,
      name: "Carbon Steel",
      icon: "⬛",
      gradient: "from-gray-600 to-gray-800",
      description: "Similar to cast iron but lighter and more responsive",
      advantages: [
        "Lighter than cast iron",
        "Heats up faster than cast iron",
        "Develops natural non-stick patina",
        "Highly durable and long-lasting",
        "Can handle very high heat",
        "Preferred by professional chefs for woks and pans"
      ],
      disadvantages: [
        "Requires seasoning like cast iron",
        "Can rust if not maintained properly",
        "Reactive with acidic foods initially",
        "Needs hand washing",
        "May require learning curve for proper use",
        "Can discolor over time"
      ],
      bestFor: "Stir-frying, high-heat searing, and wok cooking"
    },
    {
      id: 8,
      name: "Hard-Anodized Aluminum",
      icon: "🔘",
      gradient: "from-gray-500 to-gray-700",
      description: "Electrochemically hardened aluminum with enhanced durability",
      advantages: [
        "Harder than stainless steel surface",
        "Non-reactive with acidic foods",
        "Excellent heat conduction",
        "Scratch and corrosion resistant",
        "Lightweight compared to cast iron",
        "More durable than regular aluminum"
      ],
      disadvantages: [
        "Cannot be used on induction without magnetic base",
        "More expensive than regular aluminum",
        "Dark color can make it hard to see food browning",
        "Not dishwasher safe",
        "Can lose non-stick properties over time",
        "Cannot be repaired if coating is damaged"
      ],
      bestFor: "Everyday cooking and sautéing"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-8 py-6 animate-slideDown">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Cookware Matrix logo" className="w-16 h-16 drop-shadow-2xl" />
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Cookware Materials
          </h2>
        </div>
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-white hover:text-purple-400 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-scaleIn">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400 text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
            Know Your Materials
          </h1>
          <p className="text-slate-300 text-xl font-light max-w-3xl mx-auto">
            Understanding cookware materials helps you make informed decisions for your kitchen. Each material has unique properties, advantages, and ideal use cases.
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {materials.map((material, index) => (
            <button
              key={material.id}
              onClick={() => setSelectedMaterial(material)}
              className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all transform hover:scale-105 hover:shadow-2xl animate-fadeInUp text-left ${
                selectedMaterial?.id === material.id ? 'ring-2 ring-purple-500' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-6xl mb-4">{material.icon}</div>
              <h3 className="text-white font-bold text-xl mb-2">{material.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{material.description}</p>
              <div className={`mt-4 text-transparent bg-clip-text bg-gradient-to-r ${material.gradient} font-semibold`}>
                Learn More →
              </div>
            </button>
          ))}
        </div>

        {/* Detailed View */}
        {selectedMaterial && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 animate-fadeIn">
            <div className="flex items-start gap-6 mb-8">
              <div className="text-7xl">{selectedMaterial.icon}</div>
              <div className="flex-1">
                <h2 className={`text-transparent bg-clip-text bg-gradient-to-r ${selectedMaterial.gradient} text-4xl font-bold mb-2`}>
                  {selectedMaterial.name}
                </h2>
                <p className="text-slate-300 text-lg">{selectedMaterial.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Advantages */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-emerald-400 font-bold text-2xl">Advantages</h3>
                </div>
                <ul className="space-y-3">
                  {selectedMaterial.advantages.map((advantage, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span className="text-slate-200 leading-relaxed">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disadvantages */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-6 h-6 text-red-400" />
                  <h3 className="text-red-400 font-bold text-2xl">Disadvantages</h3>
                </div>
                <ul className="space-y-3">
                  {selectedMaterial.disadvantages.map((disadvantage, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span className="text-slate-200 leading-relaxed">{disadvantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Best For */}
            <div className="mt-8 bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6">
              <h3 className="text-purple-400 font-bold text-xl mb-3">Best Used For</h3>
              <p className="text-slate-200 text-lg leading-relaxed">{selectedMaterial.bestFor}</p>
            </div>
          </div>
        )}

        {/* No Selection Prompt */}
        {!selectedMaterial && (
          <div className="text-center py-16 animate-fadeIn">
            <p className="text-slate-400 text-xl">
              👆 Click on any material above to learn more about its properties
            </p>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.8s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out both; }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>
    </div>
  );
}