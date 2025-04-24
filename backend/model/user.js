const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, 
{
    timestamps: true,
});


const User = mongoose.model('User', userSchema);
module.exports = User;