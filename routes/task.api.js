const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTaskById,
} = require("../controllers/task.controllers.js");

const { param, body, query, validationResult } = require("express-validator");

//Create
/**
 * @route POST api/tasks
 * @description create a new task
 * @access public
 */
router.post(
  "/",
  [
    // Add validation rules using Express Validator
    body("name").notEmpty().withMessage("name is required"),
    body("description").notEmpty().withMessage("description is required"),
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, call the "createUser" function
    createTask(req, res);
  }
);

//Read
/**
 * @route GET api/tasks
 * @description get list of tasks
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
    getAllTasks(req, res);
  }
);

//Read
/**
 * @route GET api/tasks/:id
 * @description get list of tasks
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
    getTaskById(req, res);
  }
);

// Update
/**
 * @route PUT /api/tasks/:id
 * @description assign (when userId available) or unassign a task (when userId empty)
 * and update a task status
 * @access public
 */
router.put(
  "/:id",
  [
    // Add validation rules using Express Validator
    param("id").isMongoId().withMessage("id is invalid"),
    body("assignee")
      .optional()
      .isMongoId()
      .withMessage("assignee id is invalid"),
    body("status")
      .optional()
      .isIn(["pending", "working", "review", "done", "archived"])
      .withMessage("status is invalid."),
  ],

  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, call the "updateTask" function
    updateTask(req, res);
  }
);

// Delete
/**
 * @route DELETE /api/tasks/:id
 * @description soft delete a task
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
    // If validation passes, call the "deleteTaskById" function
    deleteTaskById(req, res);
  }
);

//export
module.exports = router;
