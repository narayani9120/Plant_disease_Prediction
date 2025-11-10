import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faEnvelope, faLeaf } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setMessage("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 201) {
        localStorage.setItem("token", data.access_token);
        setMessage("Signup successful!");
        setTimeout(() => navigate("/login"), 1500); // Navigate after showing success message
      } else {
        setMessage(data.msg || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setMessage("An error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 py-6">
          <div className="text-center">
            <FontAwesomeIcon icon={faLeaf} className="text-white text-4xl mb-2" />
            <h2 className="text-2xl font-bold text-white">Plant Disease Predictor</h2>
            <p className="text-green-100">Create your account</p>
          </div>
        </div>
        
        <div className="p-8">
          <div className="mb-5">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faUser} className="text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                name="username"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                name="password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          
          {message && (
            <div className={`mb-4 p-3 rounded-md ${message.includes("successful") 
              ? "bg-green-50 text-green-700" 
              : "bg-red-50 text-red-700"}`}>
              {message}
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;