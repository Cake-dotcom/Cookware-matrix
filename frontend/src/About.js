import React from "react";
import { Link } from "react-router-dom";
import logo from "./Assets/logo.png";

export default function About() {
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

        {/* Our Story Section */}
        <section className="mb-12">
          <h2 className="text-white text-3xl font-bold mb-6">Our Story</h2>
          <div className="text-[#5C2832] text-lg text-base leading-relaxed space-y-4">
            <p>
              Welcome to Cookware Matrix, where we believe that the right cookware can transform any meal. 
              We started this site because we were tired of the guesswork involved in buying kitchen products. 
              Endless reviews, conflicting information, and confusing jargon made it nearly impossible to know 
              if you were truly getting the best value for your money.
            </p>
            <p>
              We created Cookware Matrix to change that. Our mission is to provide a single, trustworthy 
              source for unbiased, clear, and comprehensive comparisons of cookware products. We do the 
              research so you don't have to.
            </p>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="mb-12">
          <h2 className="text-white text-3xl font-bold mb-6">How We Work</h2>
          <div className="text-[#5C2832] text-lg text-base leading-relaxed space-y-4">
            <p>Our process is built on transparency and a passion for great kitchen tools.</p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                <strong>In-Depth Research:</strong> We meticulously research and analyze cookware brands, materials, and 
                specific products. We look at everything from durability and heat conductivity to non-stick 
                properties and user feedback.
              </li>
              <li>
                <strong>The "Matrix" System:</strong> We break down our findings into an easy-to-read "matrix." This unique 
                system allows you to directly compare products side-by-side on key factors like price, 
                material, and performance, helping you see the pros and cons at a glance.
              </li>
              <li>
                <strong>Unbiased Insights:</strong> We are not affiliated with any cookware brands. Our reviews and 
                comparisons are based on objective data and a commitment to helping you make the best 
                choice for your unique needs.
              </li>
            </ol>
          </div>
        </section>

        {/* Our Promise Section */}
        <section className="mb-12">
          <h2 className="text-white text-3xl font-bold mb-6">Our Promise</h2>
          <div className="text-[#5C2832] text-lg text-base leading-relaxed space-y-4">
            <p>
              Whether you're looking for your first set of pans or a specific skillet to perfect a recipe, Cookware 
              Matrix is here to guide you. We promise to keep our information current, our comparisons honest, 
              and our recommendations focused on helping you cook smarter and with more confidence. 
              Thank you for trusting us to be your kitchen resource.
            </p>
            <p>
              Ready to find your perfect match? Go back to the homepage and start exploring!
            </p>
          </div>
        </section>

        {/* Our Team Section */}
        <section>
          <div className="bg-[#8B3545] rounded-3xl p-12">
            <h2 className="text-white text-3xl font-bold mb-10">Our Team</h2>
            <div className="grid grid-cols-3 gap-12 text-center text-white">
              {/* Member 1 */}
              <div>
                <p className="text-lg font-medium">member1</p>
                <p className="text-sm">rollnumber</p>
                <p className="text-sm">course</p>
              </div>
              
              {/* Member 2 */}
              <div>
                <p className="text-lg font-medium">member2</p>
                <p className="text-sm">rollnumber</p>
                <p className="text-sm">course</p>
              </div>
              
              {/* Member 3 */}
              <div>
                <p className="text-lg font-medium">member3</p>
                <p className="text-sm">rollnumber</p>
                <p className="text-sm">course</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}