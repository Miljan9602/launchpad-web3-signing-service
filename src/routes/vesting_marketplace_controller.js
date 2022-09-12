const express = require('express')
const router = express.Router()

var vesting_controller = require('../controllers/vesting_marketplace_controller');

router.post('/portion-listed/decode', vesting_controller.decode_portion_listed);

module.exports = router