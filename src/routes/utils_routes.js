const express = require('express')
const router = express.router()

var utils_controller = require('../controllers/utils_controller');

router.post('/utils/recover-typed-signature', utils_controller.recover_typed_signature(request, response));

router.post('/utils/recover-address', utils_controller.recover_address(request, response));

router.post('/utils/balance-of', utils_controller.balance_of(request, response))

router.post('/utils/total-supply', utils_controller.total_supply(request, response))

router.post('/utils/balance', utils_controller.balance(request, response))

router.post('/utils/sign-withdraw', utils_controller.sign_withdraw(request, response));

router.post('/utils/checksum', utils_controller.checksum(request, response))

module.exports = router