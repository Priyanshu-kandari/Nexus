const { config } = require("dotenv");
const app = require("./src/app.js");
const ConnectDB = require("./src/DB/db.js");

config();

const PORT = process.env.PORT || 5001;

const StartServer = async () => {
    try {
        await ConnectDB();

        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        });

    } catch (err) {
        console.error("Server failed to start:", err);
        process.exit(1);
    }
};

StartServer();