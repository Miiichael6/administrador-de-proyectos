const mongoose = require("mongoose");

const tareaSchema = mongoose.Schema(
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
    estado: {
      type: Boolean,
      default: false,
    },
    fecha_entrega: {
      type: Date,
      require: true,
      default: Date.now(),
    },
    prioridad: {
      type: String,
      require: true,
      enum: ["Baja", "Media", "Alta"],
    },
    proyecto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proyect",
    },
    completado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Tarea = new mongoose.model("Task", tareaSchema);

module.exports = Tarea;
