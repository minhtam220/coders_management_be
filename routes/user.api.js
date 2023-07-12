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

const { param, body, query, validationResult } = require("express-validator");

//Create
/**
 * @route POST api/user
 * @description create a new user
 * @access public
 */

router.post(
  "/",
  [
    // Add validation rules using Express Validator
    body("name").notEmpty().withMessage("name is required"),
    body("role")
      .optional()
      .isIn(["employee", "manager"])
      .withMessage("role must be employee or manager"),
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, call the "createUser" function
    createUser(req, res);
  }
);

//Read
/**
 * @route GET api/user
 * @description get a list of all users
 * @access public
 */
router.get(
  "/",
  [
    query().custom((value, { req }) => {
      const allowedParams = ["search", "page", "limit"];
      const invalidParams = Object.keys(req.query).filter(
        (param) => !allowedParams.includes(param)
      );
      if (invalidParams.length > 0) {
        throw new Error(
          `Invalid query parameter(s): ${invalidParams.join(", ")}`
        );
      }
      return true;
    }),
    query("page").optional().isNumeric().withMessage("page must be numeric"),
    query("limit").optional().isNumeric().withMessage("Limit must be numeric"),
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, call the "getAllUsers" function
    getAllUsers(req, res);
  }
);

//Read
/**
 * @route GET api/user
 * @description get a user by id
 * @access public
 */
router.get(
  "/:id",
  [
    // Add validation rules using Express Validator
    param("id").isMongoId().withMessage("id is invalid"),
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, call the "getUserById" function
    getUserById(req, res);
  }
);

//Read
/**
 * @route GET api/user
 * @description get all tasks by user id
 * @access public
 */
router.get(
  "/:id/tasks",
  [
    // Add validation rules using Express Validator
    param("id").isMongoId().withMessage("id is invalid"),
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, call the "getTasksByUserId" function
    getTasksByUserId(req, res);
  }
);

//Update
/**
 * @route PUT api/user
 * @description update a user
 * @access public
 */
router.put(
  "/:id",
  [
    // Add validation rules using Express Validator
    param("id").isMongoId().withMessage("id is invalid"),
    body("name").optional().notEmpty().withMessage("name can't be empty"),
    body("role")
      .optional()
      .isIn(["employee", "manager"])
      .withMessage("role must be employee or manager"),
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, call the "updateUserById" function
    updateUserById(req, res);
  }
);

//Delete
/**
 * @route DELETE api/user
 * @description delet a user
 * @access public
 */
router.delete(
  "/:id",
  [
    // Add validation rules using Express Validator
    param("id").isMongoId().withMessage("id is invalid"),
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, call the "deleteUserById" function
    deleteUserById(req, res);
  }
);

//export
module.exports = router;
