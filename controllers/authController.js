const bcrypt = require("bcrypt");
const User = require("../models/userModel");


// Show Login Page
exports.showLogin = (req, res) => {
    res.render("login", {
        error: null
    });
};


// Login
exports.login = async (req, res) => {
    try {

        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.render("login", {
                error: "Username and password are required"
            });
        }

        // Find user
        const user = await User.findOne({
            username: username
        });

        if (!user) {
            return res.render("login", {
                error: "Invalid username or password"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.render("login", {
                error: "Invalid username or password"
            });
        }

        // Save user information to session
        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role
        };

        // Login successful
        res.redirect("/orders");

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Login error"
        );
    }
};


// Logout
exports.logout = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });
};