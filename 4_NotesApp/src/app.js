const express = require("express");
const app = express();
const connectDataBase = require("./config/db");
const notesRouter = require("./routes/notes.route");
require("dotenv").config();

app.use(express.json());

connectDataBase();

app.use("/notes", notesRouter);

module.exports = app;
