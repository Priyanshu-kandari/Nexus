const express = require("express");
const { clerkMiddleware } = require("@clerk/express");
const { serve } = require("inngest/express");
const { inngest, functions } = require("./config/inngest.js");

const app = express();

// middleware
app.use(clerkMiddleware()); // req.auth available
app.use(express.json());

// inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));

// routes
app.get("/", (req, res) => {
    console.log(req.auth);
    res.send("API Running");
});

module.exports = app;