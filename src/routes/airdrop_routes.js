const express = require('express')
const router = express.router()

var airdrop_controller = require('../controllers/airdrop_controller');

router.post('/airdrop/get-signature', airdrop_controller.get_signature(request, response));

router.post('/airdrop/is-claimed', airdrop_controller.is_claimed(request, response));

router.post('/airdrop/info', airdrop_controller.info(request, response));

module.exports = router