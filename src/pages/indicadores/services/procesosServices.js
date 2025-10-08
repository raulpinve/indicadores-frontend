import api from "../../../utils/servicesUtils";

export const obtenerTodosProcesos = async (empresaId) => {
    const response = await api.get(`/procesos/${empresaId}/empresas`);
    return response.data;
};