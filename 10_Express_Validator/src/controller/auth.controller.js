import userModel from "../models/auth.model.js";

export const registerUserController = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const errors = [];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      errors.push({ field: "email", error: "Email is required" });
    } else if (!emailRegex.test(email.trim())) {
      errors.push({ field: "email", error: "Invalid email address" });
    }

    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6-9]\d{9}$/;
    if (!phone) {
      errors.push({ field: "phone", error: "Phone number is required" });
    } else if (!phoneRegex.test(String(phone).trim())) {
      errors.push({ field: "phone", error: "Invalid phone number" });
    }

    if (!password || !password.trim()) {
      errors.push({ field: "password", error: "Password is required" });
    } else if (password.trim().length < 6) {
      errors.push({
        field: "password",
        error: "Password must contain a minimum of 6 characters",
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    const existingUser = await userModel.findOne({
      $or: [{ email: email.trim().toLowerCase() }, { phone }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this email or phone already exists",
      });
    }

    const user = await userModel.create({
      email: email.trim().toLowerCase(),
      phone,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
