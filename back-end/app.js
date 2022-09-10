// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const profileController = require("./controllers/profileController.js");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use("/profiles", profileController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to the NFT Profile API");
});

// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
  });


// EXPORT
module.exports = app;