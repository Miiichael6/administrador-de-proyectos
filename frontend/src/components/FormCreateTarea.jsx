import { Field, Formik, Form, ErrorMessage } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";

const FormCreateTarea = () => {
  const { id } = useParams();
  const { submitTarea, tarea } = useProyectos();

  // useEffect(() => {

  // }, [tarea]);

  const validateInputs = (valores) => {
    const errores = {};

    const empty = Object.values(valores);
    const losValores = empty.map((value) => value.trim());

    if (losValores.includes("")) {
      errores.vacio = "ningun Campo puede quedar vacio";
    }

    return errores;
  };

  const handleFormik = async (valores, resetForm) => {
    await submitTarea(valores, resetForm, id, tarea._id);
  };

  const initialFormValues = {
    nombre: tarea.nombre || "",
    prioridad: tarea.prioridad || "",
    description: tarea.description || "",
    fecha_entrega: tarea.fecha_entrega?.slice(0, 10) || "",
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validate={(valores) => validateInputs(valores)}
      onSubmit={(valores, { resetForm }) => handleFormik(valores, resetForm)}
    >
      {({ errors }) => (
        <Form className="my-10">
          <div className="mb-5">
            <label htmlFor="nombre" className="text-gray-700 font-bold text-sm">
              Nombre de la Tarea
            </label>
            <Field
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre de la Tarea"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="text-gray-700 font-bold text-sm"
            >
              Descripción
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              placeholder="Descripcion...."
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md h-32 resize-none outline-none"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="fecha_entrega"
              className="text-gray-700 font-bold text-sm"
            >
              Fecha de Entrega
            </label>
            <Field
              type="date"
              id="fecha_entrega"
              name="fecha_entrega"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="prioridad"
              className="text-gray-700 font-bold text-sm"
            >
              Prioridad
            </label>
            <Field
              as="select"
              id="prioridad"
              name="prioridad"
              placeholder="Descripcion...."
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-center outline-none"
            >
              <option value="" disabled>
                ---Elige una prioridad---
              </option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </Field>
          </div>

          <button
            type="submit"
            className="block mx-auto p-2 bg-green-700 text-white rounded-lg"
          >
            Crear Tarea
          </button>

          <ErrorMessage
            component={() => (
              <span className="block text-red-700 mt-5">{errors.vacio}</span>
            )}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormCreateTarea;
