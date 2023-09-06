const express = require('express')
const router = express.Router()

const signing_controller = require('../controllers/signing_controller');

router.post('/claim-application-token', signing_controller.sign_claim_application_token);
router.post('/claim-mint-token', signing_controller.sign_claim_mint_token);
router.post('/conversion-application-to-mint', signing_controller.sign_conversion_application_to_mint);
router.post('/conversion-mint-to-application', signing_controller.sign_conversion_mint_to_application);
router.post('/instant-conversion-application-to-mint', signing_controller.sign_instant_conversion_application_to_mint);
router.post('/instant-conversion-mint-to-application', signing_controller.sign_instant_conversion_mint_to_application);
router.post('/staking-application-token', signing_controller.sign_staking_application_token);
router.post('/withdraw-application-token', signing_controller.sign_withdraw_application_token);
router.post('/cancel-mint-token', signing_controller.sign_cancel_mint_token);
router.post('/cancel-application-token', signing_controller.sign_cancel_application_token);
router.post('/is-signature-used', signing_controller.is_signature_used);

module.exports = router