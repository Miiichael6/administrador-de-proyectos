import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// juanitoalcahofa12@gmail.com
// michael1212

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const { auth } = useAuth();

  const [proyectDetail, setProyectDetail] = useState({});
  const [proyectos, setProyectos] = useState([]);
  const [modalFormTarea, setModalFormTarea] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [tarea, setTarea] = useState({});
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  const [modalEliminarColaborador, setModalEliminarColaborador] =
    useState(false);
  const [colaborador, setColaborador] = useState({});
  const [globalMessage, setGlobalMessage] = useState("");
  const [buscador, setBuscador] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const obtenerProyectosDelUsuario = async () => {
      try {
        if (!token) {
          return;
        }

        const url = `/api/proyects`;
        const { data } = await axios.get(url, config);
        setProyectos(data);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerProyectosDelUsuario();
  }, [auth.email]);

  const submitProyecto = async (proyecto, resetForm, id) => {
    if (id) {
      //para editar un Proyecto
      try {
        const urlUpdate = `/api/proyects/${id}`;
        const { data } = await axios.put(urlUpdate, proyecto, config);
        console.log(data);

        const findTheUpdated = proyectos.map((proyecto) =>
          data._id === proyecto._id ? data : proyecto
        );
        setProyectos(findTheUpdated);
        navigate("/proyectos");
      } catch (error) {
        console.error(error);
        console.error(error.response);
        console.error(error.response.data);
      }
    } else {
      // para crear un proyecto
      try {
        if (!token) return;

        const { data } = await axios.post(`/api/proyects`, proyecto, config);

        setProyectos([...proyectos, data]);
      } catch (error) {
        console.error(error);
        console.error(error.response);
        console.error(error.response.data);
      }
      navigate("/proyectos");
    }
    resetForm();
  };

  const obtenerProyectoPorId = async (id) => {
    setGlobalMessage("");
    setCargando(true);
    if (id === undefined) {
      setProyectDetail({});
      return;
    }
    try {
      const urlProyect = `/api/proyects/${id}`;
      const { data: detailProyect } = await axios.get(urlProyect, config);

      setProyectDetail(detailProyect.proyecto);
    } catch (error) {
      setGlobalMessage(error.response.data.msg);
      console.error(error);
      console.error(error.response);
      console.error(error.response.data);
    } finally {
      setCargando(false);
    }
  };

  const deleteProyecto = async (id) => {
    try {
      const areYouSure = confirm(
        "estas seguro de querer eliminar el proyecto?"
      );
      if (areYouSure) {
        const { data } = await axios.delete(`/api/proyects/${id}`, config);
        const eliminatedProyect = proyectos.filter(
          (proyecto) => proyecto._id !== id
        );
        setProyectos(eliminatedProyect);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response.data);
    }
  };

  const handleModalTarea = () => {
    setTarea({});
    setModalFormTarea(!modalFormTarea);
  };

  const submitTarea = async (valores, resetForm, idProyecto, idTarea) => {
    console.log(valores);
    if (idTarea) {
      const { data } = await axios.put(
        `/api/tasks/${idTarea}`,
        valores,
        config
      );
      console.log(data);

      const dataUpdated = proyectDetail.tareas.map((tarea) =>
        tarea._id === idTarea ? data : tarea
      );
      const currentProyect = { ...proyectDetail, tareas: dataUpdated };
      setProyectDetail(currentProyect);
      resetForm();
      setModalFormTarea(false);
    } else if (idProyecto) {
      const dataToPost = {
        ...valores,
        proyecto: idProyecto,
      };
      try {
        const { data } = await axios.post("/api/tasks", dataToPost, config);
        const proyectoActualizado = {
          ...proyectDetail,
          tareas: [...proyectDetail.tareas, data],
        };

        setProyectDetail(proyectoActualizado);
        resetForm();
        setModalFormTarea(false);
      } catch (error) {
        console.log(error);
        console.log(error.response);
        console.log(error.response.data);
      }
    }
  };

  const handleEditarTarea = async (tarea) => {
    setTarea(tarea);
    setModalFormTarea(true);
    console.log(tarea);
  };

  const handleModalEliminarTarea = async (tarea) => {
    if (!tarea) setTarea({});
    else setTarea(tarea);
    setModalEliminarTarea(!modalEliminarTarea);
  };

  const handleEliminarTarea = async () => {
    try {
      const dataEliminated = await axios.delete(
        `/api/tasks/${tarea._id}`,
        config
      );

      const dataActulizada = {
        ...proyectDetail,
        tareas: proyectDetail.tareas.filter((i) => i._id !== tarea._id),
      };

      setProyectDetail(dataActulizada);
      setModalEliminarTarea(false);
      setTarea({});
    } catch (error) {
      console.error(error);
      console.error(error.response);
      console.error(error.response.data);
    }
  };

  const submitColaborador = async (email) => {
    setCargando(true);
    try {
      const { data } = await axios.post(
        `/api/proyects/colaboradores`,
        email,
        config
      );

      setColaborador(data);
    } catch (error) {
      setColaborador(error.response.data);
      setTimeout(() => {
        setColaborador({});
      }, 3000);
    } finally {
      setCargando(false);
    }
  };

  const agregarNuevoColaborador = async (email) => {
    try {
      const { data } = await axios.post(
        `/api/proyects/colaboradores/${proyectDetail._id}`,
        email,
        config
      );
      setGlobalMessage(data.msg);
      setTimeout(() => {
        setGlobalMessage("");
      }, 3000);
    } catch (error) {
      console.log(error.response);
      setGlobalMessage(error.response.data.msg);
      setTimeout(() => {
        setGlobalMessage("");
      }, 3000);
    }
  };

  const handleModalEliminarColaborador = (colaborador) => {
    console.log(colaborador);
    setModalEliminarColaborador(!modalEliminarColaborador);
    setColaborador(colaborador);
  };

  const eliminarColaborador = async () => {
    try {
      const eliminated = await axios.post(
        `/api/proyects/eliminar-colaborador/${proyectDetail._id}`,
        { id: colaborador._id },
        config
      );

      const colaboradorEliminado = {
        ...proyectDetail,
        colaboradores: proyectDetail.colaboradores.filter(
          (user) => user._id !== colaborador._id
        ),
      };

      setProyectDetail(colaboradorEliminado);
      setModalEliminarColaborador(false);
      console.log(eliminated);
    } catch (error) {
      console.log(error);
      console.error(error.response.data);
    }
  };

  const completarTarea = async (id) => {
    try {
      if (!token) return;

      const { data } = await axios.post(`/api/tasks/estado/${id}`, {}, config);

      const updatedProyect = {
        ...proyectDetail,
        tareas: proyectDetail.tareas.map((i) =>
          i._id === data._id ? data : i
        ),
      };
      setProyectDetail(updatedProyect);
    } catch (error) {
      console.log(error);
      console.error(error.response.data);
    }
  };

  const handleBuscador = () => {
    console.log("aqui")
    setBuscador(!buscador)
  }

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        submitProyecto,
        proyectDetail,
        cargando,
        obtenerProyectoPorId,
        deleteProyecto,
        handleModalTarea,
        modalFormTarea,
        submitTarea,
        handleEditarTarea,
        tarea,
        modalEliminarTarea,
        handleModalEliminarTarea,
        handleEliminarTarea,
        submitColaborador,
        colaborador,
        agregarNuevoColaborador,
        globalMessage,
        handleModalEliminarColaborador,
        modalEliminarColaborador,
        setModalEliminarColaborador,
        eliminarColaborador,
        completarTarea,
        handleBuscador,
        buscador
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
