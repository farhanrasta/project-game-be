const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mainRoutes = require('./app/routes/mainRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOption = {
    origin : "*"
};

//register cors middleware
app.use(cors(corsOption));
app.use(express.json());

connect to database
const mongooseConfig = {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
};

mongoose.connect("mongodb://127.0.0.1:27017/project-game", mongooseConfig)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function() {
    console.log("Connected to MongoDB")
})

app.use(express.json());
app.use('/api', mainRoutes);

app.get('/', (req, res) => {
    res.send('PINGSUT!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
