import React, { useEffect, useState } from 'react'
import Modal from '../../../../shared/components/Modal'
import { useForm } from 'react-hook-form'
import Button from '../../../../shared/components/Button'
import { handleErrors } from '../../../../utils/handleErrors'
import { toast } from 'sonner'
import MessageError from '../../../../shared/components/MessageError'
import { crearUsuario } from '../../services/usuarioServices'

const ModalCrearUsuario = (props) => {
    const {register, handleSubmit, setError, formState: { errors }, setValue, reset} = useForm({ mode: "onChange"})
    const [messageError, setMessageError] = useState(false)
    const [loading, setLoading] = useState(false)
    const {cerrarModal, setUsuarios} = props

    // Crea el estandar
    const onSubmit = async(values) => {
        setMessageError(false)
        setLoading(true)
        try {
            const result = await crearUsuario(values)
            const { data } = result 
            setUsuarios(prevGrupos => [data, ...prevGrupos]);
            cerrarModal();
            setValue("nombre", "");
            toast.success(`El usuario ha sido creada exitosamente.`);
            reset();
        } catch (error) {
            handleErrors(error, setError, setMessageError);
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        setValue("primerNombre", "Delcira")
        setValue("apellidos", "Pinto Vergara")
        setValue("email", "delcira@gmail.com")
        setValue("username", "delcira")
        setValue("password", "3114221048RaDa*")
    }, [])

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Crear usuario"
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

                {/* Contraseña */}
                <div>
                    <label htmlFor="password" className="font-semibold">
                        Contraseña <span className="text-red-600">*</span>
                    </label>
                    <input
                        className={`${errors.password ? "input-form-error" : ""} input-form`}
                        type="password"
                        id="password"
                        {...register("password", {
                        required: {
                            value: true,
                            message: "La contraseña es obligatoria.",
                        },
                        minLength: {
                            value: 8,
                            message: "La contraseña debe tener al menos 8 caracteres.",
                        },
                        validate: {
                            hasLetter: (value) =>
                            /[a-zA-Z]/.test(value) ||
                            "La contraseña debe contener al menos una letra.",
                            hasNumber: (value) =>
                            /[0-9]/.test(value) ||
                            "La contraseña debe contener al menos un número.",
                            hasSpecial: (value) =>
                            /[^A-Za-z0-9]/.test(value) ||
                            "La contraseña debe contener al menos un carácter especial.",
                        },
                        })}
                    />
                    {errors.password && errors.password.message && (
                        <p className="input-message-error">{errors.password.message}</p>
                    )}
                </div>

                {messageError && 
                    <MessageError>
                        {messageError}
                    </MessageError>
                }
                <Button type="submit" loading={loading} className="my-3" colorButton="primary" textButton="Crear usuario"/>
            </form>
        </Modal>
    )
}

export default ModalCrearUsuario