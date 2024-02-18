const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/usersModel.js');

// exports.login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await Users.findOne({ username });

//         if (!user) {
//             return res.status(404).send('User not found');
//         }
//         const passwordMatch = await bcrypt.compare(password, user.password);
    
//         if (!passwordMatch) {
//             return res.status(401).send('Invalid Username or password');
//         }
//         const token = jwt.sign({ username: Users.username }, process.env.JWT_SECRET);
//         user.token = token;
//         await user.save();
//         res.status(200).json({ token });
//     } catch (error) {
//         console.error('Error login:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

exports.getLogin = async (req, res) => {
    
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

        //Send name to response
        const name = checkToken.name;
        res.status(200).json({name});
    } catch (error) {
        console.error('Error fetching name:', error);
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
        console.error('Error logout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
};
