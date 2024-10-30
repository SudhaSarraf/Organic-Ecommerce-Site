const express = require('express');
const router = express.Router();
const vlogController = require('../controllers/vlog.controller');


router.get('/all', vlogController.getTotalVlogs);
router.post('/',vlogController.createNewVlog);
router.delete('/',vlogController.deleteVlog);

module.exports = router;