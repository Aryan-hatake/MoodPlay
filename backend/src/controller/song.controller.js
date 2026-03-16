const nodeid3 = require("node-id3")
const { client, toFile } = require("../services/imageKit.service")
const songModel = require("../model/song.model")

async function uploadSong(req, res) {

    const tags = nodeid3.read(req.file.buffer)
    const { mood } = req.body

    const [songFile, posterFile] = await Promise.all([
        client.files.upload({
        file: await toFile(req.file.buffer),
        fileName: tags.title + 'mp3',
        folder: 'moodplay/songs'
    }), client.files.upload({
        file: await toFile(tags.image.imageBuffer),
        fileName: tags.title + 'jpeg',
        folder: 'moodplay/posters'
    })])
    
    const uploadSong = await songModel.create({
         songUrl:songFile.url,
         posterUrl:posterFile.url,
         mood,
         songTitle:tags.title+".mp3"
    })

    console.log(songFile)
    res.status(201).json({
        message: mood + " song has been uploaded",
        uploadSong


    })
}

async function getSongs(req,res){
    const mood = (req.query.mood).toLowerCase() 
    
    const songs = await songModel.find({mood})
    const random = Math.floor(Math.random()*songs.length) 

   console.log(songs)
    res.status(200).json({
        song:songs[random]
    })
}
async function getPlayList(req,res){
    const mood = (req.query.mood).toLowerCase() 
    
    const songs = await songModel.find({mood})


    res.status(200).json({
        playlist:songs
    })
}

module.exports = { uploadSong,getSongs,getPlayList }