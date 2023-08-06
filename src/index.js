const express = require('express')
const app = express()
app.use(express.json());

require('dotenv').config()

const middleware = require('./middleware/middleware')
const utils_router = require('./routes/utils_routes')

app.use(middleware);
app.use('/utils', utils_router);

app.listen(process.env.PORT || 3000 , () => {
    console.log(`🚀  Running on the ${3000 || process.env.PORT} port.`);
});