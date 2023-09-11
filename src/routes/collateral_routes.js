const express = require('express')
const router = express.Router()

const collateral_controller = require('../controllers/collateral_controller');

router.post('/withdraw', collateral_controller.sign_withdraw);
router.post('/deposit', collateral_controller.sign_deposit);


module.exports = router