const Note = require('../models/noteMode');
const User = require('../models/userModel');

// Add Note
exports.addNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.params.userId;

        const newNote = new Note({ user: userId, title, content });
        await newNote.save();

        await User.findByIdAndUpdate(userId, { $push: { notes: newNote._id } });

        res.status(201).json({ message: "Note added successfully", newNote });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get User Notes
exports.getUserNotes = async (req, res) => {
    try {
        const userId = req.params.userId;
        const notes = await Note.find({ user: userId });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Note
exports.updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const noteId = req.params.noteId;

        const updatedNote = await Note.findByIdAndUpdate(noteId, { title, content }, { new: true });

        if (!updatedNote) return res.status(404).json({ message: "Note not found" });

        res.status(200).json({ message: "Note updated successfully", updatedNote });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Note
exports.deleteNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;

        const deletedNote = await Note.findByIdAndDelete(noteId);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });

        await User.findByIdAndUpdate(deletedNote.user, { $pull: { notes: noteId } });

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
