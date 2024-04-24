import React, { useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./Managers.css";
import "./Header.css";

export default function Managers() {
  const [managers, setManagers] = useState([]);
  const [managerInput, setManagerInput] = useState({
    website: "",
    accountName: "",
    websitePassword: "",
  });

  async function getAllManagers() {
    const response = await axios.get("/api/manager/");
    setManagers(response.data);
  }

  const components = [];
  for (let i = 0; i < managers.length; i++) {
    const manager = managers[i];
    const managerComponent = (
      <div>
        <Link to={"/manager/" + manager._id}>{manager.website}</Link>{" "}
        {manager.accountName} - {manager.websitePassword}
      </div>
    );
    components.push(managerComponent);
  }

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
    const response = await axios.post("/api/manager/", managerInput);
    setManagerInput({
      website: "",
      accountName: "",
      websitePassword: "",
    });
    await getAllManagers();
  }

  return (
    <div>
      <Header />
      <div className="form-container">
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
