import React, { useEffect, useState } from 'react';
import { host } from '../../../utils/config';
import Modal from '../../../shared/components/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { handleErrors } from '../../../utils/handleErrors';
import MessageError from '../../../shared/components/MessageError';
import Button from '../../../shared/components/Button';
import { useSelector } from 'react-redux';
import { actualizarPassword } from '../services/perfilServices';

const ModalEditarPassword = (props) => {
    const { register, handleSubmit, setError,getValues,formState: { errors }, setValue } = useForm({ mode: "onChange" });
    const { cerrarModal } = props;
    const [messageError, setMessageError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values) => {
        setMessageError(false);
        setLoading(true);
        try {
            await actualizarPassword(values);
            cerrarModal();
            toast.success('Contraseña actualizada correctamente.');
        } catch (error) {
            handleErrors(error, setError, setMessageError);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setValue("passwordNueva", "Bogota1234*")
        setValue("repetirNuevaPassword", "Bogota1234*")
    }, [])

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Editar contraseña"
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="mt-2">
                {/* Contraseña actual */}
                <div>
                    <label htmlFor="passwordActual" className="label-form">
                        Contraseña actual <span className="input-required">*</span>
                    </label>
                    <input 
                        type="password"
                        className={`input-form ${errors.passwordActual ? 'input-form-error' : ''}`}
                        {...register('passwordActual', {
                            required: 'Este campo es obligatorio.',
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;"'<>,.?\\/]).{8,20}$/,
                                message: 'Debe tener al menos una mayúscula, un número, un carácter especial y entre 8-20 caracteres.',
                            },
                        })}
                    />
                    {errors.passwordActual && (
                        <p className="input-message-error">{errors.passwordActual.message}</p>
                    )}
                </div>

                {/* Nueva contraseña */}
                <div>
                    <label htmlFor="passwordNueva" className="label-form">
                        Nueva contraseña <span className="input-required">*</span>
                    </label>
                    <input 
                        type="password"
                        className={`input-form ${errors.passwordNueva ? 'input-form-error' : ''}`}
                        {...register('passwordNueva', {
                            required: 'Este campo es obligatorio.',
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;"'<>,.?\\/]).{8,20}$/,
                                message: 'Debe tener al menos una mayúscula, un número, un carácter especial y entre 8-20 caracteres.',
                            },
                        })}
                    />
                    {errors.passwordNueva && (
                        <p className="input-message-error">{errors.passwordNueva.message}</p>
                    )}
                </div>

                {/* Repetir nueva contraseña */}
                <div>
                    <label htmlFor="repetirNuevaPassword" className="label-form">
                        Repetir nueva contraseña <span className="input-required">*</span>
                    </label>
                    <input 
                        type="password"
                        className={`input-form ${errors.repetirNuevaPassword ? 'input-form-error' : ''}`}
                        {...register('repetirNuevaPassword', {
                            required: 'Este campo es obligatorio.',
                            validate: value =>
                                value === getValues('passwordNueva') || 'Las contraseñas no coinciden.',
                        })}
                    />
                    {errors.repetirNuevaPassword && (
                        <p className="input-message-error">{errors.repetirNuevaPassword.message}</p>
                    )}
                </div>
                {messageError && 
                    <MessageError>
                        {messageError}
                    </MessageError>
                }
                <div className="mt-4 flex justify-end gap-2">
                    <Button 
                        colorButton={`secondary`}
                        textButton={`Cerrar`}
                        type= "button"
                        onClick={() => {
                            cerrarModal(false);
                        }}
                    />
                    <Button 
                        colorButton={`primary`}
                        textButton={`Guardar cambios`}
                        loading = {loading}
                        type= "submit"
                    />
                </div>
            </form>
        </Modal>
    );
};

export default ModalEditarPassword;
