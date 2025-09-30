import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Modal from '../../../shared/components/Modal';
import Button from '../../../shared/components/Button';
import MessageError from '../../../shared/components/MessageError';
import { handleErrors } from '../../../utils/handleErrors';
import { actualizarUsuario } from '../services/perfilServices';
import { updateUser } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';

const ModalEditarPerfil = ({ isOpenModal, setIsOpenModal, usuario }) => {
    const { register, handleSubmit, setValue, setError, reset, formState: { errors } } = useForm({ mode: "onChange" });
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState(null);
    const dispatch = useDispatch();

    // Prellenar campos
    useEffect(() => {
        if (usuario) {
            setValue("primerNombre", usuario.primerNombre);
            setValue("apellidos", usuario.apellidos);
            setValue("username", usuario.username);
            setValue("email", usuario.email);
        }
    }, [usuario, setValue]);

    const onSubmit = async (values) => {
        setLoading(true);
        setMessageError(null);
        try {
            await actualizarUsuario(values);
            
            // Actualizas solo lo que vino del formulario
            dispatch(updateUser(values));

            toast.success("Perfil actualizado correctamente.");
            setIsOpenModal(false);
            reset();
        } catch (error) {
            handleErrors(error, setError, setMessageError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            title="Editar perfil"
            size="md"
        >
            <form className="gap-2 mt-6 text-sm text-gray-600 dark:text-white" onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <div className="grid grid-cols-2 gap-2">
                    {/* Primer nombre */}
                    <div>
                        <label className="font-semibold">Primer nombre <span className="text-red-600">*</span></label>
                        <input
                            className={`${errors.primerNombre ? "input-form-error" : ""} input-form`}
                            {...register("primerNombre", { required: "Debe escribir un nombre." })}
                        />
                        {errors.primerNombre && <p className="input-message-error">{errors.primerNombre.message}</p>}
                    </div>

                    {/* Apellidos */}
                    <div>
                        <label className="font-semibold">Apellidos <span className="text-red-600">*</span></label>
                        <input
                            className={`${errors.apellidos ? "input-form-error" : ""} input-form`}
                            {...register("apellidos", { required: "Debe escribir los apellidos." })}
                        />
                        {errors.apellidos && <p className="input-message-error">{errors.apellidos.message}</p>}
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="font-semibold">E-mail <span className="text-red-600">*</span></label>
                    <input
                        className={`${errors.email ? "input-form-error" : ""} input-form`}
                        type="email"
                        {...register("email", { required: "Debe escribir correo electrónico" })}
                    />
                    {errors.email && <p className="input-message-error">{errors.email.message}</p>}
                </div>

                {/* Username */}
                <div>
                    <label className="font-semibold">Username <span className="text-red-600">*</span></label>
                    <input
                        className={`${errors.username ? "input-form-error" : ""} input-form`}
                        {...register("username", { required: "Debe escribir un username" })}
                    />
                    {errors.username && <p className="input-message-error">{errors.username.message}</p>}
                </div>
                {messageError && <MessageError>{messageError}</MessageError>}
                <Button type="submit" loading={loading} className="my-3" colorButton="primary" textButton="Guardar cambios" />
            </form>
        </Modal>
    );
};

export default ModalEditarPerfil;
