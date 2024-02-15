
const Users = require('../models/usersModel.js');
const Games = require('../models/gamesModel.js')
const { playGame } = require('../utils/gamesUtils.js')

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
        const player = await Users.findOne({ username });
        // If user not found or token does not match, return unauthorized
        if (!player || player.token !== authToken) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        //Start Game
        const result = playGame(userMove, computerMove);
        console.log(result);
        const gameHistory = new Games({ 
            username: player.username,
            name: player.name,
            userMove: result.userMove, 
            computerMove: result.computerMove, 
            result: result.result,
            userWins: result.userWins,
            computerWins: result.computerWins 
        });

        gameHistory.save();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error Game:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.reset = async (req, res) => {
    const { username } = req.params;
    const { userWins, computerWins } = req.body;

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

        //Start Game
        const gameHistory = new Games({ 
            userWins: userWins,
            computerWins: computerWins 
        });

        gameHistory.save();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error Game:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};