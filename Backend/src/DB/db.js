const mongoose = require("mongoose");

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

module.exports = ConnectDB;