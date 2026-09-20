import UserModel from "../models/auth.model.js";

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await UserModel.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({
      message: "User already exists with this email address",
      error: [
        {
          path: "email",
          message: "User already exists with this email address",
        },
      ],
    });
  }

  

};
