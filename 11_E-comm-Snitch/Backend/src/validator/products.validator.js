import {body, validationResult} from 'express-validator'

const productValidator = [

    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be a String").bail()
        .trim()
        .isLength({min:3, max:100}).withMessage("Title lenght must be between 3 to 100 characters")

]