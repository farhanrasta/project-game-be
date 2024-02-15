
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
        const userTable = await Users.findOne({ username });
        // If user not found or token does not match, return unauthorized
        if (!userTable || userTable.token !== authToken) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        //Start Game
        const result = playGame(userMove, computerMove);
        console.log(result);
        let player = await Games.findOne({ username });

        if (!player) {
            player = new Games({ username });
        }

        player.name = userTable.name;
        player.userMove = result.userMove;
        player.computerMove = result.computerMove;
        player.userWins = result.userWins;
        player.computerWins = result.computerWins;
        player.result = result.result;

        await player.save();
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
        const userTable = await Users.findOne({ username });
        // If user not found or token does not match, return unauthorized
        if (!userTable || userTable.token !== authToken) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        let player = await Games.findOne({ username });

        if (!player) {
            player = new Games({ username });
        }

        player.userWins = userWins;
        player.computerWins = computerWins;
        
        await player.save();

        // await Users.findOneAndUpdate({ username }, { $unset: { userMove: '', computerMove: '' }  })
        res.status(200);
    } catch (error) {
        console.error('Error Game:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};