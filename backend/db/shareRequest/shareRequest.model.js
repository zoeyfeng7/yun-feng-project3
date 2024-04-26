const mongoose = require("mongoose");
const ShareRequestSchema = require("./shareRequest.schema");

const ShareRequestModel = mongoose.model(
  "ShareRequestModel",
  ShareRequestSchema
);

function createShareRequest(shareRequest) {
  return ShareRequestModel.create(shareRequest).catch((err) => {
    console.error("Failed to create share request:", err);
    throw new Error("Error creating share request");
  });
}

function getShareRequestById(id) {
  return ShareRequestModel.findById(id)
    .exec()
    .catch((err) => {
      console.error(`Failed to retrieve share request with id ${id}:`, err);
      throw new Error("Error retrieving share request");
    });
}

function findShareRequestsByOwnerId(ownerId) {
  return ShareRequestModel.find({ ownerId: ownerId })
    .exec()
    .catch((err) => {
      console.error(
        `Failed to find share requests by owner id ${ownerId}:`,
        err
      );
      throw new Error("Error finding share requests by owner");
    });
}

function findShareRequestsBySharedWithId(sharedWithId) {
  return ShareRequestModel.find({ sharedWithId: sharedWithId })
    .exec()
    .catch((err) => {
      console.error(
        `Failed to find share requests shared with id ${sharedWithId}:`,
        err
      );
      throw new Error("Error finding share requests by shared id");
    });
}

function updateShareRequestStatus(requestId, status) {
  return ShareRequestModel.findByIdAndUpdate(
    requestId,
    { status: status },
    { new: true }
  )
    .exec()
    .catch((err) => {
      console.error(
        `Failed to update share request status for id ${requestId}:`,
        err
      );
      throw new Error("Error updating share request status");
    });
}

function deleteShareRequest(requestId) {
  return ShareRequestModel.deleteOne({ _id: requestId })
    .exec()
    .catch((err) => {
      console.error(
        `Failed to delete share request with id ${requestId}:`,
        err
      );
      throw new Error("Error deleting share request");
    });
}

module.exports = {
  createShareRequest,
  getShareRequestById,
  findShareRequestsByOwnerId,
  findShareRequestsBySharedWithId,
  updateShareRequestStatus,
  deleteShareRequest,
};
