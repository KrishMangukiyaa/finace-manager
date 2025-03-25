const express = require('express');
const { chatWithAI } = require("../service/ai.service.js");
const { getUserChatHistory } = require("../controllers/ai.js");
const { verifyToken } = require("../middleware/authMiddleware.js");
const router = express.Router();

// Send a message to AI
router.post("/chat",  chatWithAI); //verifyToken

// Get chat history
router.get("/history", verifyToken, getUserChatHistory);

module.exports = router;
