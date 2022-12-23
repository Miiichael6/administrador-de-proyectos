import React from "react";
import formatearFecha from "../helpers/formatearFecha";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import useProyectos from "../hooks/useProyectos";

const Tarea = ({ tarea }) => {
  const { handleEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();
  const { description, nombre, fecha_entrega, _id, estado, prioridad } = tarea;
  const admin = useAdmin();
  console.log(tarea)

  return (
    <div className="rounded-md bg-zinc-900 p-5 flex justify-between items-center mb-4">
      <div className="flex flex-col items-start">
        <p className="text-2xl mb-2 text-white font-bold">{nombre}</p>
        <p className="text-md mb-2 text-white">{description}</p>
        <p className="text-md mb-2 text-white">
          {formatearFecha(fecha_entrega)}
        </p>
        <p className="text-md mb-2 text-white">Prioridad: {prioridad}</p>
        {estado && <p className="text-amber-300">completado por <span className="capitalize underline">{tarea.completado.nombre}</span></p>}
      </div>
      <div className="flex gap-4 flex-col lg:flex-row">
        {admin && (
          <button
            onClick={() => handleEditarTarea(tarea)}
            className="bg-sky-500 p-2 rounded-lg text-white font-bold"
          >
            Editar
          </button>
        )}

        <button
          className={`${
            estado ? "bg-green-500" : "bg-gray-600"
          } p-2 rounded-lg text-white font-bold`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? "Completo" : "Incompleto"}
        </button>

        {admin && (
          <button
            className="bg-red-700 p-2 rounded-lg text-white font-bold"
            onClick={() => handleModalEliminarTarea(tarea)}
          >
            eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
