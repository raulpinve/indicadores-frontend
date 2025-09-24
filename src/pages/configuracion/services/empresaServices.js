import api from "../../../utils/servicesUtils";

export const obtenerTodasEmpresas = async (pagina, consulta) => {
    const response = await api.get("/empresas", {
        params: { page: pagina, consulta }, 
    });
    return response.data;
};

export const crearEmpresa = async (data) => {
    try {
        const response = await api.post("/empresas", data); 
        return response.data; 
    } catch (error) {
        throw error?.response?.data || error;
    }
};

export const obtenerEmpresa = async (empresaId) => {
   try {
        const response = await api.get(`/empresas/${empresaId}`); 
        return response.data; 
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export const editarEmpresa = async (data, empresaId) => {
    try {
        const response = await api.put(`/empresas/${empresaId}`, data); 
        return response.data; 
    } catch (error) {
        throw error?.response?.data || error;
    }
};

export const cambiarAvatarEmpresa = async (empresaId, archivo) => {
    try {
        const formData = new FormData();
        formData.append("avatar", archivo);

        const response = await api.put(`/empresas/${empresaId}/avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        throw error?.response?.data || error;
    }
};

export const eliminarEmpresa = async (empresaId) => {
    try {
        const response = await api.delete(`/empresas/${empresaId}`); 
        return response.data; 
    } catch (error) {
        throw error?.response?.data || error;
    }
}
