import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Redux/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handlePlantAIClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // stop navigation
      toast.warning("Please login to chat with the Plant AI tool");
      
    } else {
      navigate("/chatbot");
    }
  };

  return (
    <nav className="bg-green-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              src="image.png" 
              alt="PureHarvest Logo" 
              className="h-10 w-10 rounded-full"
            />
            <span className="ml-2 text-xl font-semibold text-green-800">CropCare</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex space-x-4">
              <Link to="/" className="text-green-700 hover:bg-green-200 px-3 py-2 rounded-md font-medium transition duration-150">
                Home
              </Link>
              <Link to="/about" className="text-green-700 hover:bg-green-200 px-3 py-2 rounded-md font-medium transition duration-150">
                About Us
              </Link>
              {/* <Link to="/profile" className="text-green-700 hover:bg-green-200 px-3 py-2 rounded-md font-medium transition duration-150">
                Profile
              </Link> */}
              <Link to="/chatbot" 
              onClick={handlePlantAIClick}
              className="text-green-700 hover:bg-green-200 px-3 py-2 rounded-md font-medium transition duration-150">
                Plant AI
              </Link>
              <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition duration-150">
                Login
              </Link>
            </div>
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="inline-flex items-center justify-center p-2 rounded-md text-green-700 hover:text-green-900 hover:bg-green-100 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu, toggle based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-50">
            <Link to="/" className="text-green-700 hover:bg-green-200 block px-3 py-2 rounded-md font-medium">
              Home
            </Link>
            <Link to="/about" className="text-green-700 hover:bg-green-200 block px-3 py-2 rounded-md font-medium">
              About Us
            </Link>
            <Link to="/profile" className="text-green-700 hover:bg-green-200 block px-3 py-2 rounded-md font-medium">
              Profile
            </Link>
            <Link to="/chatbot" className="text-green-700 hover:bg-green-200 block px-3 py-2 rounded-md font-medium">
              Plant AI
            </Link>
            <Link to="/login" className="bg-green-600 text-white block px-3 py-2 rounded-md font-medium hover:bg-green-700">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;