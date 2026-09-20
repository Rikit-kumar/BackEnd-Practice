import UserModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../util/authentication.js";

export const registerUserController = async (req, res) => {
  try {
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

    const user = await UserModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });

    const { accessToken, refreshToken } = generateToken({
      id: user._id,
      role: user.role,
    });

    await UserModel.findByIdAndUpdate(user._id, {
      refreshToken,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    return res.status(201).json({
      message: "User Registered Successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
      },
    });
  } catch (error) { 
    console.error("Register Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
