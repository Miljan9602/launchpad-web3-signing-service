const express = require('express')
const router = express.router()

var sale_controller = require('../controllers/sale_controller');

router.post('/sale/get-sale-information', sale_controller.get_sale_information(request, response))

router.post('/sale/timeline', sale_controller.timeline(request, response));

router.post('/sale/get-vesting-info', sale_controller.get_vesting_info(request, response));

router.post('/sale/get-unlock-time', sale_controller.get_unlock_time(request, response))

router.post('/sale/staking-round-id', sale_controller.staking_round_id(request, response));

router.post('/sale/round-id-to-round', sale_controller.round_id_to_round(request, response));

router.post('/sale/supports-dexalot-withdraw', sale_controller.supports_dexalot_withdraw(request, response));

router.post('/sale/dexalot-unlock-time', sale_controller.dexalot_unlock_time(request, response));

router.post('/sale/sign-registration', sale_controller.sign_registration(request, response));

router.post('/sale/is-user-registered', sale_controller.is_user_registered(request, response))

router.post('/sale/get-number-of-registered', sale_controller.get_number_of_registered(request, response))

router.post('/sale/address-to-round-registered-for', sale_controller.address_to_round_registered_for(request, response))

router.post('/sale/sign-participation', sale_controller.sign_participation(request, response));

router.post('/sale/get-participation', sale_controller.get_participation(request, response))

router.post('/sale/get-number-of-participants', sale_controller.get_number_of_participants(request, response))

router.post('/sale/is-participated', sale_controller.is_participated(request, response));

router.post('/sale/token-price-in-avax', sale_controller.token_price_in_avax(request, response))

module.exports = router