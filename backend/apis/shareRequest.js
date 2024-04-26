const express = require("express");
const router = express.Router();
const {
  createShareRequest,
  getShareRequestById,
  findShareRequestsByOwnerId,
  findShareRequestsBySharedWithId,
  updateShareRequestStatus,
} = require("../db/shareRequest/shareRequest.model");
const UserModel = require("../db/user/user.model");
const jwt = require("jsonwebtoken");

router.post("/", async function (request, response) {
  const { sharedWithUsername } = request.body;
  console.log("Shared with username:", sharedWithUsername);
  const token = request.cookies.username; // 从 cookie 中获取 token

  let requesterUsername;

  try {
    const decoded = jwt.verify(token, "HUNTERS_PASSWORD");
    requesterUsername = decoded.username;

    if (!requesterUsername) {
      return response.status(400).send("Username is required.");
    }

    const requesterUser = await UserModel.findOne({
      username: requesterUsername,
    });
    if (!requesterUser) {
      return response.status(404).send("Requester user does not exist.");
    }

    if (!sharedWithUsername) {
      return response.status(400).send("Shared with username is required.");
    }

    const sharedWithUser = await UserModel.findOne({
      username: sharedWithUsername,
    });
    if (!sharedWithUser) {
      return response.status(404).send("User to share with does not exist.");
    }

    if (requesterUser._id.equals(sharedWithUser._id)) {
      return response.status(400).send("Cannot share passwords with yourself.");
    }

    const newShareRequest = {
      ownerId: requesterUser._id,
      sharedWithId: sharedWithUser._id,
      status: "pending",
    };

    const createShareRequestResponse = await createShareRequest(
      newShareRequest
    );
    return response.status(201).send({
      message: "Share request successfully created",
      data: createShareRequestResponse,
    });
  } catch (error) {
    console.error("Error creating share request:", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return response.status(401).send("Invalid or expired token");
    }
    return response
      .status(500)
      .send("Server error while creating share request");
  }
});

router.get("/", async function (request, response) {
  const token = request.cookies.username;
  let username;

  try {
    const decoded = jwt.verify(token, "HUNTERS_PASSWORD");
    username = decoded.username;

    const sentRequests = await findShareRequestsByOwnerId(username);
    const receivedRequests = await findShareRequestsBySharedWithId(username);
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
    const decoded = jwt.verify(token, "HUNTERS_PASSWORD");
    username = decoded.username;

    const shareRequest = await getShareRequestById(requestId);
    if (!shareRequest) {
      return response.status(404).send("Share request not found.");
    }
    if (shareRequest.sharedWithId.toString() !== username) {
      return response
        .status(403)
        .send("Unauthorized to respond to this share request.");
    }

    const updatedShareRequest = await updateShareRequestStatus(
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
