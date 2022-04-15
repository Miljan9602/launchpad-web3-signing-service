const express = require('express')
const router = express.Router()

// Middleware to confirm auth key.
router.use(function (req, res, next) {
    //
    // const bearerHeader = req.header('Authorization')
    // const authKey = process.env.AUTH_KEY
    //
    // if (typeof bearerHeader === 'string' && bearerHeader.startsWith("Bearer ")) {
    //
    //     // Extract bearer token.
    //     const bearerToken = bearerHeader.substring(7, bearerHeader.length);
    //
    //     if (bearerToken === authKey)
    //         return next()
    // }
    //
    // return res.status(401).json({
    //     "status" : "fail",
    //     "error" : {
    //         "message" : "User not authorized to perform request.",
    //         "code" : 401,
    //         "type" : "unauthorized"
    //     }
    // });
    return next()
})

module.exports = router