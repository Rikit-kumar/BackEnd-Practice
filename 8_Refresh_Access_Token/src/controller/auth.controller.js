import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../util/auth.js";

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await UserModel.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({
      message: "User already exist",
      errors: [
        {
          path: "email",
          message: "User already exists",
        },
      ],
    });
  }

  const user = await UserModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  const { accessToken, refreshToken } = generateToken({ user_id: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(201).json({
    message: "User Registerd Successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
      accessToken,
    },
  });
};

export const userDetailController = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = verifyAccessToken(accessToken);
    const user = await UserModel.findById(decoded.id);

    res.status(200).json({
      message: "user Fetched successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Unauthorized, Invalid or expired access token",
    });
  }
};

export const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized, refresh token not found",
    });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await UserModel.findById(decoded.id);

    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null;
      await user.save();

      return res.status(401).json({
        message: "Unauthorized, refresh token mismatch",
      });
    }

    const {refreshToken: newRefreshToken, accessToken} = generateToken({user_id: user._id});

    res.cookie("refreshToken", newRefreshToken, {httpOnly: true})
    
    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
        message: "Token refreshed successfully",
        accessToken
    })

  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired refresh token",
    });
  }
};
