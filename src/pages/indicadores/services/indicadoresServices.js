import api from "../../../utils/servicesUtils";

export const obtenerTodosIndicadores = async (pagina, consulta, empresaId) => {
    const response = await api.get(`/indicadores/${empresaId}/empresas`, {
        params: { page: pagina, consulta }, 
    });
    return response.data;
};