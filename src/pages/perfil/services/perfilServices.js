import api from "../../../utils/servicesUtils";

// Cambiar avatar de un usuario
export const cambiarAvatarUsuario = async (usuarioId, file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const respuesta = await api.put(
        `/perfil/avatar`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return respuesta; 
};

// Obtener información de un usuario
export const obtenerUsuario = async (usuarioId) => {
    const respuesta = await api.get(`/usuarios/${usuarioId}`);
    return respuesta.data;
};

// Actualizar información de un usuario
export const actualizarUsuario = async (data) => {
    const respuesta = await api.put(`/perfil`, data);
    return respuesta.data;
};

export const actualizarPassword = async (data) => {
    const respuesta = await api.put(`/perfil/password`, data);
    return respuesta.data;
};


// Eliminar avatar
export const eliminarAvatarUsuario = async () => {
    const respuesta = await api.delete(`/perfil/avatar`);
    return respuesta.data;
};
