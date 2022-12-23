import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";

const FormularioProyecto = () => {
  const { id } = useParams();
  const { submitProyecto, proyectDetail } = useProyectos();

  const validateInputs = (valores) => {
    const errores = {};

    if (Object.values(valores).includes("")) {
      errores.global = "Ningun Campo puede quedar Vacio";
    }

    return errores;
  };

  const form = {
    nombre: proyectDetail.nombre || "",
    description: proyectDetail.description || "",
    fecha_entrega: proyectDetail.fecha_entrega?.slice(0, 10) || "",
    cliente: proyectDetail.cliente || "",
  };

  return (
    <Formik
      initialValues={form}
      validate={(valores) => validateInputs(valores)}
      onSubmit={(valores, { resetForm }) => submitProyecto(valores, resetForm, id)}
    >
      {({ errors, values }) => (
        <Form className="bg-white py-10 px-5 md:w-1/2 rounded-lg">
          <div className="mb-5">
            <label htmlFor="nombre" className="ext-gray-700 font-bold text-sm">
              Nombre
            </label>

            <Field
              value={values.nombre}
              id="nombre"
              name="nombre"
              type="text"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Nombre Proyecto"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="ext-gray-700 font-bold text-sm"
            >
              description
            </label>

            <Field
              value={values.description}
              id="description"
              name="description"
              as="textarea"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-none"
              placeholder="description del Proyecto"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="fecha-entrega"
              className="ext-gray-700 font-bold text-sm"
            >
              Fecha de Entrega
            </label>

            <Field
              value={values.fecha_entrega}
              id="fecha-entrega"
              name="fecha_entrega"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Nombre Proyecto"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="cliente" className="ext-gray-700 font-bold text-sm">
              cliente
            </label>

            <Field
              value={values.cliente}
              id="cliente"
              name="cliente"
              type="text"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Nombre Proyecto"
            />

            <ErrorMessage
              // name="global"
              component={() => (
                <span className="block text-center text-red-700 my-3 font-bold">
                  {errors.global}
                </span>
              )}
            />

            <button
              type="submit"
              className="block mt-2 mx-auto bg-zinc-900 text-center text-white p-3 rounded-lg font-bold cursor-pointer hover:bg-zinc-800 transition-colors"
            >
              {id ? "Editar proyecto" : "Crear Proyecto"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioProyecto;
