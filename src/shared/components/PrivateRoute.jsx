import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SeleccionarEmpresa from "./SeleccionarAlmacen";
// import VerificarEmail from "./VerificarEmail";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {children}
      <SeleccionarEmpresa />
      {/* <VerificarEmail /> */}
    </>
  );
};

export default PrivateRoute;