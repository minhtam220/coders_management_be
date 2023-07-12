const { sendResponse, AppError } = require("../helpers/utils.js");
const Task = require("../models/Task.js");
const User = require("../models/User.js");
const taskController = {};

//create a task
//validation added
taskController.createTask = async (req, res, next) => {
  const { name, description } = req.body;

  try {
    //prepare the info
    const info = {
      name: name,
      description: description,
      status: "pending",
      assignee: null,
      isDeleted: false,
    };

    //check the info
    if (!info)
      throw new AppError(400, "Bad Request", "ERROR. new task NOT created");

    //execute the query
    const createdTask = await Task.create(info);

    //send the response
    sendResponse(
      res,
      200,
      true,
      { data: createdTask },
      null,
      "new task created successfully"
    );
  } catch (err) {
    //send the error if any
    next(err);
  }
};

//get all tasks
//validation added
taskController.getAllTasks = async (req, res, next) => {
  let { search, page, limit } = req.query;

  search = new RegExp(search);
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

  // calculate the number of documents to skip based on the page and limit
  const skipCount = (page - 1) * limit;

  try {
    let filter = { isDeleted: false };

    // add search to filter

    if (search) {
      filter = {
        $or: [{ isDeleted: false, name: { $regex: search, $options: "i" } }],
      };
    }

    //execute the query
    const totalCount = await Task.find(filter).countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const listOfFound = await Task.find(filter).skip(skipCount).limit(limit);

    //send the response
    sendResponse(
      res,
      200,
      true,
      { data: listOfFound, totalRecords: totalCount, totalPages: totalPages },
      null,
      "tasks retrieved successfully"
    );
  } catch (err) {
    //send the error if any
    next(err);
  }
};

//get a task by id
//validation added
taskController.getTaskById = async (req, res, next) => {
  //validate input no need here
  const { id } = req.params;

  try {
    //execute the query
    const listOfFound = await Task.findById(id).populate("assignee");

    //send the response
    sendResponse(
      res,
      200,
      true,
      { data: listOfFound },
      null,
      "single task retrieved successfully"
    );
  } catch (err) {
    //send the error if any
    next(err);
  }
};

//update task
//validation
taskController.updateTask = async (req, res, next) => {
  //validate inputs
  const allowedFilter = ["assignee", "status"];
  const { id } = req.params;
  const { assignee, status } = req.body;

  //validate the task id
  const foundTask = await Task.findById(id);
  if (!foundTask) {
    const exception = new Error(`invalid task id`);
    exception.statusCode = 401;
    throw exception;
  }

  //validate the task status
  if (
    foundTask.status === "done" &&
    ["pending", "working", "review"].includes(status)
  ) {
    return res.status(400).json({
      error:
        "when the status is set to done, it can't be changed to other value except archived.",
    });
  }

  try {
    foundTask.assignee = assignee;
    foundTask.status = status;

    //execute the query
    const updatedTask = await foundTask.save();

    //send the response
    sendResponse(
      res,
      200,
      true,
      { data: updatedTask },
      null,
      "task updated successfully"
    );
  } catch (err) {
    //send the error if any
    next(err);
  }
};

//delete a task
//validation added
taskController.deleteTaskById = async (req, res, next) => {
  //validate input no need here
  const { id } = req.params;

  try {
    const info = {
      isDeleted: true,
    };
    //options allow you to modify query. e.g new true return lastest update of data
    const options = { new: true };

    //execute the query
    const deletedTask = await Task.findByIdAndUpdate(id, info, options);

    //send the response
    sendResponse(
      res,
      200,
      true,
      { data: deletedTask },
      null,
      "task deleted successfully"
    );
  } catch (err) {
    //send the error if any
    next(err);
  }
};

//export
module.exports = taskController;
