import React from "react";
import { Link } from "react-router-dom";
import UploadImage from "./UploadImage";

function LandingPage() {
  return (
    <>
    <div className="landing-wrapper">
      <header className="container_header">
        <nav className="container_list">
          <ul className="container_list_item">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="container_page">
        <div className="landing-image"></div>

        <div className="landing-text">
          <h1>
            Smart <strong>Farming</strong> is Caring
          </h1>
        </div>
      </div>
    </div>
    <UploadImage/>
    </>
  );
}

export default LandingPage;
