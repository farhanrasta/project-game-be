const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/usersModel');
const Games = require('../models/gamesModel')
const { playGame } = require('../utils/gamesUtils.js')

exports.signup = async (req, res) => {
    try {
        const { username, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.findOne({ username });
        console.log(user);
        if (user) {
            return res.status(401).send('User has already registered');
        }

        const saveUser = new Users({ username, password: hashedPassword, name });
        await saveUser.save();
        res.status(201).send('Users created successfully');
    } catch (error) {
        res.status(500).send('Error creating Users');
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
            return res.status(401).send('Invalid Username or password');
        }
        const token = jwt.sign({ username: Users.username }, process.env.JWT_SECRET);
        user.token = token;
        await user.save();
        res.status(200).json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).send('Error logging in');
    }
};

exports.game = async (req, res) => {
    const { username } = req.params;
    const { userMove } = req.body;

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
        const result = playGame(userMove);
        console.log(result);
        const gameHistory = new Games({ 
            userMove: result.userMove, 
            computerMove: result.computerMove, 
            result: result.result 
        });

        gameHistory.save();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error Game:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.logout = async (req, res) => {

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
        const checkToken = await Users.findOne({ username });
        // If user not found or token does not match, return unauthorized
        if (!checkToken || checkToken.token !== authToken) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Find the game result by ID and delete it
        await Users.findOneAndUpdate({ username }, { $unset: { token: '' } })

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error deleting game result:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
};
