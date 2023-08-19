const express = require('express')
const router = express.Router()

const utils_controller = require('../controllers/utils_controller');

router.post('/recover-typed-signature', utils_controller.recover_typed_signature);

module.exports = router