import api from "../../../utils/servicesUtils";

export const crearRegistro = async (values) => {
    const response = await api.post(`/registros`, values);
    return response.data;
}

export const obtenerRegistro = async(registroId) => {
    const response = await api.get(`/registros/${registroId}`, registroId);
    return response.data;
}

export const editarRegistro = async (data, registroId) => {
    const response = await api.put(`/registros/${registroId}`, data);
    return response.data;
}

export const obtenerRegistros = async (versionId, consulta, pagina) => {
    const response = await api.get(`/registros/${versionId}/todos`, {
        params: { page: pagina, consulta }, 
    });
    return response.data;
}

export const eliminarRegistro = async (versionId) => {
    const response = await api.delete(`/registros/${versionId}`);
    return response.data;
}