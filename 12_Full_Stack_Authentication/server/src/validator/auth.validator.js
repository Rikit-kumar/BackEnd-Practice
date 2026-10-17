import { body, validationResult } from "express-validator";

const handleValidationResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid request, validation failed",
      errors: errors.array()
    });
  }

  next();
};

export const registerValidator = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be String value")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must contain 3 to 50 characters"),
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .isString()
    .withMessage("Email must be String value")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be String value")
    .bail()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .bail()
    .isLength({ min: 6, max:128 })
    .withMessage("Password must contain 8 to 128 characters")
    .bail()
    .isStrongPassword({
      minUppercase: 1,
      minLength: 6,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain at least one uppercase letter, one number, and one symbol and minimum 6 characters",
    ),
  body("confirmPassword")
    .exists()
    .withMessage("Confirm passwrod is required")
    .bail()
    .isString()
    .withMessage("Confirm Password must be String value")
    .bail()
    .notEmpty()
    .withMessage("Confirm Password cannot be empty")
    .bail()
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Password do not match");
      }

      return true;
    }),

  handleValidationResult,
];
