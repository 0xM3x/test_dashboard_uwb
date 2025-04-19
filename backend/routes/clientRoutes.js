const express = require('express');
const router = express.Router();
const { createClient } = require('../controllers/clientController');

router.post('/', createClient);

module.exports = router;

