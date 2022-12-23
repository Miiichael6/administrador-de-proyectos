import React from "react";
import useAdmin from "../hooks/useAdmin";
import useProyectos from "../hooks/useProyectos";

const Colaborador = ({ colaborador }) => {
  const admin = useAdmin()
  const { handleModalEliminarColaborador } = useProyectos();

  return (
    <div className="bg-white py-5 px-3 rounded-md font-bold flex justify-between items-center">
      <div>
        <p className="text-font text-xl">Nombre: {colaborador.nombre}</p>
        <p className="text-lg">Email: {colaborador.email}</p>
      </div>

      {admin && <div>
        <button
          className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-900"
          onClick={() => handleModalEliminarColaborador(colaborador)}
        >
          Eliminar
        </button>
      </div>}
    </div>
  );
};

export default Colaborador;
