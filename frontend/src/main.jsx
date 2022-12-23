import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { AuthProvider } from "./context/AuthProvider";
import { ProyectosProvider } from "./context/ProyectosProvider";
// para vite se usa import meta
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      <ProyectosProvider>
        <App />
      </ProyectosProvider>
    </AuthProvider>
  </Router>
);
