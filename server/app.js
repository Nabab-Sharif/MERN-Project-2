//Basic Lib Import
const express = require("express");
const app = new express();
const router = require("./src/routes/api");
const bodyParser = require("body-parser");

//Security Middleware Lib Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitizie = require("express-mongo-sanitize");
// const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

//Database Lib Import
const mongoose = require("mongoose");

//Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitizie());
// app.use(xss());
app.use(hpp());

//body parser implement
app.use(bodyParser.json());

//Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

//MongoDB Database Connection
let URI = "";
let OPTION = { autoIndex: true }
mongoose.connect(URI, OPTION, (error) => {
  console.log(`Connection Success`)
  console.log(error)
})


// Routing Implement
app.use("/api/v1", router);


//Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" })
})

module.exports = app;