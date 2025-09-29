import MessageError from '../../../../shared/components/MessageError'
import { editarUsuario } from '../../services/usuarioServices'
import { handleErrors } from '../../../../utils/handleErrors'
import Button from '../../../../shared/components/Button'
import Modal from '../../../../shared/components/Modal'
import React, {  useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const ModalEditarUsuario = (props) => {
    const {register, handleSubmit, setError, formState: { errors }, setValue, reset} = useForm({ mode: "onChange"})
    const [messageError, setMessageError] = useState(false)
    const [loading, setLoading] = useState(false)
    const {cerrarModal, setUsuarios, usuarioSeleccionado} = props

    // Editar la empresa
    const onSubmit = async (values) => {
        setMessageError(false);
        setLoading(true);

        try {
            const { data } = await editarUsuario(values, usuarioSeleccionado?.id);
            setUsuarios((prevUsuarios) =>
                prevUsuarios.map((usuario) =>
                    usuario.id === data.id
                    ? { ...usuario, 
                        primerNombre: data.primerNombre,
                        apellidos: data.apellidos,
                        username: data.username, 
                        email: data.email,
                    } : usuario
                )
            );
            cerrarModal();
            reset();
            toast.success("El usuario ha sido editada exitosamente.");
        } catch (error) {
            handleErrors(error, setError, setMessageError);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if(usuarioSeleccionado){
            setValue("primerNombre", usuarioSeleccionado.primerNombre);
            setValue("apellidos", usuarioSeleccionado.apellidos);
            setValue("username", usuarioSeleccionado.username);
            setValue("email", usuarioSeleccionado.email);
        }
    }, [usuarioSeleccionado])

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Editar empresa"
            size="md"
        >
            <form action="" className="gap-2 mt-6 text-sm text-gray-600 dark:text-white" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="lg:grid grid-cols-2 gap-2">
                    {/* Primer nombre */}
                    <div>
                        <label htmlFor="primerNombre" className="font-semibold">Primer nombre <span className="text-red-600">*</span></label>
                        <input type="text" 
                            className={`${(errors.primerNombre && errors.primerNombre.message) ? "input-form-error": ""} input-form`}
                            {...register("primerNombre", {
                                    required: {value: true, message:"Debe escribir un nombre."}, 
                                    minLength: {value: 2, message: "El nombre debe tener al menos dos caracteres."},
                                    maxLength: {value: 30, message: "El nombre no puede tener más de 30 caracteres."}
                                })
                            }
                            id="primerNombre"
                        />
                        {(errors.primerNombre && errors.primerNombre.message ) && (
                            <p className="input-message-error">{errors.primerNombre.message}</p>
                        )}
                    </div>

                    {/* Apellidos */}
                    <div>
                        <label htmlFor="apellidos" className="font-semibold">Apellidos <span className="text-red-600">*</span></label>
                        <input
                            className={`${(errors.apellidos && errors.apellidos.message) ? "input-form-error": ""} input-form`}
                            type="text"
                            {...register("apellidos", {
                                required: {value: true, message:"Debe escribir los apellidos."}, 
                                minLength: {value: 2, message: "Los apellidos deben tener al menos dos caracteres."},
                                maxLength: {value: 60, message: "Los apellidos no pueden tener más de 60 caracteres."}
                            })}
                            id="apellidos"
                        />
                        {(errors.apellidos && errors.apellidos.message ) && (
                            <p className="input-message-error">{errors.apellidos.message}</p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="" className="font-semibold">E-mail <span className="text-red-600">*</span></label>
                    <input 
                        className={`${errors.email ? "input-form-error": ""} input-form`}
                        {...register("email", {
                            required: {value: true, message: "Debe escribir correo electrónico"}, 
                            pattern: {
                                value: /^(?!\.)[a-zA-Z0-9._%+-]+@(?!-)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Escriba un correo electrónico válido."
                            }
                        })}
                        type="email" 
                        id="email"
                    />
                    {(errors.email && errors.email.message ) && (
                        <p className="input-message-error">{errors.email.message}</p>
                    )}
                </div>

                {/* Username */}
                <div>
                    <label htmlFor="username" className="font-semibold">Username <span className="text-red-600">*</span></label>
                    <input 
                        className={`${errors.username ? "input-form-error": ""} input-form`}
                        type="text" 
                        id="username"
                        {...register("username", {
                            required: {value: true, message: "El username debe tener entre 3 y 20 caracteres y solo puede contener letras, números y guiones bajos."}, 
                            pattern: {
                                value: /^[a-zA-Z0-9_]{3,20}$/,
                                message: "El username debe tener entre 3 y 20 caracteres y solo puede contener letras, números y guiones bajos."
                            }
                        })}
                    />
                    {(errors.username && errors.username.message ) && (
                        <p className="input-message-error">{errors.username.message }</p>
                    )}
                </div>

                {messageError && 
                    <MessageError>
                        {messageError}
                    </MessageError>
                }
                <Button type="submit" loading={loading} className="my-3" colorButton="primary" textButton="Editar usuario"/>
            </form>          
        </Modal>
    )
}

export default ModalEditarUsuario