const mongoose = require("mongoose");


const songSchema = new mongoose.Schema({
    songUrl:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String,
        required:true
    },
    songTitle:String
    

})


const songModel = mongoose.model("songs",songSchema)

module.exports =  songModel