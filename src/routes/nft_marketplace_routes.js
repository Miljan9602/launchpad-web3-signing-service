const express = require('express')
const router = express.Router()

var nft_marketplace_routes = require('../controllers/nft_marketplace_controller');

router.post('/decode-logs', nft_marketplace_routes.decode_logs);
router.post('/asks', nft_marketplace_routes.asks);
router.post('/info', nft_marketplace_routes.nft_info);
router.post('/items', nft_marketplace_routes.items);
router.post('/auction-items', nft_marketplace_routes.auction_items);
router.post('/reveal', nft_marketplace_routes.reveal);

module.exports = router