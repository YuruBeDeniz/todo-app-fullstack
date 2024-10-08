const { createTodo, getTodos, updateTodo } = require("../controllers/todo.controllers");

const router = require("express").Router();

router.post("/", createTodo)

router.get("/", getTodos)

router.put("/:id", updateTodo);

module.exports = router;