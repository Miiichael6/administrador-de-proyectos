import React from "react";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";

const OlvidePassword = () => {
  const validateInputs = (valores) => {
    const emailTest = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const errores = {};

    if (!valores.email) {
      errores.email = "el campo de email no puede quedar vacio";
    } else if (!emailTest.test(valores.email)) {
      errores.email = "email incorrecto";
    }

    return errores;
  };

  const handleFormik = async (valores, resetForm) => {
    const { email } = valores;

    try {
      const { data } = await axios.post(`/api/users/forgot-password`, {
        email,
      });
      console.log(data);
    } catch (error) {
      console.error(error.response.data);
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validate={(valores) => validateInputs(valores)}
      onSubmit={(valores, { resetForm }) => handleFormik(valores, resetForm)}
    >
      {({ handleChange, values, errors }) => (
        <div>
          <h1 className="text-slate-900 text-center font-sans font-bold text-5xl">
            Olvidé mi contraseña
          </h1>
          <Form className="my-10 bg-white shadow px-10 py-5">
            <div className="my-5 ">
              <label
                htmlFor="email"
                className="uppercase text-gray-700 text-xl font-bold block"
              >
                Email
              </label>
              <Field
                id="email"
                type="email"
                name="email"
                placeholder="email de Registro"
                className="w-full mt-3 p-2 border rounded outline-0"
                value={values.email}
                onChange={handleChange}
                autoComplete="off"
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <span className="text-center block text-red-600">
                    {errors.email}
                  </span>
                )}
              />
            </div>

            <button
              type="submit"
              className="block mx-auto bg-blue-500 p-2 text-white rounded hover:bg-slate-500 transition-colors"
            >
              enviame un email
            </button>
          </Form>

          <nav className="lg:flex lg:justify-between">
            <Link className="block text-center my-5 text-slate-500" to="/">
              volver
            </Link>
          </nav>
        </div>
      )}
    </Formik>
  );
};

export default OlvidePassword;
