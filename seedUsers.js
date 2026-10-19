require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const connectDB = require("./config/db");
const User = require("./models/userModel");


const seedUsers = async () => {
    try {

        await connectDB();

        // Prevent duplicate users
        await User.deleteMany({
            username: {
                $in: ["admin", "user1"]
            }
        });


        // Hash passwords
        const adminPassword = await bcrypt.hash(
            "admin123",
            10
        );

        const userPassword = await bcrypt.hash(
            "user123",
            10
        );


        // Create predefined accounts
        await User.create([
            {
                username: "admin",
                password: adminPassword,
                role: "admin"
            },
            {
                username: "user1",
                password: userPassword,
                role: "user"
            }
        ]);


        console.log("Users created successfully");

        await mongoose.connection.close();

    } catch (error) {

        console.error(
            "Error creating users:",
            error
        );

        await mongoose.connection.close();
    }
};


seedUsers();