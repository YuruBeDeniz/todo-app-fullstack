const { createTask, getTasks, updateTask, getTask } = require("../controllers/task.controllers");

const router = require("express").Router();

router.post("/", createTask)

router.get("/", getTasks)

router.put("/:id", updateTask);

router.get("/task-details/:id", getTask);

module.exports = router;