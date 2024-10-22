const { createTask, getTasks, updateTask, getTask, deleteTask } = require("../controllers/task.controllers");

const router = require("express").Router();

router.post("/", createTask)

router.get("/", getTasks)

router.put("/:id", updateTask);

router.get("/task-details/:id", getTask);

router.delete("/:id", deleteTask);

module.exports = router;