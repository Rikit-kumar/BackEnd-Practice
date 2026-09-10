const express = require("express");
const connectDB = require("./config/db");
const NotesModel = require("./models/notes.model");
const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("You Reached Here");
});

app.post("/create", async (req, res) => {
  let { title, description } = req.body;

  let newNote = await NotesModel.create({
    title,
    description,
  });

  res.send({
    success: true,
    message: "Notes Create Successfully",
    data: newNote,
  });
});

module.exports = app;
