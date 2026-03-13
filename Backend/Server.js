const { config } = require("dotenv");
const app = require("./src/app.js");
const ConnectDB = require("./src/DB/db.js");

config();

const PORT = process.env.PORT || 5001;
const isVercel = process.env.VERCEL === "1";

const init = async () => {
    try {
        await ConnectDB();
    } catch (err) {
        console.error("Database connection failed:", err);
        if (!isVercel) {
            process.exit(1);
        }
    }
};

// Initialize once on cold start.
init();

if (!isVercel) {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
}

module.exports = app;
