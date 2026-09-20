import UserModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import {
  generateToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../util/authentication.js";

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

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

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

    res.status(200).json({
      message: "User LoggedIn Successfully",
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
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized, Refresh token not found",
      });
    }

    try {
      const decoded = verifyRefreshToken(refreshToken);

      const user = await UserModel.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized, User not found",
        });
      }

      if (refreshToken !== user.refreshToken) {
        return res.status(401).json({
          message: "Unauthorized, Refresh token mismatch",
        });
      }

      const { refreshToken: newRefreshToken, accessToken } = generateToken({
        id: user._id,
        role: user.role,
      });

      await UserModel.findByIdAndUpdate(user._id, {
        refreshToken: newRefreshToken,
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
      });

      res.status(200).json({
        message: "Token refresh Successfully",
        accessToken,
      });
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized, Invalid or expired refresh token",
      });
    }
  } catch (error) {
    console.log("Refresh Token controller error", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const userDetailController = async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    try {
      const decoded = verifyAccessToken(accessToken);
      const user = await UserModel.findById(decoded.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "User detail Fetched successfully",
        data: {
          user: {
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized, Invalid or expire access token",
      });
    }
  } catch (error) {
    console.log("user Detail controller error", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
