const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea");

const agregarTarea = async (req, res) => {
  const { proyecto } = req.body;
  const data = req.body;

  const existeProyecto = await Proyecto.findById(proyecto);

  if (!existeProyecto) {
    const error = new Error("El Proyecto no existe");
    return res.status(404).send({ msg: error.message });
  }

  if (existeProyecto.creator.toString() !== req.usuario._id.toString()) {
    const error = new Error("no tienes permisos para añadir tareas");
    return res.status(404).send({ msg: error.message });
  }

  try {
    const nuevaTarea = await Tarea.create(data);
    // alacenar el ID de la tarea en el proyecto 
    existeProyecto.tareas.push(nuevaTarea._id);
    // guardar los cambios en la base de datos 
    // Ahora el Proyecto tiene el uid de la tarea recientemente creada en
    // su array "tareas"
    await existeProyecto.save(); // guardado correctamente

    return res.send(nuevaTarea);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("no Existe La tarea");
    return res.status(404).send({ msg: error.message });
  }

  if (tarea.proyecto.creator.toString() !== req.usuario._id.toString()) {
    const error = new Error("Action no Permitida");
    return res.status(403).send({ msg: error.message });
  }

  return res.send(tarea);
};

const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("no Existe La tarea");
    return res.status(404).send({ msg: error.message });
  }
  // verificar si el usuario que se registró es el mismo que 
  // está eliminando la tarea
  if (tarea.proyecto.creator.toString() !== req.usuario._id.toString()) {
    const error = new Error("Action no Permitida");
    return res.status(403).send({ msg: error.message });
  }

  tarea.nombre = data.nombre || tarea.nombre;
  tarea.description = data.description || tarea.description;
  tarea.prioridad = data.prioridad || tarea.prioridad;
  tarea.fecha_entrega = data.fecha_entrega || tarea.fecha_entrega;

  try {
    const tareaAlmacenada = await tarea.save();
    return res.send(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};
const eliminarTarea = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await Tarea.findById(id).populate("proyecto");

    if (!tarea) {
      const error = new Error("no Existe La tarea");
      return res.status(404).send({ msg: error.message });
    }
    // verificar autenticación
    if (tarea.proyecto.creator.toString() !== req.usuario._id.toString()) {
      const error = new Error("Action no Permitida");
      return res.status(403).send({ msg: error.message });
    }

    // buscar proyecto mediante referencia del tarea y id del proyecto
    //  al que pertenece la tarea
    const proyecto = await Proyecto.findById(tarea.proyecto._id);

    // eliminando el uid de la tarea del array de tareas del modelo proyecto
    proyecto.tareas.pull(tarea._id);

    // guardando datos en la base de datos y eliminando la tarea a la vez
    await Promise.allSettled([await proyecto.save(), await tarea.deleteOne()]);
    return res.send({ msg: "Tarea eliminada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const cambiarEstado = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("no Existe La tarea");
    return res.status(404).send({ msg: error.message });
  }


  if (
    tarea.proyecto.creator.toString() !== req.usuario._id.toString() &&
    !tarea.proyecto.colaboradores.some(
      (colaborador) => colaborador._id.toString() === req.usuario._id.toString()
    )
  ) {
    const error = new Error("accion no Valida");
    return res.status(401).send({ msg: error.message });
  }

  tarea.estado = !tarea.estado;
  tarea.completado = req.usuario._id;
  await tarea.save();

  const tareaAlmacenada = await Tarea.findById(id)
    .populate("proyecto")
    .populate("completado");

  return res.send(tareaAlmacenada);
};

module.exports = {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
