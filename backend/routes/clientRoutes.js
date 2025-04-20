const express = require('express');
const router = express.Router();
const { createClient, getClientDetails } = require('../controllers/clientController');

router.post('/', createClient);
router.get('/:id', getClientDetails);

module.exports = router;

