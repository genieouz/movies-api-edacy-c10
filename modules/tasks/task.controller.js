const taskModel = require('./task.model');
const TaskService = require('./task.service');

async function listTasks(req, res) {
    const taskList = await TaskService.findManyTasks();
    res.send(taskList)
}

async function createTask(request, response) {
    const data = request.body;
    await taskModel.create({ ...data, owner: request.user.id });
    response.send(data)
}

async function findTaskById(request, response) {
    const taskId = request.params.taskId;
    const task = await taskModel.findById(taskId);
    response.send(task)
}

async function updateTask(req, res) {
    const data = req.body;
    const taskId = req.params.taskId;
    const result = await taskModel.updateOne({ _id: taskId }, data)
    res.send(result);
}

module.exports = {
    listTasks,
    createTask,
    findTaskById,
    updateTask
}