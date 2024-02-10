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

exports.game = (req, res) => {
    const { user } = req.body;

    //Token Authorization
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }

    const tokenCheck = Users.findOne(token);
    console.log("tokenCheck:", tokenCheck)
    if (!tokenCheck) {
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }

    //Start Game
    const result = playGame(user);
    console.log(result);
    const gameHistory = new Games({ 
        userMove: result.userMove, 
        computerMove: result.computerMove, 
        result: result.result });

    gameHistory.save()
        .then(savedResult => {
            console.log('Game result saved:', savedResult);
        })
        .catch(error => {
            console.error('Error saving game result:', error);
        });
    res.json(result);
};


exports.logout = async (req, res) => {

    const { username } = req.params;

    //Token Authorization
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }

    const tokenCheck = Users.findOne(token);
    if (!tokenCheck) {
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }

    try {
        // Find the game result by ID and delete it
        await Users.findOneAndUpdate({ username }, { $unset: { token: '' } })

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error deleting game result:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
};
