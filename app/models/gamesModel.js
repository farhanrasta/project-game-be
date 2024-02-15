const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema(
    {
        username: String,
        name: String,
        userMove: String,
        computerMove: String,
        result: String,
        userWins: String,
        computerWins: String
    },{
        timestamps : true
    }
);

const Games = mongoose.model("Games", gamesSchema);

module.exports = Games;




    
