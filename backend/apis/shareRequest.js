const express = require("express");
const router = express.Router();
const shareRequestModel = require("../db/shareRequest/shareRequest.model");
const userModel = require("../db/user/user.model");
const jwt = require("jsonwebtoken");

router.post("/", async function (request, response) {
  const { sharedWithUsername } = request.body;
  const token = request.cookies.username;
  let requesterUsername;

  try {
    requesterUsername = jwt.verify(token, "HUNTERS_PASSWORD").username;
  } catch (e) {
    return response.status(401).send("Invalid token");
  }

  if (requesterUsername === sharedWithUsername) {
    return response.status(400).send("Cannot share passwords with yourself.");
  }

  try {
    // Verify if sharedWithUsername exists
    const sharedWithUser = await UserModel.findOne({
      username: sharedWithUsername,
    });
    if (!sharedWithUser) {
      return response.status(404).send("User to share with does not exist.");
    }

    const newShareRequest = {
      ownerId: sharedWithUser._id,
      sharedWithId: requesterUsername,
      status: "pending", // Default status
    };

    const createShareRequestResponse =
      await ShareRequestModel.createShareRequest(newShareRequest);
    return response.status(201).send({
      message: "Share request successfully created",
      data: createShareRequestResponse,
    });
  } catch (error) {
    console.error("Error creating share request:", error);
    return response
      .status(500)
      .send("Server error while creating share request");
  }
});

router.get("/", async function (request, response) {
  const token = request.cookies.username;
  let username;

  try {
    username = jwt.verify(token, "HUNTERS_PASSWORD").username;
  } catch (error) {
    return response.status(401).send("Invalid or expired token");
  }

  try {
    const sentRequests = await ShareRequestModel.findShareRequestsByOwnerId(
      username
    );
    const receivedRequests =
      await ShareRequestModel.findShareRequestsBySharedWithId(username);
    return response
      .status(200)
      .send({ sent: sentRequests, received: receivedRequests });
  } catch (error) {
    console.error("Error fetching share requests:", error);
    return response.status(500).send("Error fetching share requests");
  }
});

router.post("/response", async function (request, response) {
  const { requestId, accept } = request.body;
  const token = request.cookies.username;
  let username;

  try {
    username = jwt.verify(token, "HUNTERS_PASSWORD").username;
  } catch (error) {
    return response.status(401).send("Invalid or expired token");
  }

  try {
    const shareRequest = await ShareRequestModel.getShareRequestById(requestId);
    if (!shareRequest) {
      return response.status(404).send("Share request not found.");
    }
    if (shareRequest.sharedWithId !== username) {
      return response
        .status(403)
        .send("Unauthorized to respond to this share request.");
    }

    const updatedShareRequest =
      await ShareRequestModel.updateShareRequestStatus(
        requestId,
        accept ? "accepted" : "rejected"
      );
    return response
      .status(200)
      .send({ message: `Share request ${updatedShareRequest.status}.` });
  } catch (error) {
    console.error("Error responding to share request:", error);
    return response.status(500).send("Error processing your response");
  }
});

module.exports = router;
