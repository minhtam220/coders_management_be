const { sendResponse, AppError } = require("../helpers/utils.js");
const User = require("../models/User.js");
const Task = require("../models/Task.js");
const userController = {};

//create a user
//validation added
userController.createUser = async (req, res, next) => {
  //get inputs
  const { name, role } = req.body;

  try {
    //check for existing user
    const user = await User.findOne({ name });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Name already taken" });

    //prepare the info
    const info = {
      name: name,
      role: role ? role : "employee",
    };

    //execute the query
    const newUser = await User.create(info);

    //send the response
    return res.json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    //send the error if any
    //console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

//get all users
//validation added
userController.getAllUsers = async (req, res, next) => {
  //get inputs
  let { search, page, limit } = req.query;

  search = new RegExp(search);
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  // calculate the number of documents to skip based on the page and limit
  const skipCount = (page - 1) * limit;

  try {
    let filter = {};

    // add search to filter
    if (search) {
      filter = {
        $or: [{ name: { $regex: search, $options: "i" } }],
      };
    }

    //execute the query
    const totalCount = await User.find(filter).countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const listOfFound = await User.find(filter).skip(skipCount).limit(limit);

    //send the response
    return res.json({
      success: true,
      message: "User list retrieved successfully",
      data: listOfFound,
      totalCount: totalCount,
    });
  } catch (err) {
    //send the error if any
    //console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

//get a user by id
//validation added
userController.getUserById = async (req, res, next) => {
  //get inputs
  const { id } = req.params;

  try {
    //execute the query
    const listOfFound = await User.findById(id);

    //send the response
    return res.json({
      success: true,
      message: "User retrieved successfully",
      data: listOfFound,
    });
  } catch (err) {
    //send the error if any
    //console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

//get all tasks of a user
//validated added
userController.getTasksByUserId = async (req, res, next) => {
  //get inputs
  const { id } = req.params;
  const filter = { assignee: id };

  try {
    //execute the query
    const listOfFound = await Task.find(filter);

    //send the response
    return res.json({
      success: true,
      message: "User's tasks retrieved successfully",
      data: listOfFound,
    });
  } catch (err) {
    //send the error if any
    //console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

//update a user
//validation added
userController.updateUserById = async (req, res, next) => {
  //get inputs
  const { id } = req.params;
  const { name, role } = req.body;

  try {
    //find the user
    const foundUser = await User.findById(id);

    //prepare the info
    const info = {
      name: name ? name : foundUser.name,
      role: role ? role : foundUser.role,
    };

    //options allow you to modify query. e.g new true return lastest update of data
    const options = { new: true };

    //update the user
    updatedUser = await User.findByIdAndUpdate(id, info, options);

    //send the response
    return res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    //send the error if any
    //console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

//delete a user
//validation added
userController.deleteUserById = async (req, res, next) => {
  //get inputs
  const { id } = req.params;

  try {
    //options allow you to modify query. e.g new true return lastest update of data
    const options = { new: true };

    //execute the query
    const deletedUser = await User.findByIdAndDelete(id, options);

    //send the response
    return res.json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    //send the error if any
    //console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

//export
module.exports = userController;
