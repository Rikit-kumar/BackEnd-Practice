const mongoose = require("mongoose");

let notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

let NotesModel = mongoose.model("notes", notesSchema);

module.exports = NotesModel;
