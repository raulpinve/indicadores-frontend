import MessageError from '../../../../shared/components/MessageError'
import { handleErrors } from '../../../../utils/handleErrors'
import Button from '../../../../shared/components/Button'
import Modal from '../../../../shared/components/Modal'
import React, {  useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { editarProceso } from '../../services/procesoServices'

const ModalEditarProceso = (props) => {
    const {register, handleSubmit, setError, formState: { errors }, setValue, reset} = useForm({ mode: "onChange"})
    const [messageError, setMessageError] = useState(false)
    const [loading, setLoading] = useState(false)
    const {cerrarModal, setProcesos, procesoSeleccionado} = props

    // Editar proceso
    const onSubmit = async (values) => {
        setMessageError(false);
        setLoading(true);

        try {
            const { data } = await editarProceso(values, procesoSeleccionado?.id);

            // Actualizar la lista del proceso
            setProcesos((prevProcesos) =>
                prevProcesos.map((proceso) =>
                    proceso.id === data.id
                    ? { ...proceso, nombre: data.nombre } 
                    : proceso
                )
            );

            cerrarModal();
            reset(); 
            toast.success("El proceso ha sido editado exitosamente.");
        } catch (error) {
            handleErrors(error, setError, setMessageError);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        setValue("nombre", procesoSeleccionado?.nombre)
    }, [procesoSeleccionado])

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Editar proceso"
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                {/* Nombre */}
                <div>
                    <label className="label-form" htmlFor='nombre'>Nombre del proceso <span className="text-red-600">*</span></label>
                    <input 
                        className={`${errors.nombre && errors.nombre.message ? 'input-form-error' : ''} input-form`}
                        {...register('nombre', {
                            required: {
                                value: true,
                                message: 'Debe proporcionar un nombre.',
                            },
                            minLength: {
                                value: 2,
                                message: 'El nombre debe tener al menos dos caracteres.',
                            },
                            maxLength: {
                                value: 200,
                                message: 'El nombre no debe exceder los 200 caracteres.',
                            },
                        })}
                        id="name"
                    />
                    {errors.nombre && errors.nombre.message && (<p className="input-message-error">{errors.nombre.message}</p>)} 
                </div>

                <p className='text-sm my-2'>
                    <span className='text-red-600 mr-.5'>*</span> Los campos con asteriscos son obligatorios
                </p>
                {/* Mensaje de error */}
                {messageError && 
                    <MessageError>{messageError}</MessageError>
                }
                <div className="mt-4 flex justify-end gap-2">
                     <Button 
                        colorButton="secondary"
                        textButton="Cancelar"
                        type="button"
                        onClick={() => cerrarModal(false)}
                    />
                    <Button 
                        type="submit"
                        colorButton="primary"
                        textButton="Guardar cambios"
                        loading={loading}
                    />
                </div>
            </form>
        </Modal>
    )
}

export default ModalEditarProceso