const express = require('express');
const router = express.Router();
const upload = require('../Middleware/upload');
const { register, login, getUser, updateUser, changePassword } = require('../controllers/user');
const { verifyToken } = require('../middleware/authMiddleware');


router.post("/register", upload.single('profileImage'), register);
router.post("/login", login);
router.get("/:id",verifyToken, getUser); 
router.put("/:id", upload.single('profileImage'),verifyToken, updateUser);
router.post("/:id",verifyToken, changePassword);

module.exports = router;
