const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema(
    {
        userMove: String,
        computerMove: String,
        result: String
    },{
        timestamps : true
    }
);

const Games = mongoose.model("Games", gamesSchema);

module.exports = Games;




    
