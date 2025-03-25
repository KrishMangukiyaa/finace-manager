const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require("../models/chatModel.js");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

exports.chatWithAI = async (req, res) => {
    try {
        let { userId, message } = req.body;

        if (!userId || !message) {
            return res.status(400).json({ error: "User ID and message are required." });
        }

        // ✅ Convert userId to ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid User ID format." });
        }
        userId = new mongoose.Types.ObjectId(userId);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(message);

        const aiResponse = result.response?.candidates?.[0]?.content?.parts?.map(p => p.text).join("") || "No response from AI.";

        // Find or create a chat session
        let chat = await Chat.findOne({ user: userId });

        if (!chat) {
            chat = new Chat({ user: userId, messages: [] });
        }

        // Save user message and AI response
        chat.messages.push({ sender: "user", text: message });
        chat.messages.push({ sender: "ai", text: aiResponse });

        await chat.save();

        res.json({ message, aiResponse });

    } catch (error) {
        console.error("AI Chat Error:", error);
        res.status(500).json({ error: "Error processing AI chat" });
    }
};
