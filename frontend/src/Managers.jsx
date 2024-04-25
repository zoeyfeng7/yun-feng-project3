import React, { useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./Managers.css";
import "./Header.css";

export default function Managers() {
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState("");
  const [managerInput, setManagerInput] = useState({
    website: "",
    accountName: "",
    websitePassword: "",
  });

  async function getAllManagers() {
    const response = await axios.get("/api/manager/");
    setManagers(response.data);
  }

  const components = managers.map((manager) => (
    <div key={manager._id} className="manager-item">
      <div className="manager-info">
        <Link to={"/manager/" + manager._id} className="manager-link">
          {manager.website}
        </Link>{" "}
        - {manager.accountName} - {manager.websitePassword}
      </div>
      <button
        onClick={() => deleteManager(manager._id)}
        className="manager-button"
      >
        Delete
      </button>
    </div>
  ));

  function setManagerWebsite(event) {
    const managerWebsite = event.target.value;
    setManagerInput({
      ...managerInput,
      website: managerWebsite,
    });
  }

  function setManagerAccountName(event) {
    const managerAccountName = event.target.value;
    setManagerInput({
      ...managerInput,
      accountName: managerAccountName,
    });
  }

  function setManagerWebsitePassword(event) {
    const managerWebsitePassword = event.target.value;
    setManagerInput({
      ...managerInput,
      websitePassword: managerWebsitePassword,
    });
  }

  async function createNewManager() {
    if (!managerInput.website) {
      setError("Please enter a website URL.");
      return;
    }
    try {
      const response = await axios.post("/api/manager/", managerInput);
      setManagerInput({
        website: "",
        accountName: "",
        websitePassword: "",
      });
      setError("");
      await getAllManagers();
    } catch (error) {
      console.error("Error creating new manager:", error);
      setError("Failed to create new manager.");
    }
  }

  async function deleteManager(managerId) {
    try {
      await axios.delete("/api/manager/" + managerId);
      getAllManagers();
    } catch (error) {
      console.error("Error deleting manager:", error);
    }
  }

  return (
    <div>
      <Header />
      <div className="form-container">
        {error && <div className="error-message">{error}</div>}
        Website:{" "}
        <input
          className="input-field"
          value={managerInput.website}
          onInput={setManagerWebsite}
          type="text"
        ></input>
        UserName:{" "}
        <input
          className="input-field"
          value={managerInput.accountName}
          onInput={setManagerAccountName}
          type="text"
        ></input>
        Password:{" "}
        <input
          className="input-field"
          value={managerInput.websitePassword}
          onInput={setManagerWebsitePassword}
          type="text"
        ></input>
        <button className="button" onClick={createNewManager}>
          Submit New Password
        </button>
      </div>
      <div className="manager-container">{components}</div>
      <div className="center-container">
        <button className="button" onClick={getAllManagers}>
          Click here to fetch Passwords
        </button>
      </div>
    </div>
  );
}
