import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./Managers.css";

export default function ManagerDetail() {
  const [managerDetails, setManagerDetails] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  async function fetchAndSetManager() {
    const managerResponse = await axios.get("/api/manager/" + params.managerId);
    console.log("Manager data:", managerResponse.data);
    setManagerDetails(managerResponse.data);
  }

  useEffect(function () {
    fetchAndSetManager();
  }, []);

  async function deleteManager() {
    const response = await axios.delete("/api/manager/" + params.managerId);
    navigate("/passwordManager");
  }

  return (
    <div className="manager-container">
      <div>Website: {managerDetails.website}</div>
      <div>AccountName: {managerDetails.accountName}</div>
      <div>Password: {managerDetails.websitePassword}</div>
      <button className="button" onClick={deleteManager}>
        Delete Me!
      </button>
    </div>
  );
}
