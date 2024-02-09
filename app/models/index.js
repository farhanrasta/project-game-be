const dbConfig = require("../config/database");
const mongoose = require("mongoose");

module.exports = {
    mongoose, 
    url : dbConfig.url,
    games : require("./gamesModel.js")(mongoose)
}