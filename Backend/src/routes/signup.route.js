
const express = require('express');
const router = express.Router();
const userController = require('../controllers/signup.controllerl');

router.get('/all', userController.getTotalUser);
router.get('/', userController.getUserDetail);
router.post('/',userController.createNewUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);
router.get('/userInfo', userController.getUserInfo);

module.exports = router;