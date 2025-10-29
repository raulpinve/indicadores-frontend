import React, { useEffect, useState } from 'react';
import Modal from '../../../../shared/components/Modal';
import { useForm } from 'react-hook-form';
import MessageError from '../../../../shared/components/MessageError';
import Button from '../../../../shared/components/Button';
import { toast } from 'sonner';
import { v4 as uuidv4 } from "uuid";

const ModalAgregarVariable = (props) => {
    const {register, handleSubmit, setError, formState: { errors }, setValue, reset} = useForm({ mode: "onChange"})
    const [messageError, setMessageError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {cerrarModal, setVariables, variables} = props;

    const onSubmit = (values) => {
        // Paso 1: comprobar duplicados antes del set
        const existeNombre = variables.some(v => v.nombre.toLowerCase() === values.nombre.toLowerCase());
        const existeAlias = variables.some(v => v.alias.toLowerCase() === values.alias.toLowerCase());

        if (existeNombre) {
            setError("nombre", { type: "manual", message: "Ya existe una variable con ese nombre" });
        }

        if (existeAlias) {
            setError("alias", { type: "manual", message: "Ya existe una variable con ese alias" });
        }

        // Paso 2: si hay errores, salimos (no se cierra el modal)
        if (existeNombre || existeAlias) return;

        // Paso 3: si todo bien, actualizamos variables
        setVariables(prev => [...prev, { id: uuidv4(), ...values }]);

        // Paso 4: ahora sí, cerramos el modal y mostramos mensaje
        toast.success("Variable guardada exitosamente.");
        cerrarModal();
    };

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Agregar variable"
            size="md"
        >
            <form action="" onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                {/* Nombre de la variable */}
                <div>
                    <label className='label-form'>Nombre de la variable <span className='input-required'>*</span></label>
                    <input 
                        type="text" 
                        placeholder='Nombre de la variable' 
                        className={`input-form ${errors.nombre && errors.nombre.message ? 'input-form-error' : ''} `}
                        {...register("nombre",{
                            required: "El nombre es obligatorio",
                            minLength: {
                                value: 3,
                                message: "Debe tener al menos 3 caracteres",
                            },
                            maxLength: {
                                value: 15,
                                message: "No puede tener más de 15 caracteres"
                            }
                        })}
                    />
                    {(errors.nombre && errors.nombre.message ) && (
                        <p className="input-message-error">{errors.nombre.message}</p>
                    )}
                </div>

                {/* Alias */}
                <div>
                    <label className='label-form'>Alias de la variable<span className='input-required'>*</span></label>
                    <input 
                        type="text"
                        placeholder="Alias de la variable" 
                        className={`input-form ${errors.alias ? 'input-form-error' : ''}`}
                        {...register("alias", {
                            required: "El alias es obligatorio",
                            minLength: {
                                value: 1, 
                                message: "Debe tener al menos un caracter"
                            }, 
                            maxLength: {
                                value: 20, // igual que en el backend
                                message: "No puede tener más de 20 caracteres"
                            },
                            pattern: {
                                value: /^[A-Za-z_]+$/,
                                message: "El alias solo puede contener letras y guion bajo"
                            }
                        })}
                    />
                    {errors.alias && <p className="text-red-600 text-sm">{errors.alias.message}</p>}
                </div>

                {/* Descripción */}
                <div>
                    <label className='label-form'>Descripción<span className='input-required'>*</span></label>
                    <textarea 
                        className={`input-form resize-none h-[100px] ${errors.descripcion && errors.descripcion.message ? 'input-form-error' : ''} `}
                        {...register("descripcion", {
                            minLength: {
                                value: 1, 
                                message:"Debe tener al menos un caracter"
                            }, 
                            maxLength: {
                                value: 200,
                                message: "No puede tener más de 20 caracteres"
                            }
                        })}
                    ></textarea>
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

export default ModalAgregarVariable;