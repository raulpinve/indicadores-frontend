import api from "../../../utils/servicesUtils";

export const obtenerUltimasVersiones = async (pagina, consulta, empresaId, procesoSeleccionado) => {
    const response = await api.get(`/versiones/${empresaId}/empresas`, {
        params: { page: pagina, consulta, procesoSeleccionado }, 
    });
    return response.data;
};

export const crearIndicador = async (values) =>{
    const response = await api.post("/indicadores", values);
}