const NotesModel = require("../models/notes.model");

const createNotesController = async (req, res) => {
  try {
    let { title, description } = req.body;
    let newNotes = await NotesModel.create({
      title,
      description,
    });

    return res.status(201).json({
      message: "Notes Create Successfully",
      data: newNotes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getAllNotesController = async (req, res) => {
  try {
    let allNotes = await NotesModel.find();

    res.status(200).json({
      message: "All Notes Data",
      data: allNotes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getSingleNoteController = async (req, res) => {
  try {
    let singleNoteId = req.params.id;
    let note = await NotesModel.findById(singleNoteId);

    res.status(200).json({
      message: "Fetch Single Note",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateSingleNoteController = async (req, res) => {
  try {
    let noteId = req.params.id;
    let body = req.body;

    let updatedNote = await NotesModel.findByIdAndUpdate(noteId, body, { new: true });

    res.status(200).json({
      message: "Notes Update Successfully",
      data: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteSingleNoteController = async (req, res) => {
  try {
    let deleteNoteId = req.params.id;
    let deletedNote = await NotesModel.findByIdAndDelete(deleteNoteId);

    res.status(200).json({
      message: "Note Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createNotesController,
  getAllNotesController,
  getSingleNoteController,
  updateSingleNoteController,
  deleteSingleNoteController
};
