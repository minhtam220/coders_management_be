const { sendResponse, AppError } = require("../helpers/utils.js");
const Task = require("../models/Task.js");
const User = require("../models/User.js");
const taskController = {};

//create a task
//validation added
taskController.createTask = async (req, res, next) => {
  //get inputs
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

    //execute the query
    const newTask = await Task.create(info);

    //send the response
    return res.json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (err) {
    //send the error if any
    //console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
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
    //console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
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
    //console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

//assign task
//validation
taskController.assignTask = async (req, res, next) => {
  //get inputs
  const allowedFilter = ["assignee"];
  const { id } = req.params;
  const { assignee } = req.body;

  //validate the task id
  const task = await Task.findById(id);

  if (!task) {
    return res.status(400).json({ success: false, message: "Task not found" });
  }

  try {
    task.assignee = assignee;

    //execute the query
    const assignedTask = await task.save();

    //send the response
    return res.json({
      success: true,
      message: "Task assigned/unassigned successfully",
      data: assignedTask,
    });
  } catch (err) {
    //send the error if any
    //console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

//update status
//validation
taskController.updateTask = async (req, res, next) => {
  //validate inputs
  const allowedFilter = ["status"];
  const { id } = req.params;
  const { status } = req.body;

  //validate the task id
  const task = await Task.findById(id);

  if (!task) {
    return res.status(400).json({ success: false, message: "Task not found" });
  }

  //validate the task status
  if (
    task.status === "done" &&
    ["pending", "working", "review"].includes(status)
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message:
          "when the status is set to done, it can't be changed to other value except archived.",
      });
  }

  try {
    task.status = status;

    //execute the query
    const updatedTask = await task.save();

    //send the response
    return res.json({
      success: true,
      message: "Status updated successfully",
      data: updatedTask,
    });
  } catch (err) {
    //send the error if any
    //console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
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
    //console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

//export
module.exports = taskController;
