const express = require('express');
const fs = require('fs');
const multer = require("multer");
const router = express.Router();

const readVideosData = () => {
    const videosData = fs.readFileSync("./data/videos.json",  "utf-8");
    return JSON.parse(videosData);
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images");
  },
  filename: function (_req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = {
  router,
  readVideosData,
  upload
};