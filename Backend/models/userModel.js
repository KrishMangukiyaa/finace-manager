const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        // trim: true,
        // maxLength: 50
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        // trim: true
    },
    password: {
        type: String,
        // required: true,
        // minLength: 6
    },
    profileImage: {
        type: String, // Stores the image path
        // required: false
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
