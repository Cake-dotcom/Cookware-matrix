import React, { useState, useEffect, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./Assets/logo.png";
import { formatPrice, getImage } from "./utils/formatters";

// Comparison data structure
const comparisonData = [
  { 
    label: "Release Date", 
    field: "releaseYear",
    type: "year",
    higherIsBetter: true
  },
  { 
    label: "Material", 
    field: "material",
    type: "text"
  },
  { 
    label: "Dimensions", 
    field: "dimensions",
    type: "text"
  },
  { 
    label: "Weight", 
    field: "weight",
    type: "weight",
    higherIsBetter: false
  },
  { 
    label: "Heat Compatibility", 
    field: "heatCompatibility",
    type: "text"
  },
  { 
    label: "Durability/Longevity", 
    field: "durability",
    type: "text"
  },
  { 
    label: "Energy Efficiency", 
    field: "efficiency",
    type: "grade"
  },
  { 
    label: "Price", 
    field: "price",
    type: "price",
    higherIsBetter: false
  },
  { 
    label: "User Ratings", 
    field: "rating",
    type: "rating",
    higherIsBetter: true
  }
];

// Reusable Comparison Row Component
const ComparisonRow = memo(({ item, product1, product2, isLast }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const value1 = product1?.[item.field] || "N/A";
  const value2 = product2?.[item.field] || "N/A";

  // Format values
  const displayValue1 = item.type === "price" && typeof value1 === "number" 
    ? formatPrice(value1) 
    : value1;
  const displayValue2 = item.type === "price" && typeof value2 === "number" 
    ? formatPrice(value2) 
    : value2;

  const getBadge = (isProduct1) => {
    if (value1 === "N/A" || value2 === "N/A") return "➖";
    
    // If values are equal, no winner
    if (value1 === value2) return "➖";
    
    let product1Better = false;
    
    if (item.type === "year" || item.type === "rating") {
      product1Better = parseFloat(value1) > parseFloat(value2);
    } else if (item.type === "weight") {
      product1Better = parseFloat(value1) < parseFloat(value2);
    } else if (item.type === "price") {
      product1Better = parseFloat(value1) < parseFloat(value2);
    } else if (item.type === "grade") {
      const grades = ["C", "B", "A", "A+", "A++"];
      product1Better = grades.indexOf(value1) > grades.indexOf(value2);
    }
    
    if (isProduct1) {
      return product1Better ? "✔️" : "➖";
    } else {
      return !product1Better ? "✔️" : "➖";
    }
  };

  const getCellClass = (isProduct1) => {
    const badge = getBadge(isProduct1);
    if (badge === "✔️") return "bg-green-50 border-green-200";
    return "bg-slate-50";
  };

  return (
    <div 
      className={`transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${!isLast ? 'border-b border-gray-200' : ''}`}
    >
      <div className="bg-gradient-to-r from-slate-600 to-slate-700 py-3 px-4 md:px-8">
        <p className="text-white text-sm md:text-base font-medium text-center">{item.label}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className={`${getCellClass(true)} py-4 px-4 md:px-8 md:border-r border-gray-200 transition-all duration-300`}>
          <p className="text-slate-700 text-sm md:text-base text-center font-medium">
            {getBadge(true)} {displayValue1}
          </p>
          <p className="text-xs text-slate-500 text-center mt-1 md:hidden">{product1?.brand} - {product1?.title}</p>
        </div>
        <div className={`${getCellClass(false)} py-4 px-4 md:px-8 transition-all duration-300 border-t md:border-t-0 border-gray-200`}>
          <p className="text-slate-700 text-sm md:text-base text-center font-medium">
            {getBadge(false)} {displayValue2}
          </p>
          <p className="text-xs text-slate-500 text-center mt-1 md:hidden">{product2?.brand} - {product2?.title}</p>
        </div>
      </div>
    </div>
  );
});

// Product Card Component
const ProductCard = memo(({ product, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200 * index);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      className={`bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-4 md:p-8 flex flex-col items-center shadow-lg transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <img 
        src={getImage(product?.image)} 
        alt={`${product?.brand} ${product?.category}`} 
        className="w-32 h-32 md:w-40 md:h-40 object-contain mb-4 md:mb-6 transition-transform duration-300 hover:scale-110 cursor-pointer"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150x150/64748b/FFFFFF?text=No+Image";
          e.target.onerror = null;
        }}
      />
      <p className="text-white text-base md:text-lg font-semibold text-center">{product?.title || `${product?.brand} ${product?.category}`}</p>
      <p className="text-slate-300 text-sm text-center mt-2">{product?.brand}</p>
    </div>
  );
});

// Sticky Header Component
const StickyHeader = memo(({ product1, product2 }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create unique display names
  const display1 = product1?.title || `${product1?.brand} ${product1?.category}`;
  const display2 = product2?.title || `${product2?.brand} ${product2?.category}`;

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${
      isSticky ? 'shadow-2xl' : ''
    }`}>
      <div className="w-full bg-gradient-to-r from-slate-800 to-slate-900 py-4 md:py-8 px-4 md:px-12 flex items-center gap-2 md:gap-6 rounded-t-[30px]">
        <img src={logo} alt="Cookware Matrix logo" className="w-12 h-12 md:w-16 md:h-16" />
        <h1 className="text-white text-xl md:text-4xl font-bold flex-1 text-center">
          {isSticky ? (
            <span className="text-base md:text-2xl">{display1} vs {display2}</span>
          ) : (
            'Discover Your Perfect Match'
          )}
        </h1>
        <nav className="hidden md:flex gap-6 text-white text-sm font-medium">
          <Link to="/home" className="hover:text-emerald-400 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-emerald-400 transition-colors">About</Link>
          <Link to="/help" className="hover:text-emerald-400 transition-colors">Help</Link>
        </nav>
      </div>
    </div>
  );
});

// Breadcrumb Component
const Breadcrumb = () => (
  <div className="mb-6 flex items-center gap-2 text-sm text-slate-600 animate-fade-in">
    <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
    <span>›</span>
    <Link to="/compare" className="hover:text-emerald-600 transition-colors">Compare</Link>
    <span>›</span>
    <Link to="/select-products" className="hover:text-emerald-600 transition-colors">Select Products</Link>
    <span>›</span>
    <span className="text-slate-800 font-medium">Results</span>
  </div>
);

// Conclusion Card Component
const ConclusionCard = memo(({ product1, product2 }) => {
  // Calculate scores based on available data
  const calculateScore = (product) => {
    let score = 5; // Base score
    if (product.rating) score += parseFloat(product.rating) / 2;
    if (product.efficiency === "A++" || product.efficiency === "A+") score += 1;
    if (product.durability === "High") score += 0.5;
    return Math.min(score, 10).toFixed(1);
  };

  const score1 = calculateScore(product1);
  const score2 = calculateScore(product2);
  const winner = parseFloat(score1) > parseFloat(score2) ? product1 : 
                 parseFloat(score1) < parseFloat(score2) ? product2 : null;

  const display1 = product1?.title || `${product1?.brand} ${product1?.category}`;
  const display2 = product2?.title || `${product2?.brand} ${product2?.category}`;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 md:p-8 mb-8 shadow-lg border-2 border-emerald-200 animate-fade-in">
      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        {winner ? `🏆 Winner: ${winner?.title || winner?.brand}` : '🤝 It\'s a Tie!'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-lg font-semibold text-slate-700">{display1}</p>
          <p className="text-3xl font-bold text-emerald-600">{score1}/10</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-lg font-semibold text-slate-700">{display2}</p>
          <p className="text-3xl font-bold text-teal-600">{score2}/10</p>
        </div>
      </div>
      {winner && (
        <div className="space-y-2 text-slate-700">
          <p className="font-medium">Why {winner?.title || winner?.brand} wins:</p>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
            {winner?.rating && <li>Higher user rating ({winner.rating}★)</li>}
            {winner?.efficiency && <li>Better energy efficiency ({winner.efficiency})</li>}
            {winner?.durability && <li>Superior durability ({winner.durability})</li>}
            {winner?.price && <li>Competitive pricing ({formatPrice(winner.price)})</li>}
          </ul>
        </div>
      )}
    </div>
  );
});

export default function ComparisonResult() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract state - prefer product IDs if present
  const { 
    product1: directProduct1, 
    product2: directProduct2, 
    category, 
    brand1, 
    brand2, 
    product1Id, 
    product2Id 
  } = location.state || {};

  const [product1, setProduct1] = useState(directProduct1 || null);
  const [product2, setProduct2] = useState(directProduct2 || null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch products by ID if IDs are provided but products aren't
  useEffect(() => {
    const fetchProducts = async () => {
      // Only fetch if we have IDs but no direct product objects
      if (product1Id && !directProduct1) {
        setLoading(true);
        try {
          const res = await fetch(`http://localhost:5000/api/cookware/${product1Id}`);
          const data = await res.json();
          setProduct1(data);
        } catch (error) {
          console.error("Error fetching product1:", error);
        }
      }

      if (product2Id && !directProduct2) {
        setLoading(true);
        try {
          const res = await fetch(`http://localhost:5000/api/cookware/${product2Id}`);
          const data = await res.json();
          setProduct2(data);
        } catch (error) {
          console.error("Error fetching product2:", error);
        }
      }
      
      setLoading(false);
    };

    fetchProducts();
  }, [product1Id, product2Id, directProduct1, directProduct2]);

  // ✅ Verify product IDs are available
  useEffect(() => {
    if (product1 && product2) {
      console.log("Product 1 ID:", product1._id);
      console.log("Product 2 ID:", product2._id);
    }
  }, [product1, product2]);

  // Redirect if no products provided
  useEffect(() => {
    if (!loading && !product1 && !product2 && !product1Id && !product2Id) {
      navigate("/compare");
    }
  }, [product1, product2, product1Id, product2Id, loading, navigate]);

  // Prevent comparing the same product (check by ID or unique identifier)
  useEffect(() => {
    if (product1 && product2) {
      // Check if products are identical (same ID or all fields match)
      const isSameProduct = 
        (product1._id && product2._id && product1._id === product2._id) ||
        (product1.id && product2.id && product1.id === product2.id) ||
        (product1.title === product2.title && 
         product1.brand === product2.brand && 
         product1.price === product2.price);
      
      if (isSameProduct) {
        alert("Cannot compare identical products. Please select different products.");
        navigate("/select-products", { state: { category } });
      }
    }
  }, [product1, product2, category, navigate]);

  // ✅ SAVE COMPARISON TO DATABASE
  const handleSaveComparison = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setToastMessage("⚠️ Please login to save comparisons");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    // Validate product IDs exist
    if (!product1?._id || !product2?._id) {
      setToastMessage("❌ Cannot save: Product IDs missing");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/comparisons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user._id || user.id,
          product1: product1._id,
          product2: product2._id,
          category: category || product1.category
        })
      });

      const data = await res.json();

      if (res.ok) {
        setToastMessage("✅ Comparison saved successfully!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        setToastMessage(data.message || "❌ Save failed");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (err) {
      console.error("Save error:", err);
      setToastMessage("❌ Error saving comparison");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading comparison...</div>
      </div>
    );
  }

  if (!product1 || !product2) {
    return null;
  }

  const handleShare = () => {
    const text = `Check out this comparison: ${product1.title || product1.brand} vs ${product2.title || product2.brand}`;
    if (navigator.share) {
      navigator.share({ title: 'Cookware Comparison', text });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToastMessage("📋 Link copied to clipboard!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const displayTitle = `${product1.title || product1.brand} vs ${product2.title || product2.brand} - ${category || product1.category}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-2 md:p-4">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-slide-up">
          {toastMessage}
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-[1400px] bg-gradient-to-br from-slate-100 to-gray-50 rounded-[20px] md:rounded-[40px] shadow-2xl overflow-hidden">
        {/* Sticky Header */}
        <StickyHeader product1={product1} product2={product2} />

        {/* Main Content */}
        <div className="p-4 md:p-12">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Comparison Title Bar */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-t-2xl py-3 md:py-4 px-4 md:px-8 mb-0 shadow-lg">
            <h2 className="text-white text-base md:text-xl font-semibold text-center md:text-left">
              {displayTitle}
            </h2>
          </div>

          {/* Product Images Section */}
          <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-b-2xl p-4 md:p-8 mb-8 border-l border-r border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <ProductCard product={product1} index={0} />
              <ProductCard product={product2} index={1} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
            <button 
              onClick={handleShare}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
            >
              📤 Share
            </button>
            <button 
              onClick={handleSaveComparison}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105"
            >
              💾 Save
            </button>
          </div>

          {/* Conclusion Card */}
          <ConclusionCard product1={product1} product2={product2} />

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl overflow-hidden mb-8 shadow-lg border border-gray-200">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 py-3 px-4 md:px-8">
              <h3 className="text-white text-base md:text-lg font-semibold">Detailed Comparison</h3>
            </div>
            {comparisonData.map((item, index) => (
              <ComparisonRow
                key={item.label}
                item={item}
                product1={product1}
                product2={product2}
                isLast={index === comparisonData.length - 1}
              />
            ))}
          </div>

          {/* Compare Others Button */}
          <div className="flex justify-center">
            <Link to="/compare">
              <button className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-12 md:px-16 py-3 rounded-full text-sm md:text-base font-medium shadow-lg hover:from-slate-800 hover:to-slate-900 transition-all transform hover:scale-105">
                Compare Others
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Back Button */}
      <Link to="/select-products" state={{ category }}>
        <button 
          className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-110 flex items-center justify-center text-2xl z-50"
          title="Back to Product Selection"
        >
          ⤴
        </button>
      </Link>
    </div>
  );
}