    const express = require("express");
    const session = require("express-session");

    const connectDB = require("./config/db");
    const orderRoutes = require("./routes/orderManagementRoutes");

    const requireLogin = require("./middleware/authMiddleware");
    const authRoutes = require("./routes/authRoutes");

    const app =
    express();


    // MongoDB
    connectDB();


    // EJS
    app.set(
        "view engine",
        "ejs"
    );


    // Form Data
    app.use(
        express.urlencoded({
            extended: true
        })
    );
    // Session
    app.use(session({
        secret: "sdn302-secret-key",
        resave: false,
        saveUninitialized: false
    }));
    // Authentication Routes
    app.use(authRoutes);

    // Routes
    app.use("/orders", requireLogin, orderRoutes);


    // Home
    app.get(
        "/",
        (req, res) => {

            res.redirect(
                "/orders"
            );

        }
    );


    // Server
    app.listen(
        3000,
        () => {

            console.log(
                "Server running"
            );

        }
    );