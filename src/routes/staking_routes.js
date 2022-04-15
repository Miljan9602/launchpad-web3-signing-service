const express = require('express')
const router = express.Router()

var staking_controller = require('../controllers/staking_controller');

router.post('/staking/is-nonce-used', staking_controller.is_nonce_used)

router.post('/staking/is-user-staking', staking_controller.is_user_staking);

router.post('/staking/pool-info', staking_controller.pool_info);

router.post('/staking/user-info', staking_controller.user_info)

module.exports = router