import { body, validationResult } from "express-validator";

const handleUrlValidatorResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid request, validation failed",
      errors: errors.array(),
    });
  }

  next();
};

export const urlValidator = [
  body("originalUrl")
    .exists()
    .withMessage("Original URL is required")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Original URL cannot be empty")
    .bail()
    .isLength({ max: 2048 })
    .withMessage("URL cannot exceed 2048 characters")
    .bail()
    .isURL({ protocols: ["http", "https"], require_protocol: true })
    .withMessage("Please provide a valid HTTP or HTTPS URL"),
  handleUrlValidatorResult,
];
