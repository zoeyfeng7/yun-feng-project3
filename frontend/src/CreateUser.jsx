import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";

export default function CreateUser() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function setUsername(event) {
    const username = event.target.value;
    setUsernameInput(username);
  }

  function setPassword(event) {
    const pswd = event.target.value;
    setPasswordInput(pswd);
  }

  async function submit() {
    try {
      const response = await axios.post("/api/users/register", {
        username: usernameInput,
        password: passwordInput,
      });
      navigate("/passwordManager");
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="manager-container">
        <h1>Register New User</h1>
        {!!error && <h3>{error}</h3>}
        <div>
          <span>Username: </span>
          <input
            className="input-field"
            type="text"
            value={usernameInput}
            onInput={setUsername}
          ></input>
        </div>
        <div>
          <span>Password: </span>
          <input
            className="input-field"
            type="text"
            value={passwordInput}
            onInput={setPassword}
          ></input>
        </div>

        <button className="button" onClick={submit}>
          Create Account/Login
        </button>
      </div>
    </div>
  );
}
