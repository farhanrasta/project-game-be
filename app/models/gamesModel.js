const mongoose = require("mongoose");

module.exports = mongoose => {

    const games = mongoose.Schema(
        {
            user: String,
            computer: String 
        },{
            timestamps : true
        }
    );

    return mongoose.model("games", games);

}


    
