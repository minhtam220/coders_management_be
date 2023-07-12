//import the mongoose
const mongoose = require("mongoose");

//define the schema
const taskSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "working", "review", "done", "archived"],
      required: true,
    },
    assignee: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

//create the model
const Task = mongoose.model("Task", taskSchema);

//export the model
module.exports = Task;
