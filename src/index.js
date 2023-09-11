const express = require('express')
const app = express()
app.use(express.json());

require('dotenv').config()

const middleware = require('./middleware/middleware')
const signing_staking_router = require('./routes/staking_routes')

app.use(middleware);
app.use('/signing/staking', signing_staking_router)

app.listen(process.env.PORT || 3000 , () => {
    console.log(`🚀  Running on the ${3000 || process.env.PORT} port.`);
});