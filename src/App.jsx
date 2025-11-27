import ConfiguracionEmpresaPage from './pages/configuracion/ConfiguracionEmpresaPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ConfiguracionPage from './pages/configuracion/ConfiguracionPage'
import EditarPerfilPage from './pages/perfil/EditarPerfilPage'
import PrivateRoute from './shared/components/PrivateRoute'
import { login, logout } from './store/authSlice'
import SignupPage from './pages/auth/SignupPage'
import Layout from './shared/components/Layout'
import LoginPage from './pages/auth/LoginPage'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { RiLoader4Fill } from 'react-icons/ri'
import { host } from './utils/config'
import { Toaster } from 'sonner'
import axios from 'axios'
import IndicadoresPage from './pages/indicadores/IndicadoresPage'
import CrearIndicadorPage from './pages/indicadores/crearIndicadorPage'
import IndicadorPage from './pages/indicadores/IndicadorPage'
import EditarIndicadorPage from './pages/indicadores/EditarIndicadorPage'
import ActualizarIndicadorPage from './pages/indicadores/ActualizarIndicadorPage'

function App() {
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(true);

    /* Validate the token */
    useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
        axios
          .get(`${host}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            dispatch(login({ ...result.data.data, token }));
          })
          .catch(() => {
            dispatch(logout());
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        dispatch(logout());
        setLoading(false);
      }
    }, [dispatch]);

    // Configuración para toaster
    const [isDark, setIsDark] = useState();

    useEffect(() => {
      setIsDark(localStorage.getItem("theme") === "dark")
    }, [])

    if (loading) {
      return (
        <div className="min-h-screen min-w-screen flex justify-center items-center bg-slate-100">
          <RiLoader4Fill className="animate-spin text-5xl text-blue-700" />
        </div>
      );
    }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Navigate to="/configuracion" replace />} />
          <Route path="/configuracion" element={<ConfiguracionPage />} />
          <Route path="/indicadores" element={<IndicadoresPage />} />
          <Route path="/indicadores/:versionId" element={<IndicadorPage />} />
          <Route path="/indicadores/:versionId/editar" element={<EditarIndicadorPage />} />
          <Route path="/indicadores/:versionId/actualizar" element={<ActualizarIndicadorPage />} />
          <Route path="/indicadores/crear" element={<CrearIndicadorPage />} />
          <Route path="/editar-perfil" element={<EditarPerfilPage />} />
          <Route path="/configuracion/empresas/:empresaId" element={<ConfiguracionEmpresaPage />} />
        </Route>

        {/* Rutas públicas */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    <Toaster richColors position="bottom-right" />
  </BrowserRouter>)
}

export default App
