import api from "../../../utils/servicesUtils";

export const obtenerVersionesPorVersionId = async(versionId, pagina) => {
    const response = await api.get(`/versiones/${versionId}/versiones`, 
        {params: { page: pagina}}
    );
    return response.data;
}

export const editarNumeroVersion = async(versionId, data) => {
    const response = await api.put(`/versiones/${versionId}/version`, data);
    return response.data;
}