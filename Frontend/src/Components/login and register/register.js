import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:4002/user";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        profileImage: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profileImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        if (formData.profileImage) {
            formDataToSend.append("profileImage", formData.profileImage);
        }

        try {
            const response = await axios.post(`${BASE_URL}/register`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Registration successful");
            navigate("/login");
        } catch (error) {
            console.error("Error:", error.response.data);
        }
    };

    return (
        <AuthStyled>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="auth-container"
            >
                <h2>Join FinanceApp</h2>
                <p>Sign up to start tracking your expenses!</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <FaUser className="icon" />
                        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                    </div>
                    <div className="input-field">
                        <FaEnvelope className="icon" />
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    </div>
                    <div className="input-field">
                        <FaLock className="icon" />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    </div>
                    <div className="input-field">
                        <FaImage className="icon" />
                        <input type="file" name="profileImage" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} className="auth-button">
                        Sign Up
                    </motion.button>
                </form>
                <p className="toggle-text">
                    Already have an account? <span onClick={() => navigate("/login")}>Login</span>
                </p>
            </motion.div>
        </AuthStyled>
    );
}

const AuthStyled = styled.div` display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, rgb(250, 250, 250), rgb(0, 144, 221), rgb(123, 200, 255));

    .auth-container {
        background: rgba(255, 255, 255, 0.15);
        padding: 2rem;
        border-radius: 20px;
        text-align: center;
        width: 350px;
    }

    h2 {
        font-size: 2rem;
        color: #333;
    }

    p {
        color: #666;
        margin-bottom: 1rem;
    }

    .input-field {
        display: flex;
        align-items: center;
        background: rgb(243, 243, 243);
        padding: 0.8rem;
        border-radius: 10px;
        margin-bottom: 1rem;
    }

    .icon {
        color: #2575fc;
        margin-right: 10px;
    }

    input {
        border: none;
        outline: none;
        background: transparent;
        width: 100%;
    }

    .auth-button {
        width: 100%;
        background: #2575fc;
        color: white;
        padding: 0.8rem;
        border-radius: 10px;
        font-size: 1rem;
        cursor: pointer;
        transition: 0.3s;
    }

    .auth-button:hover {
        background: #1a5bb8;
    }

    .toggle-text {
        margin-top: 1rem;
        color: #333;
    }

    .toggle-text span {
        color: #2575fc;
        cursor: pointer;
        font-weight: bold;
    }

    .toggle-text span:hover {
        text-decoration: underline;
    }
`;