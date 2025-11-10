import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faLeaf } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Redux/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Please enter both username and password");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.msg);
        localStorage.setItem("token", data.access_token);
        localStorage.removeItem("session_id");
        setIsLoggedIn(true); 
        navigate("/");
      } else {
        setMessage(data.msg || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred during login.");
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
            <p className="text-green-100">Sign in to your account</p>
          </div>
        </div>
        
        <div className="p-8">
          <div className="mb-6">
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-500">
                Forgot password?
              </Link>
            </div>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {message && (
            <div className={`mb-4 p-3 rounded-md ${message.includes("failed") || message.includes("error") 
              ? "bg-red-50 text-red-700" 
              : "bg-green-50 text-green-700"}`}>
              {message}
            </div>
          )}
          
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;