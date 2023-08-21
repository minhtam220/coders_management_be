//import the mongoose
const mongoose = require("mongoose");

//define the schema
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
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
