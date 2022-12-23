import React from "react";
import PreviewProyecto from "../components/PreviewProyecto";
import useProyectos from "../hooks/useProyectos";

const Proyectos = () => {
  const { proyectos, deleteProyecto } = useProyectos();
  // console.log(proyectos);

  return (
    <>
      <h1 className="text-5xl font-semibold text-zinc-300">Proyectos</h1>

      <div className="bg-neutral-900 shadow mt-10 rounded-lg p-5">
        {proyectos.length ? (
          proyectos.map((proyecto, index, array) => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto}
              length={array.length - 1}
              index={index}
              deleteProyecto={deleteProyecto}
            />
          ))
        ) : (
          <p className="text-lg text-gray-200 text-center font-bold">
            No hay Proyectos todavia
          </p>
        )}
      </div>
    </>
  );
};

export default Proyectos;
