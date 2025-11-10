import React from "react";
import { Link } from "react-router-dom";
import UploadImage from "./UploadImage";
import Chatbot from "./Chatbot";
import Navbar from "./Navbar";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Navbar />
      <ToastContainer />
      
      {/* Hero Section with Quote */}
      <div className="relative h-96 md:h-screen md:max-h-[600px] overflow-hidden">
        {/* Background Image - using placeholder since external images aren't allowed */}
        <div className="absolute inset-0 bg-green-800 bg-opacity-50">
          
        </div>
        
        {/* Quote Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              "Smart Farming is Caring"
            </h1>
            <p className="text-xl md:text-2xl text-green-100 drop-shadow-md">
              Empowering farmers with technology to grow healthier crops
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/upload" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg">
                Analyze Your Plant
              </Link>
              <Link to="/about" className="bg-white hover:bg-green-100 text-green-800 font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* What We Do Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">What We Do</h2>
          <div className="w-20 h-1 bg-green-500 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              At <span className="font-bold text-green-700">CropCare</span>, we empower farmers with
              cutting-edge tools and{" "}
              <span className="bg-green-100 px-2 py-1 rounded text-green-800 font-medium">AI-driven solutions</span> for
              smarter, more sustainable farming. Our mission is to:
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">🌾</span>
                <span>Increase crop yield and productivity through advanced monitoring</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">🛡️</span>
                <span>Detect and prevent crop diseases early with AI-powered image analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">🌍</span>
                <span>Promote eco-friendly agricultural practices for sustainable farming</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">🤖</span>
                <span>Integrate technology with traditional farming methods seamlessly</span>
              </li>
            </ul>
          </div>
          
          <div className="rounded-lg shadow-xl overflow-hidden">
            <img 
              src="land.jpg" 
              alt="Smart farming technology" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-green-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Our Features</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-200 text-green-700 text-2xl">
                  🔍
                </div>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2 text-center">Disease Detection</h3>
              <p className="text-gray-600">
                Upload plant images and get instant disease diagnosis with remedies and treatment options.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-200 text-green-700 text-2xl">
                  💬
                </div>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2 text-center">AI Plant Assistant</h3>
              <p className="text-gray-600">
                Chat with our AI for personalized advice on plant care, disease prevention, and farming techniques.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-200 text-green-700 text-2xl">
                  📊
                </div>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2 text-center">Smart Analytics</h3>
              <p className="text-gray-600">
                Track your farm's health history and get predictive insights to optimize crop management.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      
      
      {/* Footer */}
      <footer className="bg-green-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CropCare</h3>
            <p className="text-green-200">
              Making farming smarter and more sustainable through innovative technology solutions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-green-200 hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="text-green-200 hover:text-white transition">About Us</Link></li>
              <li><Link to="/chatbot" className="text-green-200 hover:text-white transition">Plant AI</Link></li>
              <li><Link to="/login" className="text-green-200 hover:text-white transition">Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-green-200">Email: info@pureharvest.com</p>
            <p className="text-green-200">Phone: (123) 456-7890</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-green-200 hover:text-white transition">
                <span className="sr-only">Facebook</span>
                {/* Facebook icon placeholder */}
                <div className="w-6 h-6 bg-green-700 rounded-full"></div>
              </a>
              <a href="#" className="text-green-200 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                {/* Twitter icon placeholder */}
                <div className="w-6 h-6 bg-green-700 rounded-full"></div>
              </a>
              <a href="#" className="text-green-200 hover:text-white transition">
                <span className="sr-only">Instagram</span>
                {/* Instagram icon placeholder */}
                <div className="w-6 h-6 bg-green-700 rounded-full"></div>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-green-700 text-center text-green-300">
          <p>&copy; {new Date().getFullYear()} CropCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;