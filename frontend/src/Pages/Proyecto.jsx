import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import ModalFormTarea from "../context/ModalFormTarea";
import Tarea from "../components/Tarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import Colaborador from "../components/Colaborador";
import ModalButtonEliminarColaborador from "../components/ModalButtonEliminarColaborador";
import useAdmin from "../hooks/useAdmin";

const Proyecto = () => {
  const { id } = useParams();
  const admin = useAdmin()
  const {
    proyectDetail,
    obtenerProyectoPorId,
    cargando,
    handleModalTarea,
    globalMessage,
  } = useProyectos();

  useEffect(() => {
    obtenerProyectoPorId(id);

    return () => obtenerProyectoPorId();
  }, []);

  const { nombre } = proyectDetail;

  return (
    <>
      {globalMessage ? (
        <p className="text-3xl text-red-800">
          {globalMessage}. No puedes ver un proyecto que no es tuyo
        </p>
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className="text-4xl capitalize font-bold text-white">
              {nombre}
            </h1>

            {admin && <div className="flex items-center gap-2 text-white bg-slate-700 p-2 rounded-lg hover:bg-slate-900 transition-colors">
              <Link
                to={`/proyectos/editar/${id}`}
                className="font-bold flex gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                editar
              </Link>
            </div>}
          </div>

          {admin && <button
            onClick={handleModalTarea}
            type="button"
            className="px-5 py-3 w-full md:w-auto rounded-lg font-bold text-white text-center bg-black mt-5 flex gap-2 hover:bg-gray-600 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                className="w-6 h-6"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
              />
            </svg>
            Nueva tarea
          </button>}

          <p className="text-2xl font-bold mt-10 text-white">
            Tareas del Proyecto
          </p>

          <div className="bg- shadow mt-10 rounded-lg">
            {proyectDetail.tareas?.length ? (
              proyectDetail.tareas.map((tarea) => (
                <Tarea key={tarea._id} tarea={tarea} />
              ))
            ) : (
              <p className="text-xl my-5 p-10">No hay tareas Aún</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-10">
            <p className="text-3xl font-bold text-white">Colaboradores</p>
            {admin && <Link
              className="font-bold text-gray-500 hover:text-gray-600 text-lg"
              to={`/proyectos/nuevo-colaborador/${proyectDetail._id}`}
            >
              Añadir
            </Link>}
          </div>

          <div className="bg- shadow mt-10 rounded-lg">
            {proyectDetail.colaboradores?.length ? (
              proyectDetail.colaboradores.map((colaborador) => (
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              ))
            ) : (
              <p className="text-xl my-5 p-10 text-gray-500 text-center">
                No hay colaboradores en este Proyecto
              </p>
            )}
          </div>

          <ModalButtonEliminarColaborador />
          <ModalEliminarTarea />
          <ModalFormTarea />
        </>
      )}
    </>
  );
};

export default Proyecto;
