const express = require('express')
const router = express.router()

var staking_controller = require('../controllers/staking_controller');

router.post('/staking/is-nonce-used', staking_controller.is_nonce_used(request, response))

router.post('/staking/is-user-staking', staking_controller.is_user_staking(request, response));

router.post('/staking/pool-info', staking_controller.pool_info(request, response));

router.post('/staking/user-info', staking_controller.user_info(request, response))

module.exports = router