const jwt = require("jsonwebtoken");
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    console.log(req)
    console.log(req)
    if (!token) {
        return res.json({Error: 'You are not authenticated'})
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) {
                return res.json({Error: 'Token is not matched'})
            } else {
                req.name = decoded.name
                next()
            }
        })
    }
}
module.exports = verifyUser;