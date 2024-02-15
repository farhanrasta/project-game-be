const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    username: String,
    score: Number
}, { timestamps: true });

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;
