import React, { createContext, useState, useContext, useEffect } from "react";
import logo from "./Assets/logo.png";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import About from "./About";
import Help from "./Help";
import Auth from "./Auth";
import Home from "./Home";
import UserProfile from "./UserProfile";
import CategoryPage from "./Category";
import Materials from './Materials';
import Compare from "./Compare";
import ProtectedRoute from "./components/ProtectedRoute";
import ComparisonResult from "./ComparisonResult";
import SearchResultsPage from "./SearchResultsPage";
import SelectProducts from "./SelectProducts";
import Profile from "./Profile";

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Auth Provider Component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isSkipped, setIsSkipped] = useState(false);

  // ✅ Persist auth state on page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const skipped = localStorage.getItem("isSkipped");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsSkipped(false);
    } else if (skipped === "true") {
      setIsSkipped(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsSkipped(false);

    // Save to storage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.removeItem("isSkipped");
  };

  const signup = (userData) => {
    setUser(userData);
    setIsSkipped(false);

    // Save to storage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.removeItem("isSkipped");
  };

  const skip = () => {
    setIsSkipped(true);
    setUser(null);

    localStorage.setItem("isSkipped", "true");
    localStorage.removeItem("user");
  };

  const logout = () => {
    setUser(null);
    setIsSkipped(false);

    // Clear everything when logging out
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isSkipped");
  };

  return (
    <AuthContext.Provider value={{ user, isSkipped, login, signup, skip, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Protected Route Component

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center font-sans relative overflow-hidden p-8">
      {/* Animated background blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Vertical stripe on the right */}
      <div className="absolute right-[22%] top-0 h-full w-[15%] bg-gradient-to-b from-slate-700/50 to-slate-800/50 backdrop-blur-sm"></div>

      {/* Navigation bar on the stripe - slide down animation */}
      <div className="absolute top-8 right-[23%] z-20 animate-slideDown">
        <nav className="flex gap-10 text-white text-base font-medium">
          <Link to="/home" className="hover:text-emerald-400 transition-all hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">Home</Link>
          <Link to="/about" className="hover:text-emerald-400 transition-all hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">About</Link>
          <Link to="/help" className="hover:text-emerald-400 transition-all hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">Help</Link>
        </nav>
      </div>

      {/* Main card - glassmorphism with scale animation */}
      <div className="relative z-10 w-[90%] max-w-[1200px] bg-white/10 backdrop-blur-xl rounded-[50px] shadow-2xl p-20 mr-[8%] border border-white/20 animate-scaleIn">
        {/* Logo and Title - slide in from left */}
        <div className="flex items-center gap-8 mb-12 animate-slideInLeft">
          <img src={logo} alt="Cookware Matrix logo" className="w-44 h-44 drop-shadow-2xl animate-fadeInRotate" />
          <div>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-[5.5rem] font-bold leading-[1.1] tracking-tight drop-shadow-lg">
              COOKWARE<br />MATRIX
            </h1>
            <p className="text-slate-300 text-xl mt-4 font-light">
              Your intelligent cookware comparison platform
            </p>
          </div>
        </div>
        
        {/* Button - fade in from bottom */}
        <Link to="/Auth">
          <button
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-12 py-5 rounded-full text-xl font-semibold shadow-2xl hover:from-emerald-400 hover:to-teal-400 transition-all transform hover:scale-110 hover:shadow-emerald-500/50 animate-fadeInUp"
            type="button"
          >
            Let's get started →
          </button>
        </Link>
      </div>

      {/* Info bubble overlapping the stripe - slide in from right + float */}
      <div className="absolute right-[20%] top-[36%] -translate-y-1/2 z-30 animate-slideInRight">
        <div className="bg-gradient-to-br from-slate-700/90 to-slate-800/90 backdrop-blur-md text-white p-8 rounded-3xl shadow-2xl w-[320px] relative border border-slate-600/50 animate-float">
          {/* Speech bubble pointer */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-slate-800/90"></div>
          
          <p className="text-base leading-relaxed text-slate-200">
            Cookware Matrix helps you choose the best pots and pans. We provide simple, clear comparisons so you can find the right tools for your kitchen. Stop guessing, start cooking.
          </p>
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

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
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

        @keyframes fadeInRotate {
          from {
            opacity: 0;
            transform: rotate(-10deg);
          }
          to {
            opacity: 1;
            transform: rotate(0deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.8s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out 0.2s both;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out 0.4s both;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }

        .animate-fadeInRotate {
          animation: fadeInRotate 0.8s ease-out 0.3s both;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/auth" element={<Auth />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/select-products" element={<SelectProducts />} />
          <Route path="/help" element={<Help />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/compare" element={
            <ProtectedRoute>
              <Compare />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/comparison-result" element={<ComparisonResult />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}