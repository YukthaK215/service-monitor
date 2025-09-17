const express = require('express');
const router = express.Router();
const { addService, getServices, checkStatus } = require('../controllers/monitorController');
router.post('/add', addService);
router.get('/all', getServices);
router.get('/check', checkStatus);
module.exports = router;