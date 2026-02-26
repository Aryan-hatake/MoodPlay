require("dotenv").config()

const app = require('./src/app')
const connectToDB = require("./src/config/connect.database")
const port = process.env.PORT || 3000

connectToDB()

app.listen(port,()=>{
    console.log("server is running on port ",port)
})