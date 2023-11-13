const express = require('express')
const router = express.Router()

const sale_controller = require('../controllers/sale_controller');

router.post('/withdraw', sale_controller.sign_withdraw_tokens);
router.post('/is-signature-used', sale_controller.is_signature_used);

module.exports = router