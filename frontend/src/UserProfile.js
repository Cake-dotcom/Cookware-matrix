import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, ArrowLeft, Mail, Calendar, Activity, Heart, Star, ShoppingBag, Settings, Bell, Shield } from "lucide-react";
import logo from "./Assets/logo.png";
import { useAuth } from "./App";

export default function UserProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Sample activity data
  const recentActivity = [
    { type: "comparison", item: "Prestige vs Pigeon Pressure Cooker", date: "2 days ago", icon: "⚖️" },
    { type: "search", item: "Non-stick frying pans", date: "3 days ago", icon: "🔍" },
    { type: "view", item: "Hawkins Futura Pressure Cooker", date: "5 days ago", icon: "👁️" },
    { type: "comparison", item: "Meyer vs Cello Frying Pan", date: "1 week ago", icon: "⚖️" },
  ];

  const savedItems = [
    { name: "Premium Non-Stick Frying Pan", brand: "CookPro Elite", price: "₹2,499", icon: "🍳" },
    { name: "Cast Iron Kadai", brand: "Lodge Classic", price: "₹1,899", icon: "🍛" },
    { name: "Multi-Purpose Wok", brand: "Asian Chef Pro", price: "₹1,599", icon: "🥟" },
  ];

  const recentComparisons = [
    { brand1: "Prestige", brand2: "Pigeon", category: "Pressure Cooker", date: "2 days ago" },
    { brand1: "Meyer", brand2: "Cello", category: "Frying Pan", date: "1 week ago" },
    { brand1: "Hawkins", brand2: "Butterfly", category: "Kadai", date: "2 weeks ago" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-8 py-6 animate-slideDown">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Cookware Matrix logo" className="w-16 h-16 drop-shadow-2xl" />
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            Cookware Matrix
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-white hover:text-emerald-400 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 hover:text-red-300 px-4 py-2 rounded-full transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 animate-scaleIn">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mb-2">
                {user.name}
              </h1>
              <div className="flex items-center gap-4 text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Joined Dec 2024</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">12</div>
                <div className="text-xs text-slate-400">Comparisons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400">8</div>
                <div className="text-xs text-slate-400">Saved Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">24</div>
                <div className="text-xs text-slate-400">Searches</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Activity className="w-5 h-5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "saved"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Heart className="w-5 h-5" />
            Saved Items
          </button>
          <button
            onClick={() => setActiveTab("comparisons")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "comparisons"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Comparisons
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "settings"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-6 h-6 text-emerald-400" />
                  <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer animate-slideUpStagger"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-3xl">{activity.icon}</span>
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.item}</p>
                        <p className="text-slate-400 text-sm">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-6 h-6 text-emerald-400" />
                  <h2 className="text-2xl font-bold text-white">Your Stats</h2>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Total Comparisons</span>
                      <span className="text-2xl font-bold text-emerald-400">12</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Products Viewed</span>
                      <span className="text-2xl font-bold text-teal-400">48</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Search Queries</span>
                      <span className="text-2xl font-bold text-cyan-400">24</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Saved Items Tab */}
          {activeTab === "saved" && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">Saved Items</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer animate-slideUpStagger"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">{item.icon}</div>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
                    <p className="text-slate-400 text-sm mb-3">{item.brand}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-emerald-400 font-bold text-xl">{item.price}</span>
                      <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-emerald-400 hover:to-teal-400 transition-all">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comparisons Tab */}
          {activeTab === "comparisons" && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">Recent Comparisons</h2>
              </div>
              <div className="space-y-4">
                {recentComparisons.map((comparison, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-2xl px-6 py-4 flex items-center justify-between hover:from-slate-600/50 hover:to-slate-700/50 transition-all cursor-pointer animate-slideUpStagger"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-white">
                        <p className="font-semibold">{comparison.brand1}</p>
                        <p className="text-xs text-gray-300">{comparison.category}</p>
                      </div>
                    </div>
                    <div className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs">
                      VS
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-white text-right">
                        <p className="font-semibold">{comparison.brand2}</p>
                        <p className="text-xs text-gray-300">{comparison.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Account Settings */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-emerald-400" />
                  <h2 className="text-2xl font-bold text-white">Account Settings</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Change Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-400 hover:to-teal-400 transition-all">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="w-6 h-6 text-emerald-400" />
                  <h2 className="text-2xl font-bold text-white">Preferences</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-slate-400 text-sm">Receive updates about new products</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-teal-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Price Alerts</p>
                      <p className="text-slate-400 text-sm">Get notified of price drops</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-teal-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Comparison History</p>
                      <p className="text-slate-400 text-sm">Save comparison history</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-teal-500"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-red-400 font-medium mb-2">Danger Zone</p>
                    <p className="text-slate-400 text-sm mb-3">Permanently delete your account and all data</p>
                    <button className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUpStagger {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.8s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out both;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out both;
        }

        .animate-slideUpStagger {
          animation: slideUpStagger 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}