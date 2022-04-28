const express = require('express')
const router = express.Router()

var staking_controller = require('../controllers/staking_controller');

router.post('/is-nonce-used', staking_controller.is_nonce_used)

router.post('/is-user-staking', staking_controller.is_user_staking);

router.post('/pool-info', staking_controller.pool_info);

router.post('/user-info', staking_controller.user_info);

router.post('/sign-withdraw', staking_controller.sign_withdraw)

module.exports = router