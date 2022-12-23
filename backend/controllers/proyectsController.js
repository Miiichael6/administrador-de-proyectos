const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea");
const User = require("../models/Usuario");

const obtenerProyectos = async (req, res) => {
  console.log(req.usuario);
  try {
    const allProyects = await Proyecto.find({
      $or: [
        { creator: { $in: req.usuario } },
        { colaboradores: { $in: req.usuario } },
      ],
    }).select("-tareas");
    console.log(allProyects);

    return res.send(allProyects);
  } catch (error) {
    console.log({ msg: error.message });
  }
};

const nuevoProyecto = async (req, res) => {
  const data = req.body;

  const proyecto = await new Proyecto(data);
  proyecto.creator = req.usuario._id;

  try {
    const proyectoAlmacenado = await proyecto.save();
    return res.send(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }

  return res.send("aqui");
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;

  try {
    const proyecto = await Proyecto.findById(id)
      .populate({ path: "tareas", populate: { path: "completado", select: "nombre email" } })
      .populate("colaboradores", "nombre email _id");

    if (!proyecto) {
      const error = new Error("no se encontró el proyecto");
      return res.status(404).send({ msg: error.message });
    }

    if (
      proyecto.creator.toString() !== req.usuario._id.toString() &&
      !proyecto.colaboradores.some(
        (colaborador) =>
          colaborador._id.toString() === req.usuario._id.toString()
      )
    ) {
      const error = new Error("no te metas a robar , bobo");
      return res.status(401).send({ msg: error.message });
    }

    const tareas = await Tarea.find().where("proyecto").equals(proyecto._id);

    return res.send({
      proyecto,
      tareas,
    });
  } catch (error) {
    console.log(error);
  }
};

const editarProyecto = async (req, res) => {
  const { id } = req.params;
  const { nombre, cliente, description, fecha_entrega } = req.body;

  try {
    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
      const error = new Error("no se encontró el proyecto");
      return res.status(404).send({ msg: error.message });
    }

    if (proyecto.creator.toString() !== req.usuario._id.toString()) {
      const error = new Error("no te metas a molestar , bobo");
      return res.status(401).send({ msg: error.message });
    }

    proyecto.nombre = nombre || proyecto.nombre;
    proyecto.description = description || proyecto.description;
    proyecto.fecha_entrega = fecha_entrega || proyecto.fecha_entrega;
    proyecto.cliente = cliente || proyecto.cliente;

    try {
      const proyectoAlmacenado = await proyecto.save();
      return res.json(proyectoAlmacenado);
    } catch (error) {
      console.log(error.message);
    }

    return res.send(proyecto);
  } catch (error) {
    console.log(error);
  }
};

const eliminarUnProyecto = async (req, res) => {
  const { id } = req.params;

  try {
    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
      const error = new Error("no se encontró el proyecto");
      return res.status(404).send({ msg: error.message });
    }

    if (proyecto.creator.toString() !== req.usuario._id.toString()) {
      const error = new Error("no borres nada , bobo");
      return res.status(401).send({ msg: error.message });
    }

    try {
      await proyecto.deleteOne();
      return res.send({ msg: "elminiado correctamente" });
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const buscarColaborador = async (req, res) => {
  const { email } = req.body;

  try {
    const buscarUsuario = await User.findOne({ email }).select(
      "-confirmado -createdAt -updatedAt -password -token"
    );

    if (!buscarUsuario) {
      const error = new Error("no encontrado");
      return res.status(404).send({ msg: error.message });
    }

    return res.send(buscarUsuario);
  } catch (error) {
    console.error(error);
    console.error(error.response);
  }
};

const agregarUnColaborador = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
      const error = new Error("El proyecto no existe");
      return res.status(404).send({ msg: error.message });
    }

    if (proyecto.creator.toString() !== req.usuario._id.toString()) {
      const error = new Error("no valido , bobo");
      return res.status(401).send({ msg: error.message });
    }

    const usuario = await User.findOne({ email }).select(
      "-confirmado -createdAt -updatedAt -password -token"
    );

    if (!usuario) {
      const error = new Error("no encontrado");
      return res.status(404).send({ msg: error.message });
    }

    if (proyecto.creator.toString() === usuario._id.toString()) {
      const error = new Error("tu no puedes ser colaborador");
      return res.status(401).send({ msg: error.message });
    }
    if (proyecto.colaboradores.includes(usuario._id)) {
      const error = new Error("el usuario ya pertenece al proyecto");
      return res.status(401).send({ msg: error.message });
    }

    proyecto.colaboradores.push(usuario._id);
    await proyecto.save();

    return res.send({ msg: "agregado correctamente" });
  } catch (error) {
    console.log(error.response);
  }
};

const eliminarColaborador = async (req, res) => {
  const { id } = req.body;
  try {
    const proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      const error = new Error("El proyecto no existe");
      return res.status(404).send({ msg: error.message });
    }

    if (proyecto.creator.toString() !== req.usuario._id.toString()) {
      const error = new Error("no valido , bobo");
      return res.status(401).send({ msg: error.message });
    }

    proyecto.colaboradores.pull(id);
    await proyecto.save();

    return res.send({ msg: "eliminado correctamente" });
  } catch (error) {
    console.log(error.response);
  }
};

module.exports = {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarUnProyecto,
  agregarUnColaborador,
  buscarColaborador,
  eliminarColaborador,
};
