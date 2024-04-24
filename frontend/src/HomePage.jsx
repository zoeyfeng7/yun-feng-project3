import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to Our Management System</h1>
      <div className="navigation-links">
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-link">
          Register
        </Link>
        <Link to="/" className="nav-link">
          Manage Managers
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
