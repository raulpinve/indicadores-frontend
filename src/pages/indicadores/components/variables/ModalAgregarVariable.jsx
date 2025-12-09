import React, { useState } from 'react';
import Modal from '../../../../shared/components/Modal';
import { useForm } from 'react-hook-form';
import MessageError from '../../../../shared/components/MessageError';
import Button from '../../../../shared/components/Button';
import { toast } from 'sonner';
import { v4 as uuidv4 } from "uuid";
import { reservedWordsMathLive } from '../../utils/utils';

const ModalAgregarVariable = (props) => {
    const {register, handleSubmit, setError, formState: { errors }, setValue, reset} = useForm({ mode: "onChange"})
    const [messageError, setMessageError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {cerrarModal, setVariables, variables} = props;

    const onSubmit = (values) => {
        // Paso 1: comprobar duplicados antes del set
        const existeAlias = variables.some(v => v.alias.toLowerCase() === values.alias.toLowerCase());

        if (existeAlias) {
            setError("alias", { type: "manual", message: "Ya existe una variable con ese alias" });
            return
        }

        // Paso 2: si todo bien, actualizamos variables
        setVariables(prev => [...prev, { id: uuidv4(), ...values }]);

        // Paso 3: ahora sí, cerramos el modal y mostramos mensaje
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
                                value: /^[A-Za-z]+$/,
                                    message: "Solo se permiten letras"
                                },
                                validate: {
                                    notReserved: (value) => {
                                        if (!value) return true;
                                        return !reservedWordsMathLive.includes(value.toLowerCase()) || "No puede usar una palabra reservada";
                                    }
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