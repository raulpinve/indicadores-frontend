import api from "../../../utils/servicesUtils";

export const obtenerTodosIndicadores = async (pagina, consulta) => {
    const response = await api.get("/indicadores", {
        params: { page: pagina, consulta }, 
    });
    return response.data;
};