const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = require("./user.schema").UserSchema;

const UserModel = mongoose.model("UserModel", UserSchema);

async function createUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return UserModel.create({ ...user, password: hashedPassword });
}

function findUserByUsername(username) {
  return UserModel.findOne({ username: username }).exec();
}

async function validatePassword(username, password) {
  const user = await UserModel.findOne({ username: username }).exec();
  if (!user) {
    return false; // 用户不存在
  }
  // 使用bcrypt验证密码
  return await bcrypt.compare(password, user.password);
}
module.exports = {
  createUser,
  findUserByUsername,
  validatePassword,
};
