const express = require('express')
const router = express.Router()

var airdrop_controller = require('../controllers/airdrop_controller');

router.post('/get-signature', airdrop_controller.get_signature);

router.post('/is-claimed', airdrop_controller.is_claimed);

router.post('/info', airdrop_controller.info);

module.exports = router