// src/components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
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
        localStorage.setItem("token", data.access_token); // store the token
        navigate("/")
      } else {
        setMessage(data.msg || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred during login.");
    }
  };

  return (
    <div className="login_container">
      <div className="box login-box">
        <h2>Login</h2>
         

        <div className="input-with-icon">
  <FontAwesomeIcon icon={faUser} className="input-icon" />
  <input type="text" placeholder="Username" 
         value={username}
          onChange={(e) => setUsername(e.target.value)}
          />

</div>

<div className="input-with-icon">
  <FontAwesomeIcon icon={faLock} className="input-icon" />
  <input type="password" placeholder="Password"
  value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
</div>

        
        
        <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>
        {message && <p>{message}</p>}
        <p className="redirect-text">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
