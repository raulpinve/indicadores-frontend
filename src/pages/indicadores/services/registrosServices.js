import api from "../../../utils/servicesUtils";

export const crearRegistro = async (values) =>{
    const response = await api.post(`/registros`, values);
    return response.data;
}