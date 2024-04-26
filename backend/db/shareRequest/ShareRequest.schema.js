const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShareRequestSchema = new Schema(
  {
    managerId: {
      type: Schema.Types.ObjectId,
      ref: "ManagerModel", // Assuming 'ManagerModel' is the name used in your Manager schema
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    sharedWithId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending", // Values are 'pending', 'accepted', 'rejected'
      enum: ["pending", "accepted", "rejected"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "shareRequestsSpr2023" }
);

exports.ShareRequestSchema = ShareRequestSchema;
