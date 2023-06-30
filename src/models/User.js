import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", user);

export default User;
