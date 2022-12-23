import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const current = window.location.pathname;
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get(`/api/users/perfil`, config);
        setAuth(data);

        if (current !== "/proyectos") {
          if (current === "/") navigate("/proyectos");
          else navigate(current);
        } else {
          navigate("/proyectos");
        }
      } catch (error) {
        console.log(error.response);
        setAuth({});
      } finally {
        setCargando(false);
      }
    };

    autenticarUsuario();
  }, [auth.email]);

  return (
    <AuthContext.Provider value={{ setAuth, auth, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
