const express = require('express')
const router = express.Router()

const marketplace_controller = require('../controllers/marketplace_controller');
const signing_controller = require("../controllers/staking_controller");

router.post('/add-offer', marketplace_controller.sign_add_offer);
router.post('/remove-offer', marketplace_controller.sign_remove_offer);
router.post('/buy-offer', marketplace_controller.sign_buy_offer);
router.post('/is-signature-used', marketplace_controller.is_signature_used);

module.exports = router