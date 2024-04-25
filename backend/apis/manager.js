const express = require("express");
const router = express.Router();
const ManagerModel = require("../db/manager/manager.model");
const jwt = require("jsonwebtoken");

const managerDb = [
  {
    website: "pikachu",
    accountName: "yellow",
    websitePassword: "123",
  },
  {
    website: "charizard",
    accountName: "red",
    websitePassword: "123",
  },
  {
    website: "squirtle",
    accountName: "yellow",
    websitePassword: "123",
  },
];

router.get("/findAccountName/:accountName", async function (request, response) {
  const accountName = request.params.accountName;

  const matchingManager = await ManagerModel.findManagerByAccountName(
    accountName
  );
  response.send(matchingManager);
});

router.post("/", async function (request, response) {
  const newManager = request.body;

  const username = request.cookies.username;

  let decryptedUsername;
  try {
    decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
  } catch (e) {
    return response.status(401).send("Invalid request");
  }

  newManager.username = decryptedUsername;

  try {
    const createManagerResponse = await ManagerModel.createManager(newManager);
    console.log(createManagerResponse);
    return response.send(
      "Manager Successfully Created: " + createManagerResponse
    );
  } catch (error) {
    return response.status(500).send(error);
  }
});

router.get("/", function (request, response) {
  const username = request.cookies.username;

  let decryptedUsername;
  try {
    decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
  } catch (e) {
    return response.status(404).send("Invalid request");
  }

  ManagerModel.findManagerByUsername(decryptedUsername)
    .then(function (dbResponse) {
      response.cookie("managerCount", dbResponse.length + 1);
      response.send(dbResponse);
    })
    .catch(function (error) {
      response.status(500).send(error);
    });
});

router.get("/:id", function (request, response) {
  const managerId = request.params.id;

  ManagerModel.getManagerById(managerId)
    .then(function (dbResponse) {
      response.send(dbResponse);
    })
    .catch(function (error) {
      response.status(500).send(error);
    });
});

router.get("/find", function (req, res) {
  const accountName = req.query.accountName;

  if (!accountName) {
    return res.send(managerDb);
  }

  const output = [];

  for (let manager of managerDb) {
    if (manager.accountName === accountName) {
      output.push(manager);
    }
  }

  res.send(output);
});

router.delete("/:managerId", async function (req, response) {
  const managerId = req.params.managerId;

  const deleteResponse = await ManagerModel.deleteManager(managerId);
  return response.send("Successfully delete manager!");
});

module.exports = router;
