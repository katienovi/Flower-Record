"use strict";
const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const session = require('express-session');
const passport = require('passport');
require('./auth/passport');
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


const flowerRoutes = require('./routes/flowerRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/auth', require('./auth/authRoute'));
app.use('/flowers', flowerRoutes);

app.get("/", (req, res) => {
    res.redirect('/flowers')
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});