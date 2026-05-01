const express = require("express");
const app = express();
const authRouter = require("./routes/auth.route")
const songRouter = require("./routes/song.route")
const path  = require("path")
const cookieParser = require("cookie-parser")
const cors = require("cors")
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:"https://moodplay-service.onrender.com",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRouter)
app.use("/api/song",songRouter)


module.exports = app