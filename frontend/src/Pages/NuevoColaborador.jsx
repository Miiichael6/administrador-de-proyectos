import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../hooks/useProyectos";

const NuevoColaborador = () => {
  const { id } = useParams();

  const {
    obtenerProyectoPorId,
    proyectDetail,
    colaborador,
    cargando,
    agregarNuevoColaborador,
    globalMessage,
  } = useProyectos();

  useEffect(() => {
    obtenerProyectoPorId(id);
  }, []);

  if (!proyectDetail._id) return "Error";

  return (
    <>
      <h1 className="text-4xl text-white font-bold">
        Agregar Colaborador para '{proyectDetail.nombre}'
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

      {globalMessage && (
        <p className="text-white block text-center">{globalMessage}</p>
      )}

      <div>
        {!cargando ? (
          colaborador._id ? (
            <div className="flex flex-col justify-between mt-10 bg-slate-100 py-7 px-5 rounded-md md:flex-row md:items-center gap-5">
              <div>

              <h2 className="text-2xl text-center font-black mb-4">
                Resultado
              </h2>
              <p>
                <span className="font-bold">Nombre:</span> {colaborador.nombre}
              </p>
              <p>
                <span className="font-bold">Email:</span> {colaborador.email}
              </p>
              </div>
              <button
                className="bg-green-700 p-2 rounded mt-4 text-white font-extrabold block md:w-4/12  hover:bg-green-600"
                onClick={() =>
                  agregarNuevoColaborador({ email: colaborador.email })
                }
              >
                Agregar como Colaborador
              </button>
            </div>
          ) : (
            colaborador.msg && (
              <div className="mt-10 bg-red-300 px-5 py-5 text-center text-xl capitalize rounded-lg ">
                <p>{colaborador.msg}</p>
              </div>
            )
          )
        ) : (
          <div>cargando...</div>
        )}
      </div>
    </>
  );
};

export default NuevoColaborador;
