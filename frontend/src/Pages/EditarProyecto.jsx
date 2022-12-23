import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioProyecto from "../components/FormularioProyecto";
import useProyectos from "../hooks/useProyectos";

const EditarProyecto = () => {
  const { id } = useParams();
  const { proyectDetail, obtenerProyectoPorId, cargando } = useProyectos();
  const { nombre } = proyectDetail;

  useEffect(() => {
    obtenerProyectoPorId(id);
    return () => obtenerProyectoPorId();
  }, []);

  return cargando ? (
    "..."
  ) : (
    <div>
      <h1 className="text-4xl capitalize font-bold text-center text-stone-300">
        Editar Proyecto{" "}
        <span className="italic text-green-600">"{nombre}"</span>
      </h1>
      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </div>
  );
};

export default EditarProyecto;
