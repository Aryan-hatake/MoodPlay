const ImageKit  =  require('@imagekit/nodejs');
const {toFile} = require("@imagekit/nodejs")


const client = new ImageKit({
  privateKey: process.env.ImageKit_Private_Key , // This is the default and can be omitted
});

module.exports = {client,toFile}