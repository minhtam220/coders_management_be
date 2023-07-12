const { sendResponse, AppError } = require("../helpers/utils.js");
const User = require("../models/User.js");
const Task = require("../models/Task.js");
const userController = {};

//create a user
//validation added
userController.createUser = async (req, res, next) => {
  //validate inputs
  const { name, role } = req.body;
  // check if 'name' is provided and is a non-empty string
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "Name is required and must be a non-empty string" });
  }

  // if 'role' is provided, check if it is a valid role value
  if (role && !["employee", "manager"].includes(role)) {
    return res.status(400).json({ error: "Invalid role value" });
  }

  try {
    //prepare the info
    const info = {
      name: name,
      role: role ? role : "employee",
    };

    //check the info
    if (!info) throw new AppError(402, "Bad Request", "new user NOT created");

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
  //validate inputs
  const allowedFilter = ["search", "page", "limit"];
  let { search, page, limit, ...filterQuery } = req.query;

  //allow title,limit and page query string only
  const filterKeys = Object.keys(filterQuery);

  filterKeys.forEach((key) => {
    if (!allowedFilter.includes(key)) {
      const exception = new Error(`Query ${key} is not allowed`);
      exception.statusCode = 401;
      throw exception;
    }
  });

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
  //validate input no need here
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
  //validate inputs
  const allowedFilter = ["name"];
  const { id } = req.params;
  const { name } = req.body;

  //allow title,limit and page query string only
  const filterKeys = Object.keys(filterQuery);

  filterKeys.forEach((key) => {
    if (!allowedFilter.includes(key)) {
      const exception = new Error(`Update ${key} is not allowed`);
      exception.statusCode = 401;
      throw exception;
    }
  });

  // check if 'name' is provided and is a non-empty string
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "Name is required and must be a non-empty string" });
  }

  try {
    //prepare the info
    const info = {
      name: name,
    };

    //options allow you to modify query. e.g new true return lastest update of data
    const options = { new: true };

    //execute the query
    const updatedUser = await User.findByIdAndUpdate(id, info, options);

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
