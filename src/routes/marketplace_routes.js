const express = require('express')
const router = express.Router()

const marketplace_controller = require('../controllers/marketplace_controller');

router.post('/add-offer', marketplace_controller.sign_add_offer);
router.post('/is-signature-used', marketplace_controller.is_signature_used);

module.exports = router