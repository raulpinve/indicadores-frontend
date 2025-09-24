import React, {  useEffect, useState } from 'react'
import Modal from '../../../../shared/components/Modal'
import { useForm } from 'react-hook-form'
import Button from '../../../../shared/components/Button'
import { handleErrors } from '../../../../utils/handleErrors'
import { toast } from 'sonner'
// import { crearCriterio } from '../../services/criteriosServices'
import MessageError from '../../../../shared/components/MessageError'
import { crearEmpresa } from '../../services/empresaServices'

const ModalCrearEmpresa = (props) => {
    const {register, handleSubmit, setError, formState: { errors }, setValue} = useForm({ mode: "onChange"})
    const [messageError, setMessageError] = useState(false)
    const [loading, setLoading] = useState(false)
    const {cerrarModal, setEmpresas} = props

    // Crea el estandar
    const onSubmit = async(values) => {
        setMessageError(false)
        setLoading(true)
        try {
            const result = await crearEmpresa(values)
            const { data } = result 
            setEmpresas(prevGrupos => [data, ...prevGrupos]);
            cerrarModal();
            setValue("nombre", "");
            toast.success(`La empresa ha sido creada exitosamente.`);
        } catch (error) {
            handleErrors(error, setError, setMessageError);
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        setValue("nombre", "Empresa de prueba")
    }, [])

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Crear empresa"
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                {/* Nombre */}
                <div>
                    <label className="label-form" htmlFor='nombre'>Nombre de la empresa<span className="text-red-600">*</span></label>
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

export default ModalCrearEmpresa