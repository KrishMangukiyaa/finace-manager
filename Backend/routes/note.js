const express = require('express');
const { addNote, deleteNote, updateNote, getUserNotes } = require('../controllers/note');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/create/:userId",verifyToken, addNote); // Add a note  
router.get("/get/:userId",verifyToken, getUserNotes); // Get all notes of a user  
router.put("/update/:noteId",verifyToken, updateNote); // Update a note  
router.delete("/delete/:noteId",verifyToken, deleteNote); // Delete a note  

module.exports = router;
