require('dotenv').config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 8000;
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === 465, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});


const expressLayouts = require("express-ejs-layouts");

const db = require("./config/mongoose");

//Used for session cookie

const session = require("express-session");

const passport = require("passport");

const passportLocal = require("./config/passport-local-strategy");

const passportJWT = require("./config/passport-jwt-strategy");

app.use(cors());

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Set up view engine

app.set("view engine", "ejs");

app.set("views", "./views");

app.use(
  session({
    name: "caloriesapp",
    //TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Use express router

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
  }

  console.log("Server is running on", port);
});
