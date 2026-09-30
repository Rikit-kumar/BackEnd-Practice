import { body, validationResult } from "express-validator";

const handleValidationError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation faild",
      errors: errors.array(),
    });
  }

  next();
};

const productValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a String")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title lenght must be between 3 to 100 characters"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .bail()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description length must be between 10 to 500 characters"),
  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array")
    .bail()
    .custom((images) => images.length <= 5)
    .withMessage("A product can have at most 5 images"),
  body("images.*")
    .optional()
    .isString()
    .withMessage("Each image must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Image URL cannot be empty"),
  body("price.amount")
    .exists()
    .withMessage("Price amount is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Price amount must be a number greater than or equal to 0"),
  body("price.currency")
    .exists()
    .withMessage("Price currency is required")
    .bail()
    .isIn(["INR", "USD"])
    .withMessage("currency either be INR or USD"),
  body("sizes")
    .exists()
    .withMessage("Sizes are requires")
    .bail()
    .isArray()
    .withMessage("Sizes must be an array of object"),
  body("sizes.*.size")
    .exists()
    .withMessage("sizes must be present in every entry of sizes array")
    .bail()
    .trim()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("sizes can be one of these XS S M, L, XL, XXL"),
  body("sizes.*.stock")
    .exists()
    .withMessage("stock must be present in every entry of the sizes array")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  handleValidationError,
];
