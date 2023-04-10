const express = require('express')
const router = express.Router()

var nft_marketplace_routes = require('../controllers/nft_marketplace_controller');

router.post('/asks', nft_marketplace_routes.asks);
router.post('/items', nft_marketplace_routes.items);
router.post('/auction-items', nft_marketplace_routes.auction_items);

module.exports = router