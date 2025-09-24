import api from "../../../utils/servicesUtils";

export const obtenerTodosProcesos = async (pagina, consulta, empresaId) => {
    const response = await api.get(`/procesos/${empresaId}/empresas`, {
        params: { page: pagina, consulta}, 
    });
    return response.data;
};

export const crearProceso = async (data) => {
    try {
        const response = await api.post("/procesos", data); 
        return response.data; 
    } catch (error) {
        throw error?.response?.data || error;
    }
};

export const obtenerProceso = async (procesoId) => {
   try {
        const response = await api.get(`/procesos/${procesoId}`); 
        return response.data; 
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export const editarProceso = async (data, procesoId) => {
    try {
        const response = await api.put(`/procesos/${procesoId}`, data); 
        return response.data; 
    } catch (error) {
        throw error?.response?.data || error;
    }
};

export const eliminarProceso = async (procesoId) => {
    try {
        const response = await api.delete(`/procesos/${procesoId}`); 
        return response.data; 
    } catch (error) {
        throw error?.response?.data || error;
    }
}
