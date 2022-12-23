import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import useProyectos from "../hooks/useProyectos";

const FormularioColaborador = () => {
  const { submitColaborador } = useProyectos();

  const handleFormik = async (valores, resetForm) => {
    await submitColaborador(valores);
  };

  const handleValidate = (valores) => {
    const errores = {};

    if (valores.email === "") {
      errores.email = "no puede quedar vacio";
    }

    return errores;
  };

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validate={(valores) => handleValidate(valores)}
      onSubmit={(valores, { resetForm }) => handleFormik(valores, resetForm)}
    >
      {({ errors, handleChange }) => (
        <Form className="py-10 px-5 md:w-10/12 bg-zinc-700 rounded-lg shadow-slate-50 w-10/12 lg:w-8/12">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white capitalize text-lg">
              email del colaborador:
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="Busca un email"
              className="p-2 rounded-lg outline-none w-full"
              onChange={handleChange}
            />
            <ErrorMessage
              name="email"
              component={() => (
                <span className="block text-center text-red-600 italic">
                  {errors.email}
                </span>
              )}
            />
            <button
              type="submit"
              className="bg-sky-700 text-white rounded-md font-bold py-2"
            >
              Buscar Colaborador
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioColaborador;
