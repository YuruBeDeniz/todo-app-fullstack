const Todo = require("../models/Todo");

const createTodo = (req, res) => {
    const { title, completed } = req.body

    Todo.create({ title, completed })
     .then(createdTodo => {
        const { title, completed } = createdTodo;
        const todo = { _id: createdTodo._id, title, completed }
        //console.log("created todo in mongodb: ",todo)
        res.json(todo);
     })
     .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' })
     });
}

const getTodos = (req, res) => {
    Todo.find()
     .then(todos => {
        res.json(todos);
     })
     .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' })
     })
}

const updateTodo = (req, res) => {
    const { title, completed } = req.body;
    const { id } = req.params;  

    Todo.findByIdAndUpdate(id, { title, completed }, { new: true })
    .then(updatedTodo => {
        res.json(updatedTodo);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
}

module.exports = {
    createTodo,
    getTodos,
    updateTodo
};