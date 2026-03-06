const nodeid3 = require("node-id3")
const { client, toFile } = require("../services/imageKit.service")

async function uploadSong(req, res) {

    const tags = nodeid3.read(req.file.buffer)

    const songFile = await client.files.upload({
        file: await toFile(req.file.buffer),
        fileName: tags.title+'mp3',
        folder: 'moodplay/songs'
    });

    const imageFile = await client.files.upload({
        file: await toFile(tags.image.imageBuffer),
        fileName: tags.title+'jpeg',
        folder: 'moodplay/posters'
    });
    
    console.log(songFile)
    res.status(201).json({
        message:"song has been uploaded",
    
    })
}

module.exports = { uploadSong }