const express = require("express");
const { connection } = require("./connection/db");
require('dotenv').config();
const cors = require("cors");
const { bookRouter } = require("./routes/book.routes");



const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send('Home Page!')
})

app.use("/book", bookRouter)


app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log('connected to db');
    } catch (error) {
        console.log("unable to connect with db!");
        console.log(error.message);
    }
    console.log(`App is running on PORT ${process.env.PORT}`)
})