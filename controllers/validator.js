const { check } = require("express-validator");

let validateUser = () => {
  return [
    check("user.username", "username does not Empty").not().isEmpty(),
    check("user.username", "username must be Alphanumeric").isAlphanumeric(),
    check("user.username", "username more than 6 degits").isLength({ min: 6 }),
  ];
};

let validate = {
  validateUser: validateUser,
};

module.exports = { validate };
