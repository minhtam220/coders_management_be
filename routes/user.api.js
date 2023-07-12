const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  getTasksByUserId,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controllers.js");

//Create
/**
 * @route POST api/user
 * @description create a new user
 * @access public
 */
router.post("/", createUser);

//Read
/**
 * @route GET api/user
 * @description get a list of all users
 * @access public
 */
router.get("/", getAllUsers);

//Read
/**
 * @route GET api/user
 * @description get a user by id
 * @access public
 */
router.get("/:id", getUserById);

//Read
/**
 * @route GET api/user
 * @description get all tasks by user id
 * @access public
 */
router.get("/:id/tasks", getTasksByUserId);

//Update
/**
 * @route PUT api/user
 * @description update a user
 * @access public
 */
router.put("/:id", updateUserById);

//Delete
/**
 * @route DELETE api/user
 * @description delet a user
 * @access public
 */
router.delete("/:id", deleteUserById);

//export
module.exports = router;
