    require("dotenv").config();
    
    const MongoStore = require("connect-mongo").default;
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
    // app.use(session({
    //     // secret: "sdn302-secret-key",
    //     secret: process.env.SESSION_SECRET,
    //     resave: false,
    //     saveUninitialized: false
    // }));
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        }),
    
        cookie: {
            maxAge: 1000 * 60 * 60
        }
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