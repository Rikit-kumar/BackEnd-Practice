import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authUserModel from "../models/authUser.model.js";
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
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    "fd4097401a7a7fd449d24f4229f76b1551db98c8b44aa8049fc3e966f219e4c1dcdb7de8b716ed1b8c050436b8c575779f0eb439",
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

app.get("/api/auth/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  const data = jwt.decode(authHeader);
  const user = await authUserModel.findById(data.id);

  res.status(200).json({
    message: "User Fetch Successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export default app;
