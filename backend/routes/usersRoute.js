const { Router } = require("express");
const {
  users,
  postUser,
  autenticar,
  confirmarMyToken,
  deleteUser,
  I_ForgotMyPassword,
  comprobarTokenContrase├▒a,
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
// usersRouter.get("/forgot-password/:token", comprobarTokenContrase├▒a);
// usersRouter.post("/forgot-password/:token", myNewPassword);

// para rutas con mismo nombre
usersRouter
  .route("/forgot-password/:token")
  .get(comprobarTokenContrase├▒a)
  .post(myNewPassword);

usersRouter.get("/perfil", checkAuth, perfil)

module.exports = usersRouter;
