const User = require("../models/Usuario");
const generarId = require("../helpers/generarId");
const generarJWT = require("../helpers/generarJWT");
const { emailRegistro, emailOlvidePassword } = require("../helpers/emails");

const users = async (req, res) => {
  try {
    const allUsers = await User.find();

    return res.send(allUsers);
  } catch (error) {
    console.log(error);
  }
};

const postUser = async (req, res) => {
  try {
    const data = req.body;
    const { email } = req.body;

    const existeUsuario = await User.findOne({ email });

    if (existeUsuario) {
      const error = new Error("Usuario ya Reistrado");
      return res.status(400).send({ msg: error.message });
    }

    const usuario = await User(data);
    usuario.token = generarId();
    const UserCreated = await usuario.save();

    emailRegistro({
      nombre: UserCreated.nombre,
      email: UserCreated.email,
      token: UserCreated.token,
    });

    return res.send(UserCreated);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // const updatedUser = await
    return res.send(id);
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await User.findOne({ email });
  if (!usuario) {
    const error = new Error("el Usuario no existe");
    return res.status(404).send({ msg: error.message });
  }

  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).send({ msg: error.message });
  }

  if (await usuario.comprobarPassword(password)) {
    const msg = "everything is fine";
    const allOK = {
      _id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    };
    return res.send({ msg, ...allOK });
  } else {
    return res.send({ msg: "incorrect" });
  }
};

const confirmarMyToken = async (req, res) => {
  try {
    const { token } = req.params;

    const usuarioConfirmar = await User.findOne({ token });

    if (!usuarioConfirmar) {
      const error = new Error("No válido");
      return res.status(403).send({ msg: error.message });
    }

    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();

    return res.send({ msg: "todo correcto", usuarioConfirmar });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToEliminate = User.find({ _id: id });

    if (userToEliminate.id) {
      await userToEliminate.deleteOne({ id: id });
      return res.send({ msg: "usuario eliminado correctamente" });
    }

    const error = new Error("el usuario a eliminar no existe");
    return res.status(403).send({ msg: error.message });
  } catch (error) {
    console.log(id);
  }
};
// nos quedamos en la clase 31 video 11 para verlo

const I_ForgotMyPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  const usuario = await User.findOne({ email });
  if (!usuario) {
    const error = new Error("email no existe");
    return res.status(400).send({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();

    emailOlvidePassword({
      nombre: usuario.nombre,
      email: usuario.email,
      token: usuario.token,
    });

    return res.send({
      msg: "te hemos enviado un email con las instrucciones",
      tokenID: usuario.token,
    });
  } catch (error) {
    console.log(error);
  }

  return res.send(existeUsuario);
};

const comprobarTokenContraseña = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await User.findOne({ token });

  if (tokenValido) {
    return res.send({ msg: "token valido" });
  } else {
    const error = new Error("token invalido");
    return res.status(404).send({ msg: error.message });
  }
};

const myNewPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const miUsuario = await User.findOne({ token });

  if (miUsuario) {
    try {
      miUsuario.password = password;
      miUsuario.token = "";
      await miUsuario.save();
      return res.send({ msg: "password modificado correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("No existe el token");
    return res.status(404).send({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;
  return res.send(usuario);
};

module.exports = {
  users,
  postUser,
  deleteUser,
  autenticar,
  confirmarMyToken,
  I_ForgotMyPassword,
  comprobarTokenContraseña,
  myNewPassword,
  perfil,
};
