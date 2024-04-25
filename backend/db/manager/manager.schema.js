const Schema = require("mongoose").Schema;

exports.ManagerSchema = new Schema(
  {
    website: String,
    websitePassword: String,
    accountName: {
      type: String,
      default: "green",
      require: false,
    },
    username: {
      type: String,
      require: true,
    },
  },
  { collection: "myManagerSpr2023" }
);
