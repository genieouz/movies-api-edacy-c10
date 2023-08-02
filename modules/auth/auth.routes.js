const AuthController = require('./auth.controller');
module.exports = function (app) {
    app.post("/login", AuthController.login);
    app.post("/register", AuthController.register);
}
