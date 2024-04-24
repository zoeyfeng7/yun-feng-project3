import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function HomePage() {
  return (
    <div>
      <Navbar /> {/* Navbar 添加在页面顶部 */}
      <div className="manager-container">
        <h1 className="website-name">Welcome to Password Manager</h1>
        <p className="product-description">
          A secure and reliable way to manage all your passwords in one place.
        </p>
        <p className="creators">Created by Yun Feng</p>
      </div>
    </div>
  );
}

export default HomePage;
