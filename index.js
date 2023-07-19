const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const secretKey = "secretKey";
const users = [
    {
        "username": "Magib",
        "id": "1",
        "password": "123"
    },
    {
        "username": "Nouha",
        "id": "2",
        "password": "123"
    },
    {
        "username": "Moustapha",
        "id": "3",
        "password": "123"
    }
]

const tasks = [
    {
        "title": "Creer Login page",
        "description": "Creer une page de login",
        "statut": "TO DO",
        "id": "1",
        "assigner": "1"
    },
    {
        "title": "Creer Register page",
        "description": "Creer une page de register",
        "statut": "TO DO",
        "id": "4",
        "assigner": "2"
    }
]

app.post("/register", (req, res) => {
    users.push(req.body);
    res.send(req.body);
})

app.post("/login", (req, res) => {
    const data = req.body;
    const user = users.find((item) => item.username === data.username && item.password === data.password);
    if(!user) {
        res.status(404).send("Username or Password invalid")
    }
    const token = jwt.sign(user, secretKey, { expiresIn: '24h' });
    const userCopy = { ...user }
    delete userCopy.password;
    res.send({ token, user: userCopy });
})

authentification = (req, res, next) => {
    const token = req.headers.token;
    let decoded;
    try {
        decoded = jwt.verify(token, secretKey);
        req.user = decoded;
    } catch(error) {
        res.status(401).send("Token Invalid");
    }
    if(!token) {
        res.status(401).send("Not connected yet")
    }
    next();
}
app.use(authentification)

app.get("/users", (req, res) => {

    res.send(users.filter(item => item.id === req.user.id));
})

app.get("/", (req, res) => {
    res.send("Hello world")
});

app.get("/tasks", (req, res) => {
    res.send(tasks)
});
app.post("/tasks", (request, response) => {
    const data = request.body;
    tasks.push({ ...data, owner: request.user.id });
    response.send(data)

})

app.get("/tasks/:taskId", (request, response) => {
    const taskId = request.params.taskId;
    const task = tasks.find((item) => item.id === taskId);
    response.send(task)
});

app.put("/tasks/:taskId", (req, res) => {
    const data = req.body;
    const taskId = req.params.taskId;
    const taskIndex = tasks.findIndex((item) => item.id === taskId);
    tasks[taskIndex] = Object.assign(tasks[taskIndex], data);
    res.send(tasks[taskIndex]);
})


app.listen(3000, () => {
    console.log("App is listening on port 3000");
})