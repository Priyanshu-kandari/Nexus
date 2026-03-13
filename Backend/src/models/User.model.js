const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        required: true
    },
    clerkId:{
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel