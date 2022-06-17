const express = require('express')
const router = express.Router()

var transaction_controller = require('../controllers/transaction_controller');

router.post('/status', transaction_controller.status);

router.post('/receipt', transaction_controller.receipt);

module.exports = router