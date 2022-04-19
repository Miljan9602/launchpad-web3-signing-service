const express = require('express')
const router = express.Router()

var collateral_controller = require('../controllers/collateral_controller');

router.post('/auto-participate', collateral_controller.auto_participate);

router.post('/boost-participation', collateral_controller.boost_participation)

module.exports = router