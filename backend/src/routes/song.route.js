const { Router } = require("express")
const songController = require("../controller/song.controller")
const songRouter = Router();
const upload  = require("../middleware/upload.middleware");

songRouter.post("/upload",upload.single("song"), songController.uploadSong)
songRouter.get("/getsong", songController.getSongs)
songRouter.get("/getplaylist", songController.getPlayList)


module.exports = songRouter