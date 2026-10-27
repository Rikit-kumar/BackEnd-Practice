import { body, validationResult } from "express-validator";

const handleValidationResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid request, validation failed",
      errors: errors.array(),
    });
  }

  next();
};

export const registerValidator = [
  body("name")
    .exists()
    .withMessage("Name is requires")
    .bail()
    .isString()
    .withMessage("Name must be string value")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must contain 3 to 50 characters"),
  body("email")
    .exists()
    .withMessage("Email is requires")
    .bail()
    .isString()
    .withMessage("Email must be string value")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .exists()
    .withMessage("Password is requires")
    .bail()
    .isString()
    .withMessage("Password must be string value")
    .bail()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .bail()
    .isLength({ min: 8, max: 128 })
    .withMessage("Name must contain 8 to 128 characters")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must contain at least one uppercase letter, one number, and one symbol and minimum 8 characters",
    ),
  body("confirmPassword")
    .exists()
    .withMessage("Confirm password is required")
    .bail()
    .isString()
    .withMessage("Confirm password must be string value")
    .bail()
    .notEmpty()
    .withMessage("Confirm password cannot be empty")
    .bail()
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Password do not match");
      }

      return true;
    }),

  handleValidationResult,
];

export const loginValidator = [
  body("email")
    .exists()
    .withMessage("Email is requires")
    .bail()
    .isString()
    .withMessage("Email must be string value")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .exists()
    .withMessage("Password is requires")
    .bail()
    .isString()
    .withMessage("Password must be string value")
    .bail()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .bail()
    .isLength({ min: 8, max: 128 })
    .withMessage("Name must contain 8 to 128 characters"),
  handleValidationResult,
];
