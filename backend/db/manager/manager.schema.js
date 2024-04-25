const Schema = require("mongoose").Schema;

exports.ManagerSchema = new Schema(
  {
    website: {
      type: String,
      required: [true, "Website URL is required"],
    },
    websitePassword: String,
    accountName: {
      type: String,
      default: "yourname",
      require: false,
    },
    username: {
      type: String,
      require: true,
    },
  },
  { collection: "myManagerSpr2023" }
);
