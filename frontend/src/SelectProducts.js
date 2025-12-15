import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import logo from "./Assets/logo.png";

export default function SelectProducts() {
  const location = useLocation();
  const navigate = useNavigate();

  const { category, brand1, brand2 } = location.state || {};

  const [products, setProducts] = useState([]);
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [selectedProduct2, setSelectedProduct2] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if comparing products from the same brand
  const isSameBrand = brand1 === brand2;

  // Safety redirect
  useEffect(() => {
    if (!category || !brand1 || !brand2) {
      navigate("/compare");
    }
  }, [category, brand1, brand2, navigate]);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        // If same brand, fetch only once; otherwise fetch both
        if (isSameBrand) {
          const res = await fetch(
            `http://localhost:5000/api/cookware?category=${category}&brand=${brand1}`
          );
          setProducts(await res.json());
        } else {
          const res1 = await fetch(
            `http://localhost:5000/api/cookware?category=${category}&brand=${brand1}`
          );
          const res2 = await fetch(
            `http://localhost:5000/api/cookware?category=${category}&brand=${brand2}`
          );
          const data1 = await res1.json();
          const data2 = await res2.json();
          setProducts([...data1, ...data2]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, brand1, brand2, isSameBrand]);

  // Filter products by brand
  const brand1Products = products.filter(p => p.brand === brand1);
  const brand2Products = isSameBrand 
    ? brand1Products 
    : products.filter(p => p.brand === brand2);

  // Handlers that prevent selecting the same product twice
  const handleSelectProduct1 = (product) => {
    if (selectedProduct2?._id === product._id) {
      alert("You've already selected this product. Please choose a different one.");
      return;
    }
    setSelectedProduct1(product);
  };

  const handleSelectProduct2 = (product) => {
    if (selectedProduct1?._id === product._id) {
      alert("You've already selected this product. Please choose a different one.");
      return;
    }
    setSelectedProduct2(product);
  };

  const handleCompare = () => {
    if (!selectedProduct1 || !selectedProduct2) {
      alert("Please select one product from each side!");
      return;
    }

    if (selectedProduct1._id === selectedProduct2._id) {
      alert("Please select two different products to compare!");
      return;
    }

    navigate("/comparison-result", {
      state: {
        product1: selectedProduct1,
        product2: selectedProduct2,
        category,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading products…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      {/* Animated background blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto bg-white/10 backdrop-blur-xl rounded-[40px] shadow-2xl overflow-hidden border border-white/20">
        {/* Header */}
        <div className="w-full bg-gradient-to-r from-slate-700/50 to-slate-800/50 backdrop-blur-sm py-8 px-12 flex items-center justify-between rounded-t-[30px] border-b border-slate-600/30">
          <div className="flex items-center gap-6">
            <img src={logo} alt="Cookware Matrix logo" className="w-16 h-16 drop-shadow-lg" />
            <div>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 text-4xl font-bold">
                Select Products
              </h1>
              <p className="text-slate-300 text-sm mt-1">
                {isSameBrand 
                  ? `Choose two different ${brand1} products to compare`
                  : `Choose one product from each brand to compare`
                }
              </p>
            </div>
          </div>
          
          <nav className="flex gap-8 text-slate-300 text-base font-medium">
            <Link to="/home" className="hover:text-emerald-400 transition-all">Home</Link>
            <Link to="/compare" className="hover:text-emerald-400 transition-all">Back</Link>
          </nav>
        </div>

        {/* Category Badge */}
        <div className="px-12 pt-8 pb-4">
          <div className="inline-flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full px-6 py-2">
            <span className="text-2xl">🍳</span>
            <span className="text-emerald-300 font-semibold">{category}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative">
            
            {/* BRAND 1 / PRODUCT 1 COLUMN */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {isSameBrand ? `${brand1} – Product 1` : brand1}
                </h2>
                {selectedProduct1 && (
                  <div className="flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full px-4 py-1">
                    <span className="text-emerald-400 text-sm">✓ Selected</span>
                  </div>
                )}
              </div>
              
              {brand1Products.length === 0 ? (
                <div className="bg-white/5 rounded-xl p-8 text-center text-slate-400">
                  No products available for {brand1}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {brand1Products.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleSelectProduct1(product)}
                      className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 hover:scale-105 ${
                        selectedProduct1?._id === product._id
                          ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                          : selectedProduct2?._id === product._id
                          ? "border-red-500/50 bg-red-500/5 opacity-50 cursor-not-allowed"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={product.image || "https://via.placeholder.com/150x150/64748b/FFFFFF?text=No+Image"}
                          alt={product.title}
                          className="w-full h-32 object-contain mb-3 rounded-lg"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150x150/64748b/FFFFFF?text=No+Image";
                            e.target.onerror = null;
                          }}
                        />
                        {selectedProduct1?._id === product._id && (
                          <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            ✓
                          </div>
                        )}
                        {selectedProduct2?._id === product._id && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            ✗
                          </div>
                        )}
                      </div>
                      <h3 className="text-white text-sm font-semibold line-clamp-2 mb-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-slate-400 text-xs">{product.material || "N/A"}</p>
                        <p className="text-emerald-400 font-bold text-sm">
                          ₹{product.price?.toLocaleString() || "N/A"}
                        </p>
                      </div>
                      {product.rating && (
                        <div className="mt-2 flex items-center gap-1">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-slate-300 text-xs">{product.rating}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* VS Divider */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-2xl">
                VS
              </div>
            </div>

            {/* BRAND 2 / PRODUCT 2 COLUMN */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {isSameBrand ? `${brand2} – Product 2` : brand2}
                </h2>
                {selectedProduct2 && (
                  <div className="flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full px-4 py-1">
                    <span className="text-emerald-400 text-sm">✓ Selected</span>
                  </div>
                )}
              </div>
              
              {brand2Products.length === 0 ? (
                <div className="bg-white/5 rounded-xl p-8 text-center text-slate-400">
                  No products available for {brand2}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {brand2Products.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleSelectProduct2(product)}
                      className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 hover:scale-105 ${
                        selectedProduct2?._id === product._id
                          ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                          : selectedProduct1?._id === product._id
                          ? "border-red-500/50 bg-red-500/5 opacity-50 cursor-not-allowed"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={product.image || "https://via.placeholder.com/150x150/64748b/FFFFFF?text=No+Image"}
                          alt={product.title}
                          className="w-full h-32 object-contain mb-3 rounded-lg"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150x150/64748b/FFFFFF?text=No+Image";
                            e.target.onerror = null;
                          }}
                        />
                        {selectedProduct2?._id === product._id && (
                          <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            ✓
                          </div>
                        )}
                        {selectedProduct1?._id === product._id && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            ✗
                          </div>
                        )}
                      </div>
                      <h3 className="text-white text-sm font-semibold line-clamp-2 mb-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-slate-400 text-xs">{product.material || "N/A"}</p>
                        <p className="text-emerald-400 font-bold text-sm">
                          ₹{product.price?.toLocaleString() || "N/A"}
                        </p>
                      </div>
                      {product.rating && (
                        <div className="mt-2 flex items-center gap-1">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-slate-300 text-xs">{product.rating}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Compare Button */}
          <div className="mt-12 flex justify-center">
            <button
              disabled={
                !selectedProduct1 || 
                !selectedProduct2 || 
                selectedProduct1._id === selectedProduct2._id
              }
              onClick={handleCompare}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-16 py-4 rounded-full text-lg font-semibold shadow-xl hover:from-emerald-400 hover:to-teal-400 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3"
            >
              Compare Selected Products
              <span>⚖️</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Back Button */}
      <Link to="/compare">
        <button 
          className="fixed bottom-6 right-6 bg-gradient-to-r from-slate-600 to-slate-700 text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl hover:from-slate-500 hover:to-slate-600 transition-all transform hover:scale-110 flex items-center justify-center text-2xl z-50"
          title="Back to Compare"
        >
          ←
        </button>
      </Link>
    </div>
  );
}