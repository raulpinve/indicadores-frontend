import api from "../../../utils/servicesUtils";

export const crearRegistro = async (values) => {
    const response = await api.post(`/registros`, values);
    return response.data;
}

export const editarRegistro = async (data, registroId) => {
    const response = await api.put(`/registros/${registroId}`, data);
    return response.data;
}

export const obtenerRegistros = async (versionId) => {
    const response = await api.get(`/registros/${versionId}/todos`);
    return response.data;
}
