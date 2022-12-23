const { Router } = require("express");
const {
  users,
  postUser,
  autenticar,
  confirmarMyToken,
  deleteUser,
  I_ForgotMyPassword,
  comprobarTokenContraseña,
  myNewPassword,
  perfil
} = require("../controllers/usersController");
const checkAuth = require("../middleware/checkAuth")

const usersRouter = Router();

// /api/users/...
usersRouter.get("/", users);
usersRouter.post("/", postUser);
usersRouter.post("/login", autenticar);
usersRouter.get("/confirmar/:token", confirmarMyToken);
usersRouter.delete("/:id", deleteUser);
usersRouter.post("/forgot-password", I_ForgotMyPassword);
// usersRouter.get("/forgot-password/:token", comprobarTokenContraseña);
// usersRouter.post("/forgot-password/:token", myNewPassword);

// para rutas con mismo nombre
usersRouter
  .route("/forgot-password/:token")
  .get(comprobarTokenContraseña)
  .post(myNewPassword);

usersRouter.get("/perfil", checkAuth, perfil)

module.exports = usersRouter;
