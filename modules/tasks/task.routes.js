const TaskController = require('./task.controller');
module.exports = function(app) {
    app.get("/tasks", TaskController.listTasks);
    app.post("/tasks", TaskController.createTask);
    
    app.get("/tasks/:taskId", TaskController.findTaskById);
    
    app.put("/tasks/:taskId", TaskController.updateTask);
}