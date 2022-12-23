import React from "react";

const Alerta = ({ mensaje }) => {
  return (
    <div
      className={`${
        mensaje.error ? "from-red-400 to-red-600" : "from-sky-400 to-sky-600"
      } bg-gradient-to-br text-center p-3 rounded-xl text-white`}
    >
      {mensaje.msg}
    </div>
  );
};

export default Alerta;
