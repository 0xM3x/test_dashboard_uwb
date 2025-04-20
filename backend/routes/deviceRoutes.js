const express = require('express');
const router = express.Router();
const { registerDevice, renameDevice } = require('../controllers/deviceController');

router.post('/', registerDevice);
router.patch('/:device_id', renameDevice);

module.exports = router;

