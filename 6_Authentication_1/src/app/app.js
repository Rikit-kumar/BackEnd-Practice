import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.get("/api/auth", (req, res) => {
  res.status(200).json({
    message: "Welcome to Authentication Api",
  });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  const token = jwt.sign(
    {
      name,
      email,
    },
    "744f0570e9a533f63178e3d19fa26bc76c4aa6b4e26ea9ed060fea0a7b80463c8d350394fc383af616126e76",
  );

  res.status(201).json({
    message: "User create Successfully",
    data: {
      user: {
        name,
        email,
      },
      token,
    },
  });
});

export default app;
