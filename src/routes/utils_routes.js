const express = require('express')
const router = express.Router()

var utils_controller = require('../controllers/utils_controller');

router.post('/recover-typed-signature', utils_controller.recover_typed_signature);

router.post('/recover-address', utils_controller.recover_address);

router.post('/balance-of', utils_controller.balance_of)

router.post('/total-supply', utils_controller.total_supply)

router.post('/balance', utils_controller.balance)

router.post('/sign-withdraw', utils_controller.sign_withdraw);

router.post('/checksum', utils_controller.checksum)

module.exports = router