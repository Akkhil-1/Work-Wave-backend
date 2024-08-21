const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function userLogin(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        console.error('Authorization header is missing');
        return res.status(403).json({
            msg: "Authorization header is missing"
        });
    }

    const jwtToken = authorizationHeader.split(" ")[1];

    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        if (decodedValue.username) {
            req.user = decodedValue;
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            });
        }
    } catch (error) {
        console.error('Invalid token:', error);
        res.status(403).json({
            msg: "Invalid token"
        });
    }
}

module.exports = userLogin;
