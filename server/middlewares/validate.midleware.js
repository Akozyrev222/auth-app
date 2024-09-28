const User = require("../models/user.module");
const jwt = require("jsonwebtoken");


const validateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.json({Error: 'You are not authenticated'})
    } else {
        jwt.verify(token, 'jwt-secret-key', async (err, decoded) => {
            if (err) {
                res.json({Error: 'Token is not matched'})
            } else {
                req.email = decoded.email
                const user = await User.findOne({email: decoded.email})
                if (user && !user.disable) {
                    next()
                } else {
                    res.json({Error: 'You user blocked or logout'})
                }
            }
        })
    }
}
module.exports = {
    validateUser
}