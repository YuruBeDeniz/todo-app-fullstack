const Task = require("../models/Task");

const createTask = (req, res) => {
    const { title, completed } = req.body

    Task.create({ title, completed })
     .then(createdTask => {
        const { title, completed } = createdTask;
        const task = { _id: createdTask._id, title, completed }

        res.json(task);
     })
     .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' })
     });
}

const getTasks = (req, res) => {
    Task.find()
     .then(tasks => {
        res.json(tasks);
     })
     .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' })
     })
}

const updateTask = (req, res) => {
    const { title, completed } = req.body;
    const { id } = req.params;  

    Task.findByIdAndUpdate(id, { title, completed }, { new: true })
    .then(updatedTask => {
        res.json(updatedTask);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
}

module.exports = {
    createTask,
    getTasks,
    updateTask
};