const express = require('express');
const router = express.Router();
const fileUpload = require('../controllers/file.upload.controller');

router.post('/',fileUpload.uploadFiles);

module.exports = router;