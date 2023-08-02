const taskModel = require('./task.model');

async function findManyTasks() {
    return await taskModel.find();
}

module.exports = {
    findManyTasks
}