import React, { useEffect, useState } from 'react';
import Modal from '../../../../shared/components/Modal';
import { useForm } from 'react-hook-form';
import MessageError from '../../../../shared/components/MessageError';
import Button from '../../../../shared/components/Button';
import { toast } from 'sonner';
import { editarNumeroVersion } from '../../services/versionesServices';
import { handleErrors } from '../../../../utils/handleErrors';

const ModalEditarNumeroVersion = (props) => {
    const {register, handleSubmit, setError, formState: { errors }, setValue, reset} = useForm({ mode: "onChange"})
    const [messageError, setMessageError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {cerrarModal, versionSeleccionada, setVersiones} = props;

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            await editarNumeroVersion(versionSeleccionada?.id, values);

            // // Asegúrate de que response contenga la nueva versión actualizada
            // const versionActualizada = response.data; 

            // Actualizar la lista de versiones en el estado del padre
            setVersiones(prev =>
                prev.map(v =>
                    v.id === versionSeleccionada.id
                    ? { ...v, ...values } // aquí mezclas los valores nuevos en la versión existente
                    : v
                )
            );
            toast.success("La versión ha sido editada exitosamente.");
            cerrarModal()
        } catch (error) {
            handleErrors(error, setError, setMessageError)
        } finally{
            setLoading(false);
        }
    };


    useEffect(() => {
        setValue("version", versionSeleccionada?.version);
    }, [versionSeleccionada])

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Editar número de versión"
            size="md"
        >
            <form action="" onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                {/* Número de versión */}
                <div>
                    <label className='label-form'>Número de versión<span className='input-required'>*</span></label>
                    <input 
                        className={`input-form ${errors.version ? 'input-form-error' : ''}`}
                        type="number"
                        {...register("version", {
                            valueAsNumber: true,
                            validate: (v) => Number.isInteger(v) || "Debe ser un entero"
                        })}
                    />
                    {errors.version && <p className="text-red-600 text-sm">{errors.version.message}</p>}
                </div>

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
                        colorButton="primary"
                        textButton="Guardar cambios"
                        loading={loading}
                    />
                </div>
            </form>
        </Modal>
    );
};

export default ModalEditarNumeroVersion;