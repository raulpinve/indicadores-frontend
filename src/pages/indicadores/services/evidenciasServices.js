import api from "../../../utils/servicesUtils";

export const obtenerEvidencias = async (pagina, consulta, registroId) => {
    const response = await api.get(`/evidencias/${registroId}/registro`, {
        params: { page: pagina, consulta }, 
    });
    return response.data;
};

export const eliminarEvidencia = async (evidenciaId) => {
    const response = await api.delete(`/evidencias/${evidenciaId}`);
    return response.data;
}