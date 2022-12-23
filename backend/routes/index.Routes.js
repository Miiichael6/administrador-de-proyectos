const { Router } = require("express");
const usersRouter = require("./usersRoute");
const proyectsRoute = require("./proyectsRoute");
const tasksRoute = require("./tasksRoute");

const indexRouter = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/proyects", proyectsRoute);
indexRouter.use("/tasks", tasksRoute);

module.exports = indexRouter;
