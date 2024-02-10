const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        name: String, 
        token: String
    },{
        timestamps : true
    }
);

const Users = mongoose.model("User", usersSchema);

module.exports = Users;