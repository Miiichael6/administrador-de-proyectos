const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      require: true, // obligatorio
      trim: true, // sin espacios en inicio ni final
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    token: String,
    confirmado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// se usa function(){...} porque this funciona diferente en arrow
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  // dice que no lo necesita await pero en realidad si
  // sino no lo hashea
  this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

const User = new mongoose.model("Users", usuarioSchema);

module.exports = User;
