const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
        
    },
    premium: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;