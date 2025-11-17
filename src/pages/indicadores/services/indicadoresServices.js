import api from "../../../utils/servicesUtils";

export const obtenerUltimasVersiones = async (pagina, consulta, empresaId, procesoSeleccionado) => {
    const response = await api.get(`/versiones/${empresaId}/empresas`, {
        params: { page: pagina, consulta, procesoSeleccionado }, 
    });
    return response.data;
};

export const crearIndicador = async (values) =>{
    const response = await api.post(`/indicadores`, values);
    return response.data;
}
export const editarIndicador = async(versionId, values) => {
    const response = await api.put(`/versiones/${versionId}`, values);
    return response.data;
}

export const actualizarVersion = async(versionId, values) => {
    const response = await api.put(`/versiones/${versionId}/actualizar`, values);
    return response.data;
}

export const obtenerVersionIndicador = async (versionId) => {
    const response = await api.get(`/versiones/${versionId}`)
    return response.data;
}

export const eliminarVersionIndicador = async (versionId) => {
    const response = await api.delete(`/versiones/${versionId}`)
    return response.data;
}