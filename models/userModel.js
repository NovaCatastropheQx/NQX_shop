const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

module.exports = mongoose.model("User", userSchema);