import React, { useState, useEffect } from "react";

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
  const [passwordSettings, setPasswordSettings] = useState({
    alphabet: false,
    numerals: false,
    symbols: false,
    length: 12, // Default length
  });
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [shareUsername, setShareUsername] = useState(""); // Username to share with
  const [shareRequests, setShareRequests] = useState([]);

  useEffect(() => {
    getAllManagers();
  }, []);

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password).then(
      () => {
        alert("Password copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  async function getAllManagers() {
    try {
      const response = await axios.get("/api/manager/");
      setManagers(response.data);
      setFilteredManagers(response.data); // Ensure all passwords are fetched
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  }

  const handleSearch = () => {
    if (searchTerm) {
      const filtered = managers.filter((manager) =>
        manager.website.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredManagers(filtered);
    } else {
      setFilteredManagers(managers);
    }
  };

  const handleCheckboxChange = (field) => {
    setPasswordSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const setLength = (event) => {
    setPasswordSettings({
      ...passwordSettings,
      length: event.target.value,
    });
  };

  const generatePassword = () => {
    let characters = "";
    if (passwordSettings.alphabet)
      characters += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (passwordSettings.numerals) characters += "0123456789";
    if (passwordSettings.symbols) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let password = "";
    const characterArray = characters.split("");
    const characterLength = characterArray.length;

    for (let i = 0; i < passwordSettings.length; i++) {
      const randomIndex = getRandomIndex(characterLength);
      password += characterArray[randomIndex];
    }
    return password;
  };

  const getRandomIndex = (length) => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % length;
  };

  const createOrUpdateManager = async () => {
    const { website, accountName } = managerInput;
    if (!website || !accountName) {
      setError("Website and Account Name are required.");
      return;
    }

    let { websitePassword } = managerInput;
    if (!websitePassword) {
      if (
        !passwordSettings.alphabet &&
        !passwordSettings.numerals &&
        !passwordSettings.symbols
      ) {
        setError("At least one password criterion must be selected.");
        return;
      }
      websitePassword = generatePassword();
    }

    try {
      const response = await axios.post("/api/manager/", {
        ...managerInput,
        websitePassword,
      });
      setManagerInput({
        website: "",
        accountName: "",
        websitePassword: "",
      });
      setPasswordSettings({
        alphabet: false,
        numerals: false,
        symbols: false,
        length: 12,
      });
      setError("");
      await getAllManagers();
    } catch (error) {
      console.error("Error creating/updating manager:", error);
      setError("Failed to create/update manager.");
    }
  };

  const handleShareUsernameChange = (e) => {
    setShareUsername(e.target.value);
  };

  const submitShareRequest = async () => {
    try {
      const response = await axios.post("/api/shareRequest/", {
        sharedWithUsername: shareUsername,
      });
      if (
        response.data.sent.length === 0 &&
        response.data.received.length === 0
      ) {
        console.log("No share requests");
      }
    } catch (error) {
      console.error("Failed to send share request:", error);
    }
  };

  const fetchShareRequests = async () => {
    try {
      const response = await axios.get("/api/shareRequest/");
      setShareRequests(response.data.received);
    } catch (error) {
      console.error("Error fetching share requests:", error);
    }
  };

  const handleShareResponse = async (requestId, accept) => {
    try {
      const response = await axios.post("/api/shareRequest/response", {
        requestId,
        accept,
      });
      alert("Response recorded: " + response.data.message);
      fetchShareRequests(); // Refresh the share requests
    } catch (error) {
      console.error("Error responding to share request:", error);
    }
  };

  const components = filteredManagers.map((manager) => (
    <div key={manager._id} className="manager-item">
      <div className="manager-info">
        <Link to={"/manager/" + manager._id} className="manager-link">
          {manager.website}
        </Link>
        {" - "}
        {manager.accountName}
        {" - "}
        {visiblePasswords[manager._id] ? manager.websitePassword : "••••••"}
      </div>
      <button
        className="manager-button"
        onClick={() => togglePasswordVisibility(manager._id)}
      >
        {visiblePasswords[manager._id] ? "Hide" : "Show"} Password
      </button>
      <button
        className="manager-button"
        onClick={() => copyToClipboard(manager.websitePassword)}
      >
        Copy Password
      </button>
      <button
        onClick={() => deleteManager(manager._id)}
        className="manager-button"
      >
        Delete Password
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
          placeholder="Example: Google.com"
        ></input>
        UserName:{" "}
        <input
          className="input-field"
          value={managerInput.accountName}
          onInput={setManagerAccountName}
          type="text"
          placeholder="Example: yunfeng"
        ></input>
        Password:{" "}
        <input
          className="input-field"
          value={managerInput.websitePassword}
          onInput={setManagerWebsitePassword}
          type="text"
          placeholder="Example: yunfeng12345678"
        ></input>
        <div>
          <input
            type="checkbox"
            checked={passwordSettings.alphabet}
            onChange={() => handleCheckboxChange("alphabet")}
          />{" "}
          Alphabet
          <input
            type="checkbox"
            checked={passwordSettings.numerals}
            onChange={() => handleCheckboxChange("numerals")}
          />{" "}
          Numerals
          <input
            type="checkbox"
            checked={passwordSettings.symbols}
            onChange={() => handleCheckboxChange("symbols")}
          />{" "}
          Symbols Length:{" "}
          <input
            type="number"
            value={passwordSettings.length}
            onChange={setLength}
            min="4"
            max="50"
          />
        </div>
        <button className="button" onClick={createOrUpdateManager}>
          Adding New Password
        </button>
      </div>
      <div className="manager-container">{components}</div>
      <div className="form-container">
        <input
          className="input-field"
          placeholder="Example: Amazon.com"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button className="button" onClick={handleSearch}>
          Search By Website
        </button>
      </div>
      <div className="center-container">
        <button className="button" onClick={getAllManagers}>
          Click Here To Fetch All Passwords Again
        </button>
      </div>
      <div className="form-container">
        <input
          className="input-field"
          type="text"
          value={shareUsername}
          onChange={handleShareUsernameChange}
          placeholder="Enter username to share with"
        />
        <button className="button">Submit Share Request</button>
        <div>
          {shareRequests.map((request) => (
            <div key={request._id}>
              <p>
                {request.requesterUsername} wants to share passwords with you.
              </p>
              <button onClick={() => handleShareResponse(request._id, true)}>
                Accept
              </button>
              <button onClick={() => handleShareResponse(request._id, false)}>
                Reject
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
