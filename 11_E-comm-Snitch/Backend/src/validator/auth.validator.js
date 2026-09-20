import { body, validationResult } from "express-validator";

export const registerValidator = [
  (body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name length must be between 3 to 50 characters"),
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email address"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }

    next();
  }),
];
