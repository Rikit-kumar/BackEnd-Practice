const express = require('express');
const fileDataController = require('../controller/file.controller');
const upload = require('../config/multer.congif');

const router = express.Router();

router.post("/file", upload.single("image"), fileDataController)

module.exports = router;