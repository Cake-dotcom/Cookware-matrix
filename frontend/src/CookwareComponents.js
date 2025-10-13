import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/*
  This file contains all the individual components for each page.
  The ProductsPage has been updated with basic logic to fetch data from your API.
*/

// --- 1. Utility Components ---

// Reusable loader component
const Loader = () => (
    <div className="flex justify-center items-center p-8">
        <svg className="animate-spin h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="ml-3 text-red-600">Loading Cookware...</span>
    </div>
);

// Reusable full-page content container
const ContentPage = ({ title, children, color }) => (
  <div className={`bg-white p-8 rounded-lg shadow-xl border-t-8 ${color}`}>
    <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">{title}</h1>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

// Reusable component for displaying basic product placeholders
const ProductDisplay = ({ title, color }) => (
  <div className={`w-32 h-32 ${color} rounded-lg flex items-center justify-center text-sm font-semibold text-gray-700 shadow-md`}>
    {title}
  </div>
);

// Component for selection dropdowns
const SelectionBox = ({ label, options }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <select className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Component for displaying a single product card
const ProductCard = ({ product }) => (
  <div className="border border-gray-200 rounded-lg p-3 text-center shadow-sm hover:shadow-lg transition duration-150 bg-white transform hover:scale-[1.02]">
    <div className="w-full h-20 bg-red-100 rounded mb-2 flex items-center justify-center text-red-700 font-bold">
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm1 13a1 1 0 11-2 0 1 1 0 012 0zm0-4a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
    </div>
    <p className="text-base font-semibold text-gray-800">{product.title}</p>
    <p className="text-sm text-gray-500">{product.brand}</p>
    <p className="text-lg font-bold text-red-600 mt-1">₹{product.price}</p>
    <Link to={`/compare/${product._id}`} className="text-xs text-blue-600 hover:underline mt-1 block">
      View Details
    </Link>
  </div>
);

const ComparisonHeader = ({ title, subtitle }) => (
  <div className="text-center">
    <h2 className="text-xl font-bold text-red-700">{title}</h2>
    <p className="text-sm text-gray-500">{subtitle}</p>
  </div>
);


// --- 2. Page Components (Main UI) ---

// Home Page (Main Landing Page)
export const HomePage = () => (
  <div className="text-center p-12 bg-white rounded-lg shadow-xl border-t-8 border-red-700">
    <h1 className="text-6xl font-extrabold text-red-700 mb-4 tracking-wider">
      COOKWARE MATRIX
    </h1>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
      Discover your perfect match for kitchen gadgets and cookware based on brand, features, and budget.
    </p>
    
    <div className="mt-8">
      <Link 
        to="/products"
        className="inline-block bg-red-700 text-white py-3 px-8 text-lg font-bold rounded-full shadow-lg hover:bg-red-600 transition duration-200 transform hover:scale-105"
      >
        Let's Get Started
      </Link>
    </div>

    <div className="mt-12 flex justify-center space-x-10">
      <ProductDisplay title="Pressure Cooker" color="bg-gray-300" />
      <ProductDisplay title="Rice Cooker" color="bg-gray-300" />
      <ProductDisplay title="Induction Top" color="bg-gray-300" />
    </div>
  </div>
);


// Products Page (Let's Get Started - Selection Page)
export const ProductsPage = () => {
  // 1. State to hold the fetched data
  const [cookwareList, setCookwareList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // The asynchronous function to handle the API call
    const fetchCookware = async () => {
      try {
        // Send GET request to your Express API running on port 5000
        const response = await fetch('http://localhost:5000/api/cookware');
        
        // Handle HTTP errors (e.g., 404 or 500)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCookwareList(data);
      } catch (e) {
        // Handle network errors or other exceptions
        console.error("Failed to fetch cookware:", e);
        setError("Failed to load products. Is the backend server running?");
      } finally {
        setLoading(false);
      }
    };

    fetchCookware();
  }, []); // Empty array means this effect runs only once after the first render

  // 3. Conditional Rendering based on state
  if (loading) return <Loader />;
  if (error) return <div className="text-center p-8 text-red-500 font-semibold">{error}</div>;


  // 4. Render the page with fetched data
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border-t-8 border-red-700">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Discover Your Perfect Match</h1>
      
      <div className="flex space-x-6 mb-8">
        <SelectionBox label="Select Item" options={['All', 'Frying Pan', 'Pressure Cooker']} />
        <SelectionBox label="Select Brand" options={['All', 'Prestige', 'Hawkins', 'Pigeon']} />
        <button className="bg-red-600 text-white px-6 rounded-lg shadow hover:bg-red-700 self-end h-10">
          Filter
        </button>
      </div>

      {/* Product Cards Grid - Populated with fetched data */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {cookwareList.length > 0 ? (
          cookwareList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-5 text-center text-gray-500 p-8">No products found. Did you run the /api/cookware/seed endpoint?</p>
        )}
      </div>
    </div>
  );
};


// Comparison Page (Side-by-Side Matrix)
export const ComparePage = () => {
  // Hardcoded structure for the comparison matrix based on the wireframe
  const attributes = [
    { label: 'Title', value1: 'Prestige Cooker', value2: 'Pigeon Cooker' },
    { label: 'Brand', value1: 'Prestige', value2: 'Pigeon' },
    { label: 'Price (Approx)', value1: '₹1500', value2: '₹1200' },
    { label: 'Material', value1: 'Stainless Steel', value2: 'Aluminium' },
    { label: 'Weight', value1: '2.5kg', value2: '2.2kg' },
    { label: 'Heat Compatibility', value1: 'Gas, Electric', value2: 'Gas, Induction' },
    { label: 'Durability', value1: 'High', value2: 'Medium' },
    { label: 'Special Features', value1: 'Ergonomic Handle', value2: 'Safety Valve' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border-t-8 border-red-700">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Comparison Matrix (Sample Data)</h1>
      
      <div className="flex justify-around items-center mb-8 bg-red-100 p-4 rounded-lg">
        <ComparisonHeader title="Product 1" subtitle="Current Selection" />
        <span className="text-3xl font-bold text-red-700">VS</span>
        <ComparisonHeader title="Product 2" subtitle="Current Selection" />
      </div>

      <div className="w-full">
        {attributes.map((attr, index) => (
          <div key={index} className={`flex ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
            <div className="w-1/3 p-3 font-semibold text-gray-700">{attr.label}</div>
            <div className="w-1/3 p-3 text-red-700 font-medium">{attr.value1}</div>
            <div className="w-1/3 p-3 text-red-700 font-medium">{attr.value2}</div>
          </div>
        ))}
      </div>
      
    </div>
  );
};


// About Page
export const AboutPage = () => (
  <ContentPage title="About Cookware Matrix" color="border-red-700">
    <p className="text-gray-700">
      Welcome to Cookware Matrix, where we believe in fostering a right cookware appreciation and usage. 
      Our mission is to simplify the complex buying process for kitchen enthusiasts and beginners alike. 
      We provide unbiased comparisons on essential attributes like material quality, heat conductivity, and durability.
    </p>
    <h3 className="text-xl font-semibold mt-6 mb-3">Our Core Principles</h3>
    <ul className="list-disc list-inside space-y-2 text-gray-600">
      <li>**Sustainability:** Promoting durable cookware to reduce environmental waste.</li>
      <li>**Transparency:** Providing clear, verifiable data for honest comparison.</li>
      <li>**Usability:** Creating an intuitive interface, even for non-tech-savvy users.</li>
    </ul>
  </ContentPage>
);

// Help Page
export const HelpPage = () => (
  <ContentPage title="Help & User Guide" color="border-red-700">
    <h3 className="text-xl font-semibold mb-3">How to Use the Matrix</h3>
    <ul className="list-disc list-inside space-y-2 text-gray-700">
      <li>**Step 1: Select Products** - Use the "Let's Get Started" page to search and select the two products you want to compare.</li>
      <li>**Step 2: Compare** - Navigate to the "Comparison" page to view the side-by-side matrix of specifications and features.</li>
      <li>**Data Sources:** Our information is sourced manually from product specifications and user reviews, validated by our internal team.</li>
    </ul>
    <h3 className="text-xl font-semibold mt-6 mb-3">Contact Support</h3>
    <p className="text-gray-700">
      If you find any discrepancies in the data or require technical assistance, please email us at: <a href="mailto:support@cookwarematrix.com" className="text-blue-600 hover:underline">support@cookwarematrix.com</a>.
    </p>
  </ContentPage>
);