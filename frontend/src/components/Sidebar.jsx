import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-72 lg:w-96 xl:w-1/6 px-5 py-10 bg-zinc-900">
      <p className="text-xl font-bold text-white underline">
        Hola {auth.nombre}
      </p>
      <Link
        to="crear-proyecto"
        className="bg-zinc-800 text-white font-bold block p-3 rounded-lg mt-5 text-center"
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
