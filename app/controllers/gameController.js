
const Users = require('../models/usersModel.js');
const Games = require('../models/gamesModel.js')
const { playGame } = require('../utils/gamesUtils.js')
const Leaderboard = require('../models/leaderboardModel.js');

exports.game = async (req, res) => {
    const { username } = req.params;
    const { userMove, computerMove } = req.body;

    //Token Authorization
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }

    try {

        // Extract token from the authorization header
        const authToken = token.split(' ')[1];
        // Find the user by username
        const userTable = await Users.findOne({ username });
        // If user not found or token does not match, return unauthorized
        if (!userTable || userTable.token !== authToken) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        //Start Game
        let player = await Games.findOne({ username });
        if (!player) {
            player = new Games({ username });
        }

        console.log(player.userWins, "playUs");
        console.log(player.computerWins, "playCom");

        //get User Win History
        let usWins = (player.userWins != null ? player.userWins : 0 );
        console.log(usWins, "usWins");
        let comWins = (player.computerWins != null ? player.computerWins : 0);
        console.log(comWins, "comWins");

        const result = playGame(userMove, computerMove, usWins, comWins);
        console.log(result);

        player.name = userTable.name;
        player.userMove = result.userMove;
        player.computerMove = result.computerMove;
        player.userWins = result.userWins;
        player.computerWins = result.computerWins;
        player.result = result.result;

        await player.save();

        //save leaderboard
        // const leaderboard = new Leaderboard({
        //     username : username,
        //     userWins : result.userWins
        // });

        // leaderboard.save();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error Game:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.reset = async (req, res) => {
    const { username } = req.params;

    //Token Authorization
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }

    try {

        // Extract token from the authorization header
        const authToken = token.split(' ')[1];
        // Find the user by username
        const userTable = await Users.findOne({ username });
        // If user not found or token does not match, return unauthorized
        if (!userTable || userTable.token !== authToken) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        let player = await Games.findOne({ username });

        if (!player) {      
            player = new Games({ username });
        }

        player.userWins = 0;
        player.computerWins = 0;
        
        await player.save();

        // await Users.findOneAndUpdate({ username }, { $unset: { userMove: '', computerMove: '' }  })
        res.status(200);
    } catch (error) {
        console.error('Error Game:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.leaderboard = async (req, res) => {
    const { username } = req.params;
    // const { userMove } = req.body;

    //Token Authorization
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }

    try {

        // Extract token from the authorization header
        const authToken = token.split(' ')[1];
        // Find the user by username
        const checkToken = await Users.findOne({ username });
        // If user not found or token does not match, return unauthorized
        if (!checkToken || checkToken.token !== authToken) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Tambahkan hasil permainan ke leaderboard
        const leaderboardData = await Games.find().sort({ userWins: -1 });
        console.log(leaderboardData, "leader");

        res.status(200).json(leaderboardData);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};