const { Router } = require("express");
const checkOut = require("../middleware/checkAuth");
const {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
} = require("../controllers/tasksController");

const tasksRouter = Router();

tasksRouter.post("/", checkOut, agregarTarea);
tasksRouter
  .route("/:id")
  .get(checkOut, obtenerTarea)
  .put(checkOut, actualizarTarea)
  .delete(checkOut, eliminarTarea);

tasksRouter.post("/estado/:id", checkOut, cambiarEstado);

module.exports = tasksRouter;
