import React, { useState } from 'react'
import Modal from '../../../../shared/components/Modal'
import "react-tooltip/dist/react-tooltip.css";
import { editarRegistro } from '../../services/registrosServices'
import { toast } from 'sonner'
import FormRegistro from './FormRegistro'

const ModalEditarRegistro = (props) => {
    const {versionSeleccionada, cerrarModal, setRegistros, registroSeleccionado} = props;
    const [messageError, setMessageError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmitFormulario = async(
        data, 
        setError, 
        setValue, 
        setCambiosVariables, 
        setValorVariables, 
        reset
    ) => {

        setMessageError(false);
        setLoading(true);
        try {
            const result = await editarRegistro(data, registroSeleccionado?.id);
            const { data: resultData } = result; 
            setRegistros(prevRegistros =>
                prevRegistros.map(item =>
                    item.id === resultData.id ? resultData : item
                )
            );

            cerrarModal();
            setValue("fechaLibre", "");
            setValue("mes", "");
            setValue("anio", "");
            setValue("semestre", "");
            setValue("trimestre", "");
            setCambiosVariables(0);
            setValorVariables([]);
            toast.success(`El registro ha sido editado exitosamente.`);
            reset();
        } catch (error) {
            const responseData = error?.response?.data || error; 
            const fieldErrors = responseData?.error?.fieldErrors;

            if (responseData?.statusCode === 400 && Array.isArray(fieldErrors) && fieldErrors.length > 0) {
                fieldErrors.forEach(({ field, message }) => {
                    if(field === "resultado" || field === "estadoResultado"){
                        setMessageError("Debe agregar toda la información de las variables");
                    }else{
                        setError(field, { type: "server", message });
                    }
                })
            }
        } finally{
            setLoading(false)
        }
    }


    return (<>
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Editar registro"
            size="xl"
        >
            <FormRegistro 
                versionSeleccionada = {versionSeleccionada}
                onSubmitFormulario = {onSubmitFormulario}
                cerrarModal = {cerrarModal}
                messageError = {messageError}
                loading = {loading}
                registroSeleccionado = {registroSeleccionado}
            />
        </Modal>
    </>)
}

export default ModalEditarRegistro