const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    completed: { 
        type: Boolean, 
    }
});

const Task = model("Task", taskSchema);

module.exports = Task;