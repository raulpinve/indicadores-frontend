import React, { useEffect, useState } from 'react';
import Modal from '../../../../shared/components/Modal';
import { useForm } from 'react-hook-form';
import MessageError from '../../../../shared/components/MessageError';
import Button from '../../../../shared/components/Button';
import { toast } from 'sonner';

const ModalEditarVariable = (props) => {
    const {register, handleSubmit, setError, formState: { errors }, setValue, reset} = useForm({ mode: "onChange"})
    const [messageError, setMessageError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {cerrarModal, setVariables, variables, variableSeleccionada} = props;

    useEffect(() => {
        if(variableSeleccionada){
            setValue("nombre", variableSeleccionada?.nombre);
            setValue("alias", variableSeleccionada?.alias);
            setValue("descripcion", variableSeleccionada?.descripcion)
        }
    }, [variableSeleccionada])

    const onSubmit = (values) => {
        // Paso 1: comprobar duplicados antes del set
        const existeAlias = variables.some(
            v => v.alias.toLowerCase() === values.alias.toLowerCase() && v.id !== variableSeleccionada.id
        );

        if (existeAlias) {
            setError("alias", { type: "manual", message: "Ya existe una variable con ese alias" });
            return
        }

        // Paso 2: actualizar variable existente
        setVariables(prev =>
            prev.map(v =>
                v.id === variableSeleccionada.id ? { ...v, ...values } : v
            )
        );

        toast.success("Variable actualizada exitosamente.");
        cerrarModal();
    };

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Editar variable"
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
                                value: /^[A-Za-z_]+$/,
                                message: "El alias solo puede contener letras y guion bajo"
                            },
                            validate: {
                                notReserved: (value) => {
                                const reserved = [
                                    "sin","cos","tan","asin","acos","atan","log","ln","sqrt","abs","max","min","exp",
                                    "pow","pi","e","sum","int","lim","frac","left","right","cdot","times",
                                    "begin","end","over","imaginaryI","x","y","i","cccc"
                                ];
                                return !reserved.includes(value.toLowerCase()) || "No puede usar una palabra reservada";
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

export default ModalEditarVariable;