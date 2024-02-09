const express = require("express")
const cors = require("cors")
const db = require("./app/models/index")
const app = express()

const corsOption = {
    origin : "*"
};

//register cors middleware
app.use(cors(corsOption))
app.use(express.json())

//connect to database
const mongooseConfig = {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
}

db.mongoose.connect(db.url)
    .then(() => console.log("database connected"))
    .catch(err => {
        console.log(err);
        process.exit();
    });

app.get("/api", (req, res) => {
    res.json({"message" : "Hello Farhan"});
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});