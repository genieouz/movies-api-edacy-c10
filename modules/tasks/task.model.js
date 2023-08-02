const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, default: "To Do" }
});
const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;