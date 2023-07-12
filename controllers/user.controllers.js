const { sendResponse, AppError } = require("../helpers/utils.js");
const User = require("../models/User.js");
const Task = require("../models/Task.js");
const userController = {};

//create a user
//validation added
userController.createUser = async (req, res, next) => {
  //validate inputs
  const { name, role } = req.body;

  try {
    //prepare the info
    const info = {
      name: name,
      role: role ? role : "employee",
    };

    //check the info
    if (!info) throw new AppError(400, "Bad Request", "new user NOT created");

    //execute the query
    const createdUser = await User.create(info);

    //send the response
    sendResponse(
      res,
      200,
      true,
      { data: createdUser },
      null,
      "new user created successfully"
    );
  } catch (err) {
    //send the error if any
    next(err);
  }
};

//get all users
//validation added
userController.getAllUsers = async (req, res, next) => {
  let { search, page, limit } = req.query;

  search = new RegExp(search);
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

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
    sendResponse(
      res,
      200,
      true,
      { data: listOfFound, total: totalPages },
      null,
      "users retrieved successfully"
    );
  } catch (err) {
    //send the error if any
    next(err);
  }
};

//get a user by id
//validation added
userController.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    //execute the query
    const listOfFound = await User.findById(id);

    //send the response
    sendResponse(
      res,
      200,
      true,
      { data: listOfFound },
      null,
      "user profile retrieved successfully"
    );
  } catch (err) {
    //send the error if any
    next(err);
  }
};

//get all tasks of a user
//validated added
userController.getTasksByUserId = async (req, res, next) => {
  //validate input no need here
  const { id } = req.params;
  const filter = { assignee: id };

  try {
    //execute the query
    const listOfFound = await Task.find(filter);

    //send the response
    sendResponse(
      res,
      200,
      true,
      { data: listOfFound },
      null,
      "user tasks retrieved successfully"
    );
  } catch (err) {
    //send the error if any
    next(err);
  }
};

//update a user
//validation added
userController.updateUserById = async (req, res, next) => {
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
    sendResponse(
      res,
      200,
      true,
      { data: updatedUser },
      null,
      "user updated successfully"
    );
  } catch (err) {
    //send the error if any
    next(err);
  }
};

//delete a user
//validation added
userController.deleteUserById = async (req, res, next) => {
  //validate input no need here
  const { id } = req.params;

  try {
    //options allow you to modify query. e.g new true return lastest update of data
    const options = { new: true };

    //execute the query
    const deletedUser = await User.findByIdAndDelete(id, options);

    //send the response
    sendResponse(
      res,
      200,
      true,
      { data: deletedUser },
      null,
      "user deleted successfully"
    );
  } catch (err) {
    //send the error if any
    next(err);
  }
};

//export
module.exports = userController;
