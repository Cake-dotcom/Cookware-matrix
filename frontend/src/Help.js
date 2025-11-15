import React from "react";
import { Link } from "react-router-dom";
import logo from "./Assets/logo.png";

export default function Help() {
  return (
    <div className="min-h-screen bg-[#7B2E3A] flex items-center justify-center font-sans p-8">
      {/* Main beige card */}
      <div className="relative w-[90%] max-w-[1200px] bg-[#EAC988] rounded-[50px] shadow-2xl p-16">
        {/* Header with logo and navigation */}
        <div className="flex justify-between items-start mb-8">
          {/* Logo */}
          <img src={logo} alt="Cookware Matrix logo" className="w-16 h-16" />
          
          {/* Navigation */}
          <nav className="flex gap-8 text-white text-base">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/help" className="hover:underline">Help</Link>
          </nav>
        </div>

        {/* Main Heading */}
        <section className="mb-10">
          <h1 className="text-white text-4xl font-bold mb-6">How to Use Cookware Matrix</h1>
          <p className="text-[#5C2832] text-lg text-base leading-relaxed">
            Welcome to the Help page! Our goal is to make your search for the perfect cookware as easy as 
            possible. Follow these simple steps to get the most out of our website.
          </p>
        </section>

        {/* Step 1: Get Started */}
        <section className="mb-10">
          <h2 className="text-white text-2xl font-bold mb-4">Step 1: Get Started</h2>
          <p className="text-[#5C2832] text-lg text-base leading-relaxed">
            From the homepage, simply click the "Let's get started" button. This will take you to our main 
            comparison page, where you'll find a wide range of cookware products and brands ready to be 
            explored.
          </p>
        </section>

        {/* Step 2: Browse & Filter */}
        <section className="mb-10">
          <h2 className="text-white text-2xl font-bold mb-4">Step 2: Browse & Filter</h2>
          <div className="text-[#5C2832] text-lg text-base leading-relaxed space-y-3">
            <p>
              On the main comparison page, you'll see a list of products. To find exactly what you're looking for, 
              use the filter options on the sidebar. You can sort by:
            </p>
            <ul className="list-disc ml-8 space-y-1">
              <li>Product Type: Pans, pots, skillets, woks, and more.</li>
              <li>Material: Stainless steel, cast iron, non-stick, ceramic, etc.</li>
              <li>Brand: Search for specific brands you trust.</li>
              <li>Price Range: Set a budget that works for you.</li>
              <li>Features: Find cookware with specific features like oven-safe handles, glass lids, or induction compatibility.</li>
            </ul>
          </div>
        </section>

        {/* Step 3: Compare Products */}
        <section className="mb-10">
          <h2 className="text-white text-2xl font-bold mb-4">Step 3: Compare Products</h2>
          <p className="text-[#5C2832] text-lg text-base leading-relaxed">
            Found a few products you like? You can add them to a side-by-side comparison. Simply select the 
            products you're interested in, and a "Compare" button will appear. Clicking it will show you a 
            detailed matrix, laying out all the specifications, pros, and cons of each item side-by-side.
          </p>
        </section>

        {/* Step 4: Read the Insights */}
        <section className="mb-10">
          <h2 className="text-white text-2xl font-bold mb-4">Step 4: Read the Insights</h2>
          <div className="text-[#5C2832] text-lg text-base leading-relaxed space-y-3">
            <p>
              For each product, we provide a detailed description and an analysis of its performance. This 
              includes:
            </p>
            <ul className="list-disc ml-8 space-y-1">
              <li>Our Rating: An overall score based on durability, performance, and value.</li>
              <li>Pros & Cons: A quick summary of what makes a product great and where it could improve.</li>
              <li>Key Features: A breakdown of the most important specifications.</li>
            </ul>
            <p>
              We encourage you to read through these insights to make a well-informed decision.
            </p>
          </div>
        </section>

        {/* Step 5: Make Your Choice! */}
        <section className="mb-6">
          <h2 className="text-white text-2xl font-bold mb-4">Step 5: Make Your Choice!</h2>
          <div className="text-[#5C2832] text-lg text-base leading-relaxed space-y-3">
            <p>
              Once you've compared all the options and feel confident in your decision, you're ready to find 
              your next favorite piece of cookware.
            </p>
            <p>
              Return to homepage to begin.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}