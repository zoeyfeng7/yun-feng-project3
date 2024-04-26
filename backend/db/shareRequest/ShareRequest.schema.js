const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShareRequestSchema = new Schema(
  {
    managerId: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    sharedWithId: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { collection: "shareRequestsSpr2023", timestamps: true }
);
