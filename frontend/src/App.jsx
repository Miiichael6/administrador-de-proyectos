import { Route, Routes } from "react-router-dom";
import AuthPage from "./Layouts/AuthLayout";
import RutaProtegida from "./Layouts/RutaProtegida";
import ConfirmaCuenta from "./Pages/ConfirmaCuenta";
import EditarProyecto from "./Pages/EditarProyecto";
import Login from "./Pages/Login";
import NuevoColaborador from "./Pages/NuevoColaborador";
import NuevoPassword from "./Pages/NuevoPassword";
import NuevoProyecto from "./Pages/NuevoProyecto";
import OlvidePassword from "./Pages/OlvidePassword";
import Proyecto from "./Pages/Proyecto";
import Proyectos from "./Pages/Proyectos";
import Registrar from "./Pages/Registrar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />}>
          <Route index element={<Login />} />
          <Route path="registrar" element={<Registrar />} />
          <Route path="olvide-password" element={<OlvidePassword />} />
          <Route path="olvide-password/:token" element={<NuevoPassword />} />
          <Route path="confirmar/:id" element={<ConfirmaCuenta />} />
        </Route>

        <Route path="/proyectos" element={<RutaProtegida />}>
          <Route index element={<Proyectos />} />
          <Route path="crear-proyecto" element={<NuevoProyecto />} />
          <Route path=":id" element={<Proyecto />} />
          <Route path="editar/:id" element={<EditarProyecto />} />
          <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />} />
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
