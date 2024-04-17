const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255
    },
    imgProfile: {
        type: String,
        required: false,
        default: "https://res.cloudinary.com/dfgp2bo7r/image/upload/v1713110650/capstone_assets/default_users/ec0osijwpehcil4lkjmi.png",
        max: 255
    },
    firstName:
    {
        type: String,
        required: true,
        max: 255
    },
    lastName:
    {
        type: String,
        required: true,
        max: 255
    },
    role:
    {
        type: String,
        required: false,
        default: "regular_user",
        max: 255
    },
    password:
    {
        type: String,
        required: true,
        max: 255
    }


}, { timestamps: true, strict: true })

module.exports = mongoose.model('userModel', UserSchema, 'users')