// const bcrypt = require('bcrypt');
// const Users = require('../models/usersModel.js');

exports.signup = async (req, res) => {
    try {
        const { username, password, retypePassword, name } = req.body;

        // Check if passwords match
        if (password !== retypePassword) {
            return res.status(400).send({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.findOne({ username });
        console.log(user);
        if (user) {
            return res.status(401).send({ message: 'User has already registered' });
        }

        const saveUser = new Users({ username, password: hashedPassword, name });
        await saveUser.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error creating User' });
    }
};