import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";

const ConfirmaCuenta = () => {
  const { id } = useParams();
  const [estado, setEstado] = useState(false);
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/api/users/confirmar/${id}`;
        const { data } = await axios.get(url);
        console.log(data);
        setEstado({
          msg: "cuenta verificada",
          error: false,
        });
        setCuentaConfirmada(true);
      } catch (error) {
        setCuentaConfirmada(false);
        setEstado({
          msg: "token invalido",
          error: true,
        });
        console.error(error.response.data);
      }
    };
    confirmarCuenta();
  }, []);

  const { msg } = estado;

  return (
    <>
      <h1 className="text-pink-600 font-sans text-center font-bold text-5xl">
        ¡Confirma Tu Cuenta!
      </h1>

      <div className="shadow-lg border-spacing-1 p-10 mt-10 rounded-xl">
        <div>{msg && <Alerta mensaje={estado} />}</div>

        {cuentaConfirmada && (
          <button className="mt-5 block mx-auto bg-black rounded-lg mt-none p-3">
            <Link className="text-center text-green-600 test-sm" to="/">
              Iniciar Sesion
            </Link>
          </button>
        )}
      </div>
    </>
  );
};

export default ConfirmaCuenta;
