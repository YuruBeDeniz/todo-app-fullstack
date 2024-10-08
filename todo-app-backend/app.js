require("dotenv/config");

require("./db");

const express = require("express");
const app = express();

require("./config")(app);

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const todoRoutes = require("./routes/todo.routes");
app.use("/api/todos", todoRoutes);

const taskRoutes = require("./routes/task.routes");
app.use("/api/tasks", taskRoutes);

module.exports = app;