const express = require('express')
const app = express()
app.use(express.json());

require('dotenv').config()

const middleware = require('./middleware/middleware')
const abi_router = require('./routes/abi_routes')
const air_drop_router = require('./routes/airdrop_routes')
const sale_router = require('./routes/sale_routes')
const utils_router = require('./routes/utils_routes')
const staking_router = require('./routes/staking_routes')
const collateral_router = require('./routes/collateral_routes')
const transaction_router = require('./routes/transaction_routes')
const vesting_marketplace_router = require('./routes/vesting_marketplace_controller')
const nft_marketplace_router = require('./routes/nft_marketplace_routes')

app.use(middleware);
app.use('/abi', abi_router)
app.use('/airdrop', air_drop_router);
app.use('/sale', sale_router);
app.use('/utils', utils_router);
app.use('/staking', staking_router)
app.use('/collateral', collateral_router);
app.use('/transaction', transaction_router);
app.use('/marketplace/vesting', vesting_marketplace_router)
app.use('/marketplace/nft', nft_marketplace_router)

app.listen(process.env.PORT || 3000 , () => {
    console.log(`🚀  Running on the ${3000 || process.env.PORT} port.`);
});