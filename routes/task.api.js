const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTaskById,
} = require("../controllers/task.controllers.js");

//Create
/**
 * @route POST api/tasks
 * @description create a task
 * @access public
 */
router.post("/", createTask);

//Read
/**
 * @route GET api/tasks
 * @description get list of tasks
 * @access public
 */
router.get("/", getAllTasks);

//Read
/**
 * @route GET api/tasks/:id
 * @description get list of tasks
 * @access public
 */
router.get("/:id", getTaskById);

// Update
/**
 * @route PUT /api/tasks/:id
 * @description assign (when userId available) or unassign a task (when userId empty)
 * and update a task status
 * @access public
 */
router.put("/:id", updateTask);

// Delete
/**
 * @route DELETE /api/tasks/:id
 * @description soft delete a task
 * @access public
 */
router.delete("/:id", deleteTaskById);

//export
module.exports = router;
