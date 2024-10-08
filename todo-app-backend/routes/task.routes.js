const { createTask, getTasks, updateTask } = require("../controllers/task.controllers");

const router = require("express").Router();

router.post("/", createTask)

router.get("/", getTasks)

router.put("/:id", updateTask);

module.exports = router;