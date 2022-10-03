const express = require('express')
const router = express.Router()

var sale_controller = require('../controllers/sale_controller');

router.post('/get-sale-information', sale_controller.get_sale_information)

router.post('/get-vesting-info', sale_controller.get_vesting_info);

router.post('/get-unlock-time', sale_controller.get_unlock_time)

router.post('/dexalot-unlock-time', sale_controller.dexalot_unlock_time);

router.post('/sign-registration', sale_controller.sign_registration);

router.post('/is-user-registered', sale_controller.is_user_registered)

router.post('/number-of-registrants', sale_controller.number_of_registrants)

router.post('/address-to-round-registered-for', sale_controller.address_to_round_registered_for)

router.post('/sign-participation', sale_controller.sign_participation);

router.post('/get-participation', sale_controller.get_participation)

router.post('/get-number-of-participants', sale_controller.get_number_of_participants)

router.post('/is-participated', sale_controller.is_participated);

router.post('/token-price-in-avax', sale_controller.token_price_in_avax)

router.post('/change-phase', sale_controller.change_phase)

module.exports = router