const express = require('express')
const router = express.Router()

var vesting_controller = require('../controllers/vesting_marketplace_controller');

router.post('/portion-listed/decode', vesting_controller.decode_portion_listed);

router.post('/sign-add-portions-to-marketplace', vesting_controller.sign_add_portions_to_marketplace);

router.post('/sign-buy-portions', vesting_controller.sign_buy_portions);

router.post('/sign-remove-portions', vesting_controller.sign_remove_portions);

router.post('/buy_portions', vesting_controller.buy_portions);

module.exports = router