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
    console.log(req.body)
    const { title, completed } = req.body;
    const { id } = req.params;  

    Task.findByIdAndUpdate(id, { title, completed }, { new: true })
    .then(updatedTask => {
        console.log("updatedTask: ", updatedTask)
        res.json(updatedTask);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
}

const getTask = (req, res) => {
    const { id } = req.params;
    
    Task.findById(id)
      .then(taskFromDb => {
        if(!taskFromDb) {
            console.log(taskFromDb);
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(taskFromDb);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
}

const deleteTask = (req, res) => {
    const { id } = req.params;
    Task.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "Task deleted" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
}

module.exports = {
    createTask,
    getTasks,
    updateTask, 
    getTask,
    deleteTask
};