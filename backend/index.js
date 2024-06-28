const express = require("express");
const app = express();

const cors = require('cors');

const taskRoute = require('./routes/Task');
const database = require('./config/database');

require('dotenv').config();
const PORT = process.env.PORT || 4000;

// dbConnect();


app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/auth", taskRoute);



app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running..."
    })
});


app.listen(PORT, () => {
    console.log(`App is running at port : ${PORT}`)
})