const express = require("express");

const app = express();

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
    res.send("API Running");
});

module.exports = app;