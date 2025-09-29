import api from "../../../utils/servicesUtils";

export const obtenerTodosUsuarios = async (pagina, consulta) => {
    const response = await api.get("/usuarios", {
        params: { page: pagina, consulta }, 
    });
    return response.data;
};

export const crearUsuario = async (data) => {
    try {
        const response = await api.post("/usuarios", data); 
        return response.data; 
    } catch (error) {
        throw error?.response?.data || error;
    }
};

export const obtenerUsuario = async (usuarioId) => {
   try {
        const response = await api.get(`/usuarios/${usuarioId}`); 
        return response.data; 
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export const editarUsuario = async (data, usuarioId) => {
    try {
        const response = await api.put(`/usuarios/${usuarioId}`, data); 
        return response.data; 
    } catch (error) {
        throw error?.response?.data || error;
    }
};

export const cambiarAvatarUsuario = async (usuarioId, archivo) => {
    try {
        const formData = new FormData();
        formData.append("avatar", archivo);

        const response = await api.put(`/usuarios/${usuarioId}/avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        throw error?.response?.data || error;
    }
};

export const eliminarUsuario = async (usuarioId) => {
    try {
        const response = await api.delete(`/usuarios/${usuarioId}`); 
        return response.data; 
    } catch (error) {
        throw error?.response?.data || error;
    }
}
