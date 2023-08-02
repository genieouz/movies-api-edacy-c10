const jwt = require('jsonwebtoken');
const secretKey = "secretKey";
const users = [
    {
        username: "Magib",
        password: "123",
        id: "1"
    }
]

function login(req, res) {
    const data = req.body;
    const user = users.find((item) => item.username === data.username && item.password === data.password);
    if(!user) {
        res.status(404).send("Username or Password invalid")
    }
    const token = jwt.sign(user, secretKey, { expiresIn: '24h' });
    const userCopy = { ...user }
    delete userCopy.password;
    res.send({ token, user: userCopy });
}
function register(req, res) {
    users.push(req.body);
    res.send(req.body);
}
module.exports = {
    login,
    register
}