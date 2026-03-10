const { config } = require("dotenv");
const app = require("./src/app.js");

config();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});