const express = require('express')
const router = express.Router()

const sale_controller = require('../controllers/sale_controller');

router.post('/withdraw', sale_controller.sign_withdraw_tokens);


module.exports = router