const mongoose = require("mongoose");

const proyectoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      require: true,
    },
    description: {
      type: String,
      trim: true,
      require: true,
    },
    fecha_entrega: {
      type: Date,
      default: Date.now(),
    },
    cliente: {
      type: String,
      trim: true,
      require: true,
    },
    tareas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    colaboradores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Proyecto = new mongoose.model("Proyect", proyectoSchema);

module.exports = Proyecto;
