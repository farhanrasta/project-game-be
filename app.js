const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mainRoutes = require('./app/routes/mainRoutes');
require('dotenv').config();
const Users = require('./app/models/usersModel.js');
const Games = require('./app/models/gamesModel.js')
const { playGame } = require('./app/utils/gamesUtils.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOption = {
    origin : "*"
};

//register cors middleware
app.use(cors(corsOption));
app.use(express.json());

//connect to database
const mongooseConfig = {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
};

mongoose.connect(process.env.MONGODB_URL, mongooseConfig)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function() {
    console.log("Connected to MongoDB")
})

app.use(express.json());
// app.use('/api', mainRoutes);

app.get('/', (req, res) => {
    res.send('PINGSUT!');
});

app.post('/api/login', async (req, res) => {
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
        console.error('Error login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/signup', async (req, res) => {
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
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});