import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) {
    return "cargando";
  }

  return (
    <>
      {auth._id ? (
        <div className="bg-zinc-800 sm:min-h-screen">
          <Header />
          <div className="md:flex md:min-h-screen sm:min-h-screen h-100 min-h-screen">
            <Sidebar />
            <main className="p-10 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default RutaProtegida;
