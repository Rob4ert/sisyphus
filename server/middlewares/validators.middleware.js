const { check, validationResult } = require('express-validator');

const signInConfig = [
  check("name")
    .notEmpty()
    .withMessage("name cannot be empty.")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("invalid email address.")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8, max: 15 })
    .withMessage("your password should have min and max length between 8-15.")
    .matches(/\d/)
    .withMessage("your password should have at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one special character."),

  check("repeatPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords does not match.");
    }
    return true;
  }),
];

const signInValidator = function (req, res, next) {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();
  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    next();
  }
};

const logInConfig = [
  check("email")
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),

  check("password")
    .notEmpty()
    .withMessage("Password cannot be empty.")
    .trim(),

];

const logInValidator = function (req, res, next) {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();
  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    next();
  }
};

module.exports = {
  signInConfig, signInValidator, logInConfig, logInValidator
};
