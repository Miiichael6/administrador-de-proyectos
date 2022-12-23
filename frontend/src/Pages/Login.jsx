import axios from "axios";
import { ErrorMessage, Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [globalMessage, setGlobalMessage] = useState("");

  const { setAuth } = useAuth();

  const validateInputs = (valores) => {
    const errores = {};

    if (!valores.email) {
      errores.email = "porfavor ingresa tu correo";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)
    ) {
      errores.email = "el email solo puede tener puntos letras numeros guiones";
    } else if (valores.password.length < 6) {
      errores.password = "min 8 max 6 numeros y letras";
    } else if (!valores.password.trim()) {
      errores.password = "ingrese una contraseña porfavor";
    }

    return errores;
  };

  const handleFormik = async (valores, resetForm) => {
    const { email, password } = valores;
    try {
      const { data } = await axios.post(`/api/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      console.log(data);
    } catch (error) {
      setGlobalMessage(error.response.data.msg);
      setTimeout(() => setGlobalMessage(""), 4000);
    }
    resetForm();
  };

  return (
    <>
      <h1 className="text-slate-900 font-sans font-bold text-5xl">
        Inicia Sesion y Administra
      </h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(valores) => validateInputs(valores)}
        onSubmit={(valores, { resetForm }) => handleFormik(valores, resetForm)}
      >
        {({ handleChange, values, errors }) => (
          <Form className="my-10 bg-white shadow px-10 py-5">
            <div className="my-5 ">
              <label
                htmlFor="email"
                className="uppercase text-gray-700 text-xl font-bold block"
              >
                Email
              </label>
              <Field
                value={values.email}
                id="email"
                name="email"
                type="email"
                placeholder="email de Registro"
                className="w-full mt-3 p-2 border rounded outline-0"
                onChange={handleChange}
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <span className="text-red-700">{errors.email}</span>
                )}
              />
            </div>
            <div className="my-5 ">
              <label
                htmlFor="password"
                className="uppercase text-gray-700 text-xl font-bold block"
              >
                password
              </label>
              <Field
                value={values.password}
                id="password"
                name="password"
                type="password"
                placeholder="password"
                className="w-full mt-3 p-2 border rounded outline-0"
                onChange={handleChange}
              />
              <ErrorMessage
                name="password"
                component={() => (
                  <span className="text-red-700">{errors.password}</span>
                )}
              />
            </div>

            <button
              type="submit"
              className="block mx-auto bg-blue-500 p-2 text-white rounded hover:bg-slate-500 transition-colors"
            >
              Iniciar Sesion
            </button>
            <div className="mt-5 text-center text-red-600">
              <p>{globalMessage}</p>
            </div>
          </Form>
        )}
      </Formik>

      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500" to="/registrar">
          aun sin cuenta? ¡Registrate!
        </Link>
        <Link
          className="block text-center my-5 text-slate-500"
          to="/olvide-password"
        >
          Olvidé mi Contraseña
        </Link>
      </nav>
    </>
  );
};

export default Login;
