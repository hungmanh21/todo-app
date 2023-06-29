import mongoose from "mongoose";

const todo = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
});

const ToDo = mongoose.model("ToDo", todo);

export default ToDo;
