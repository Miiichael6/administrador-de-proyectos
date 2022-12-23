import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const NuevoPassword = () => {
  const [tokenValido, setTokenValido] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const { data } = await axios.get(`/api/users/forgot-password/${token}`);
        setTokenValido(true);
        console.log(data);
      } catch (error) {
        setTokenValido(false);
        console.log(error.response.data);
      }
    };
    comprobarToken();
  }, []);

  const validateInput = (valores) => {
    const errores = {};

    if (!valores.password) {
      errores.password = "el campo de password no puede quedar vacio";
    }

    return errores;
  };

  const handleFormik = async (valores, resetForm) => {
    const { password } = valores;

    try {
      const { data } = await axios.post(`/api/users/forgot-password/${token}`, {
        password,
      });
      console.log(data);
    } catch (error) {
      console.error(error.response.data);
    }

    resetForm();
  };

  return (
    <>
      <div>
        <h1 className="text-slate-900 font-sans font-bold text-5xl">
          escribe una nueva contraseña
        </h1>
      </div>
      {tokenValido ? (
        <Formik
          initialValues={{
            password: "",
          }}
          validate={(valores) => validateInput(valores)}
          onSubmit={(valores, { resetForm }) =>
            handleFormik(valores, resetForm)
          }
        >
          {({ handleChange, errors }) => (
            <div>
              <Form className="my-10 bg-white shadow px-10 py-5">
                <div className="my-5 ">
                  <label
                    htmlFor=""
                    className="uppercase text-gray-700 text-xl font-bold block"
                  >
                    new password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="escribe tu nueva contraseña"
                    className="w-full mt-3 p-2 border rounded outline-0"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="password"
                    component={() => (
                      <span className="block text-center text-red-500">
                        {errors.password}
                      </span>
                    )}
                  />
                </div>
                <button
                  type="submit"
                  className="block mx-auto bg-blue-500 p-2 text-white rounded hover:bg-slate-500 transition-colors"
                >
                  guardar cambios
                </button>
              </Form>

              <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500" to="/">
                  ya tienes cuenta?
                </Link>
              </nav>
            </div>
          )}
        </Formik>
      ) : (
        <div className="bg-red-900 text-center mt-5 p-4 rounded-xl">
          <p className="font-bold text-black">
            ningun token adquirido , no existe un token con el cual proceder la
            opacion de restablecimiento de contraseña
          </p>
          <Link to="/" className="text-white">volver a inicio</Link>
        </div>
      )}
    </>
  );
};

export default NuevoPassword;
