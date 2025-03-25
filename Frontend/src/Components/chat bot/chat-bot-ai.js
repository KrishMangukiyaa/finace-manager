import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  
  const userId = localStorage.getItem("userId"); // ✅ Get userId from localStorage

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // ✅ Redirect if userId is missing
    }
  }, [userId, navigate]);

  const sendMessage = async () => {
    if (!input.trim() || !userId) return; // Prevent sending if input is empty or userId is missing

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:4002/ai/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, message: input }),
      });

      const data = await response.json();

      if (data.aiResponse) {
        const botMessage = { sender: "ai", text: data.aiResponse };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <ChatStyled>
      <motion.div className="chat-container">
        <h2><FaRobot /> AI Finance Assistant</h2>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`chat-message ${msg.sender}`}
            >
              {msg.sender === "user" ? <FaUser /> : <FaRobot />}
              <p>{msg.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Ask me anything about finance..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </motion.div>
    </ChatStyled>
  );
}

const ChatStyled = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 1000;

  .chat-container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 400px;
  }

  h2 {
    font-size: 1.3rem;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 0.5rem;
  }

  .chat-box {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 0.5rem;
  }

  .chat-message {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0.8rem;
    border-radius: 10px;
    max-width: 80%;
    word-wrap: break-word;
  }

  .chat-message.user {
    align-self: flex-end;
    background: #2196F3;
    color: white;
  }

  .chat-message.ai {
    align-self: flex-start;
    background: #E0E0E0;
    color: black;
  }

  .input-area {
    display: flex;
    gap: 0.5rem;
    padding-top: 0.5rem;
  }

  input {
    flex: 1;
    padding: 0.8rem;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
  }

  button {
    background: #2196F3;
    border: none;
    padding: 0.8rem;
    border-radius: 10px;
    cursor: pointer;
    color: white;
  }

  button:hover {
    background: #1976D2;
  }
`;
