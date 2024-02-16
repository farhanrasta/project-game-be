const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema(
    {
        username: String,
        name: String,
        userMove: String,
        computerMove: String,
        result: String,
        userWins: Number,
        computerWins: Number
    },{
        timestamps : true
    }
);

const Games = mongoose.model("Games", gamesSchema);

module.exports = Games;




    
