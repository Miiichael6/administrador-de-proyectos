import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Busqueda from "./Busqueda";

const Header = () => {
  const { handleBuscador } = useProyectos();
  const navigate = useNavigate();

  const logOutSession = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="px-4 py-5 bg-black">
      <div className="md:flex md:justify-between items-center">
        <h2 className="text-4xl font-bold text-green-600 text-center mb-4 md:mb-0">
          Amazing Proyects
        </h2>
        {/* <div>
          <input
            type="search"
            placeholder="Buscar Proyecto"
            className="rounded-lg lg:w-96 block py-2 px-2 border"
          />
        </div> */}

        <div className="flex clex-col md:flex-row items-center gap-4 mt-3">
          <button
            type="button"
            className="font-bold upercase bg-sky-500 p-2 rounded-xl text-white"
            onClick={() => handleBuscador()}
          >
            Buscar Proyecto
          </button>
          <Link
            to="/proyectos"
            className="font-bold p-2 bg-gray-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
          >
            Proyectos
          </Link>
          <button
            type="button"
            className="text-sm text-white p-2 bg-red-600 rounded-lg font-bold hover:bg-red-900 transition-colors"
            onClick={logOutSession}
          >
            Cerrar Sesion
          </button>
        </div>

        <Busqueda />
      </div>
    </header>
  );
};

export default Header;
