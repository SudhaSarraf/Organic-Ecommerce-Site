const express = require('express');
const router = express.Router();
const userController = require('../controllers/login.controllers');

router.get('/', userController.login);

router.get('/userInfo', userController.getUserInfo);

module.exports = router;