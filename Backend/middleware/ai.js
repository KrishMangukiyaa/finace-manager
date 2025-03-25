const Chat = require('../models/chatModel.js')

exports.getUserChatHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const chat = await Chat.findOne({ user: userId });

        if (!chat) return res.json({ messages: [] });

        res.json(chat.messages);
    } catch (error) {
        res.status(500).json({ error: "Error fetching chat history" });
    }
};

