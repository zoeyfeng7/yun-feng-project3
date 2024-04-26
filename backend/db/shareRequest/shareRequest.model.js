const mongoose = require("mongoose");
const ShareRequestSchema = require("./ShareRequestSchema").ShareRequestSchema;

const ShareRequestModel = mongoose.model(
  "ShareRequestModel",
  ShareRequestSchema
);

function createShareRequest(shareRequest) {
  return ShareRequestModel.create(shareRequest);
}

function getShareRequestById(id) {
  return ShareRequestModel.findById(id).exec();
}

function findShareRequestsByOwnerId(ownerId) {
  return ShareRequestModel.find({ ownerId: ownerId }).exec();
}

function findShareRequestsBySharedWithId(sharedWithId) {
  return ShareRequestModel.find({ sharedWithId: sharedWithId }).exec();
}

function updateShareRequestStatus(requestId, status) {
  return ShareRequestModel.findByIdAndUpdate(
    requestId,
    { status: status },
    { new: true }
  ).exec();
}

function deleteShareRequest(requestId) {
  return ShareRequestModel.deleteOne({ _id: requestId }).exec();
}

module.exports = {
  createShareRequest,
  getShareRequestById,
  findShareRequestsByOwnerId,
  findShareRequestsBySharedWithId,
  updateShareRequestStatus,
  deleteShareRequest,
};
