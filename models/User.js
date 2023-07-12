//import the mongoose
const mongoose = require("mongoose");
//import mongoose from "mongoose";

//define the schema
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["employee", "manager"],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

//create the model
const User = mongoose.model("User", userSchema);

//export the model
module.exports = User;
