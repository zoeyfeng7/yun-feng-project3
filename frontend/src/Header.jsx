import axios from "axios";
import React, { useEffect, useState } from "react";

import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [activeUsername, setActiveUsername] = useState(null);
  const navigate = useNavigate();

  async function checkIfUserIsLoggedIn() {
    const response = await axios.get("/api/users/isLoggedIn");

    setActiveUsername(response.data.username);
  }

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  async function logOutUser() {
    await axios.post("/api/users/logOut");
    setActiveUsername(null);
    navigate("/");
  }

  if (!activeUsername) {
    return (
      <div className="header">
        <Link to="/">Click here to Home Page</Link>
      </div>
    );
  }

  return (
    <div className="header">
      <div className="header-info">Welcome, {activeUsername}</div>
      <button onClick={logOutUser}>Log Out</button>
    </div>
  );
}
