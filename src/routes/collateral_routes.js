const express = require('express')
const router = express.Router()

var collateral_controller = require('../controllers/collateral_controller');

router.post('/auto-participate', collateral_controller.auto_participate);
router.post('/boost-participation', collateral_controller.boost_participation)
router.post('/user-balance', collateral_controller.user_balance)
router.post('/verify-auto-buy-signature', collateral_controller.verify_auto_buy_signature)


module.exports = router