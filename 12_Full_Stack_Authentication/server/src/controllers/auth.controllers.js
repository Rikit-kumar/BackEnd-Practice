import userModel from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/auth.util.js";

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  const isEmailExist = await userModel.findOne({ email });

  if (isEmailExist) {
    return res.status(409).json({
      message: "User already exists with this email address",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  return res.status(201).json({
    message: "User registered successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
    },
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized, Invalid email or password",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Unauthorized, Invalid email or password",
    });
  }

  const { accessToken, refreshToken } = generateToken({ id: user._id });

  await userModel.findByIdAndUpdate(
    user._id,
    { $set: { refreshToken } },
    { runValidators: true },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "User loggedIn successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    },
  });
};
