const jwt = require('jsonwebtoken');
const secretKey = "secretKey";

function authGuard(app) {
    authentification = (req, res, next) => {
        const token = req.headers.token;
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
            req.user = decoded;
            next();
        } catch(error) {
            console.log(error)
            res.status(401).send("Token Invalid");
        }
    }
    app.use(authentification)
}

module.exports = authGuard;