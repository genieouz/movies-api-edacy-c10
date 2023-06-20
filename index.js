const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const tasks = []
app.get("/", (req, res) => {
    res.send("Hello world")
});

app.get("/tasks", (req, res) => {
    res.send(tasks)
});
app.post("/tasks", (req, res) => {
    const taskValue = req.body;
    taskValue.id = parseInt(taskValue.id)
    tasks.push(taskValue);
    res.send(taskValue)

})

app.get("/tasks/:taskId", (request, response) => {
    const taskId = request.params.taskId;
    const task = tasks.find((item) => item.id === parseInt(taskId));
    response.send(task)
});


app.listen(3000, () => {
    console.log("App is listening on port 3000");
})