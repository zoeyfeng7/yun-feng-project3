const mongoose = require("mongoose");

const ManagerSchema = require("./manager.schema").ManagerSchema;

const ManagerModel = mongoose.model("ManagerModel", ManagerSchema);

function createManager(manager) {
  return ManagerModel.create(manager);
}

function returnAllManager() {
  return ManagerModel.find().exec();
}

function getManagerById(id) {
  return ManagerModel.findById(id).exec();
}

function findManagerByAccountName(websiteAccountName) {
  return ManagerModel.find({ accountName: websiteAccountName }).exec();
}

function deleteManager(managerId) {
  return ManagerModel.deleteOne({ _id: managerId }).exec();
}

function findManagerByUsername(username) {
  return ManagerModel.find({ username: username }).exec();
}

module.exports = {
  createManager,
  returnAllManager,
  getManagerById,
  findManagerByAccountName,
  deleteManager,
  findManagerByUsername,
};
