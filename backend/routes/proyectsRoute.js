const { Router } = require("express");
const {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarUnProyecto,
  agregarUnColaborador,
  eliminarColaborador,
  buscarColaborador,
} = require("../controllers/proyectsController");
const checkAuth = require("../middleware/checkAuth");

const proyectsRoute = Router();

proyectsRoute.get("/", checkAuth, obtenerProyectos);
proyectsRoute.post("/", checkAuth, nuevoProyecto);

proyectsRoute
  .route("/:id")
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarUnProyecto);

proyectsRoute.post("/colaboradores", checkAuth, buscarColaborador);
proyectsRoute.post("/colaboradores/:id", checkAuth, agregarUnColaborador);
proyectsRoute.post(
  "/eliminar-colaborador/:id",
  checkAuth,
  eliminarColaborador
);
module.exports = proyectsRoute;
