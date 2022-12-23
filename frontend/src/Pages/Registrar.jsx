import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

const Registrar = () => {
  const [formEnviado, setFormEnviado] = useState(false);
  // const [registroForm, setRegistroForm] = useState({
  //   nombre: "",
  //   email: "",
  //   password: "",
  //   repetirPassword: "",
  // });
  // const { nombre, email, password, repetirPassword } = registroForm;
  const [alerta, setAlerta] = useState({});

  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setRegistroForm({
  //     ...registroForm,
  //     [name]: value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const withoutSpaces = Object.values(registroForm);

  //   if (withoutSpaces.includes("")) {
  //     setAlerta({
  //       error: true,
  //       msg: "todos los cambios son Obligatorios",
  //     });
  //     setTimeout(() => {
  //       setAlerta({});
  //     }, 3000);
  //     return;
  //   }
  // };

  const validateInputs = (valores) => {
    const errores = {};

    if (!valores.nombre) {
      errores.nombre = "Ingresa un Nombre";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
      errores.nombre = "El nombre solo puede contener letras o espacios";
    }
    if (!valores.email) {
      errores.email = "porfavor ingresa tu correo";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)
    ) {
      errores.email = "el email solo puede tener puntos letras numeros guiones";
    } else if (valores.password.length < 6) {
      errores.password = "min 8 max 6 numeros y letras";
    } else if (valores.password !== valores.repetirPassword) {
      errores.repetirPassword = "los passwords no coinciden";
    }
    return errores;
  };

  const handleFormik = async (valores, resetForm) => {
    const { email, nombre, password } = valores;
    try {
      // console.log(axios.defaults.baseURL)
      const { data } = await axios.post(`/api/users`, {
        email,
        nombre,
        password,
      });
      console.log(data)
      setFormEnviado(true);
      setTimeout(() => setFormEnviado(false), 5000);
      resetForm();
    } catch (error) {
      console.log(error.response)
      // setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  // const { msg } = alerta;

  return (
    <Formik
      initialValues={{
        nombre: "",
        email: "",
        password: "",
        repetirPassword: "",
      }}
      validate={(valores) => validateInputs(valores)}
      onSubmit={(valores, { resetForm }) => handleFormik(valores, resetForm)}
    >
      {({ handleChange, errors, handleSubmit, handleBlur, values }) => (
        <div>
          <h1 className="text-slate-900 font-sans font-bold text-5xl">
            Resgistrate y administra
          </h1>
          {/* {msg && <Alerta mensaje={alerta} />} */}
          <Form
            // onSubmit={handleSubmit}
            className="my-10 bg-white shadow px-10 py-5"
          >
            <div className="my-5 ">
              <label className="uppercase text-gray-700 text-xl font-bold block">
                nombre
              </label>
              <Field
                value={values.nombre}
                // onChange={handleChange}
                name="nombre"
                type="text"
                placeholder="nombre"
                className="w-full mt-3 p-2 border rounded outline-0"
                // onBlur={handleBlur}
              />
              <ErrorMessage
                name="nombre"
                component={() => (
                  <span className="text-center block text-red-600">
                    {errors.nombre}
                  </span>
                )}
              />
            </div>
            <div className="my-5 ">
              <label className="uppercase text-gray-700 text-xl font-bold block">
                Email
              </label>
              <Field
                value={values.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="email de Registro"
                className="w-full mt-3 p-2 border rounded outline-0"
                // onBlur={handleBlur}
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
            <div className="my-5 ">
              <label
                htmlFor="password"
                className="uppercase text-gray-700 text-xl font-bold block"
              >
                password
              </label>
              <Field
                id="password"
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="password"
                className="w-full mt-3 p-2 border rounded outline-0"
                // onBlur={handleBlur}
              />
              <ErrorMessage
                name="password"
                component={() => (
                  <span className="text-center block text-red-600">
                    {errors.password}
                  </span>
                )}
              />
            </div>
            <div className="my-5 ">
              <label
                htmlFor=""
                className="uppercase text-gray-700 text-xl font-bold block"
              >
                repite tu password
              </label>
              <Field
                value={values.repetirPassword}
                onChange={handleChange}
                name="repetirPassword"
                type="password"
                placeholder="repite tu password"
                className="w-full mt-3 p-2 border rounded outline-0"
                // onBlur={handleBlur}
              />
              <ErrorMessage
                name="repetirPassword"
                component={() => (
                  <span className="text-center block text-red-600">
                    {errors.repetirPassword}
                  </span>
                )}
              />
            </div>

            <button
              type="submit"
              className="block mx-auto bg-blue-500 p-2 text-white rounded hover:bg-slate-500 transition-colors"
            >
              crear cuenta
            </button>
            {formEnviado && (
              <span className="block text-center text-green-500 mt-5">
                enviado correctamente
              </span>
            )}
          </Form>

          <nav className="lg:flex lg:justify-between">
            <Link className="block text-center my-5 text-slate-500" to="/">
              ya tienes cuenta?
            </Link>
          </nav>
        </div>
      )}
    </Formik>
  );
};

export default Registrar;
