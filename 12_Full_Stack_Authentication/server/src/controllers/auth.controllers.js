import userModel from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { generateToken, verifyRefreshToken } from "../utils/auth.util.js";

export const registerUserController = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const tokenRefreshController = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized, Refresh token not found",
      });
    }

    try {
      const decoded = verifyRefreshToken(refreshToken);
      const user = await userModel.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized, User not found",
        });
      }

      if (user.refreshToken !== refreshToken) {
        await userModel.findByIdAndUpdate(user._id, {
          refreshToken: null,
        });

        res.clearCookie("refreshToken");

        return res.status(401).json({
          message: "Unauthorized, Refresh token mismatch",
        });
      }

      const { accessToken, refreshToken: newRefreshToken } = generateToken({
        id: user._id,
      });

      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: newRefreshToken,
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Tokens refresh successfully",
        data: {
          accessToken,
        }
      });
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized, Invalid or expired refresh token",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const meApiController = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized, user not found",
      });
    }

    return res.status(200).json({
      message: "User detail fetched successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logoutUserController = async(req, res)=>{
  try {

    const {id} = req.user;
    const user = await userModel.findById(id);

    if(!user){
      return res.status(401).json({
        message: "Unauthorized, user not found",
      });
    }

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: null
    })

    res.clearCookie("refreshToken");

    return res.status(200).json({
      message: "User logged Out successfully"
    })
    
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}
