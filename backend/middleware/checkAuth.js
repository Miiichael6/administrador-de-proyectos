const jwt = require("jsonwebtoken");
const User = require("../models/Usuario");
// verificar usuario
const checkAuth = async (req, res, next) => {
  let token;
  const myHeader = req.headers.authorization;
  if (myHeader && myHeader.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded, "usuario registrado");
      req.usuario = await User.findById(decoded.id).select(
        `-password
        -confirmado
        -token
        -createdAt
        -updatedAt`
      );

      return next();
    } catch (error) {
      return res.status(404).send({ msg: error.message });
    }
  }

  if (!token) {
    const error = new Error("token no valido");
    return res.status(404).send({ msg: error.message });
  }
  next();
};

module.exports = checkAuth;
