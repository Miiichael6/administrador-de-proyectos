require("dotenv").config();
const nodemailer = require("nodemailer");
const { EMAIL_HOST, EMAIL_USER, EMAIL_PASS, EMAIL_PORT, FRONTEND_URL } =
  process.env;

// // console.log(process.env.FRONTEND_URL)
// console.log({ EMAIL_HOST, EMAIL_USER, EMAIL_PASS, EMAIL_PORT,FRONTEND_URL})

const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "uptdask - administrador de proyectos <proyectsadmin@gmail.com>",
    to: email,
    subject: "Uptask - Confirma tu cuenta!",
    text: "es Hora de confirmar tu cuenta adelante :)",
    html: `
    <p>Hola ${nombre} Comprueba tu cuenta, tu cuenta ya está casi lista solo veifica que eres tú quien la creó</p>
    <a href="${FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>

    <p>Si no operaste puedes ningun registro ignorar este mensaje</p>
    `,
  });
};

const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "uptdask - administrador de proyectos <proyectsadmin@gmail.com>",
    to: email,
    subject: "Uptask - reestablece tu password!",
    text: "Hola esmomento de restablecer tu contraseña",
    html: `
    <p>Hola ${nombre} es hora de restablecer tu contraseña , enviaste un email para restablecerlo, es hora de restablecer tu cuenta !</p>
    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">restablecer Contraseña</a>

    <p>Si no operaste este email puedes ningun registro ignorar este mensaje</p>
    `,
  });
};

module.exports = { emailRegistro, emailOlvidePassword };

// 34 / tema 18 . ver tema de confirmacion de cuenta
