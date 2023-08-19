const express = require('express')
const app = express()
app.use(express.json());

require('dotenv').config()

const middleware = require('./middleware/middleware')
const utils_router = require('./routes/utils_routes')
const staking_router = require('./routes/staking_routes')
const signing_router = require('./routes/signing_routes')

app.use(middleware);
app.use('/utils', utils_router);
app.use('/staking', staking_router)
app.use('/signing', signing_router)

app.listen(process.env.PORT || 3000 , () => {
    console.log(`🚀  Running on the ${3000 || process.env.PORT} port.`);
});