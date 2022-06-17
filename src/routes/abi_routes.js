const express = require('express')
const router = express.Router()

var abi_controller = require('../controllers/abi_controller');

router.post('/sale', abi_controller.sale);

module.exports = router