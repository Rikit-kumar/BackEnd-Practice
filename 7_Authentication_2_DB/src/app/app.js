import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authUserModel from "../models/authUser.model.js";
import { authentication } from "../middleware/auth.middleware.js";
import bcrypt from "bcryptjs";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/api/auth", (req, res) => {
  res.status(200).json({
    message: "Everything perfect",
  });
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await authUserModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.status(201).json({
    message: "User Create Successfully",
    data: {
      user: {
        name,
        email,
        id: user._id,
      },
      token,
    },
  });
});

app.get("/api/auth/me", authentication, async (req, res) => {
  console.log(req.user);

  res.status(200).json({
    message: "User fetch successfully",
    data: {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    },
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const loginUser = await authUserModel.findOne({email});

  const isValidPassword = bcrypt.compare(password, loginUser.password);

  if (!isValidPassword) {
    res.status(400).json({
      message: "invalid Email or Password",
    });
  }

  const token = jwt.sign(
    {
      id: loginUser._id,
    },
    process.env.JWT_SECRET,
  );

  res.status(200).json({
    message: "User LoggedIn Successfully",
    data: {
      user: {
        name: loginUser.name,
        email: loginUser.email,
      },
    },
    token,
  });
});

export default app;
