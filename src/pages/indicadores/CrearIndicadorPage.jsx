import React, { useState } from 'react';
import Card from '../../shared/components/Card';
import { useForm } from 'react-hook-form';

const CrearIndicadorPage = () => {
    const {register, handleSubmit, setError, formState: { errors }, trigger, setFocus , watch, reset, setValue} = useForm({ mode: 'onChange' }) 
    const [isMetaAbsoluta, setIsMetaAbsoluta] = useState(true);

    return (
        <div>
            <Card>
                <h2 className='font-semibold text-xl'>Crear indicador</h2>
                <form className='mt-4' action="" autoComplete='off'>
                    {/* Nombre del indicador */}
                    <div>
                        <label htmlFor="nombre" className="label-form">Nombre del indicador<span className='text-red-600'>*</span></label>
                        <input 
                            type="text" 
                            className={`input-form ${errors.nombre && errors.nombre.message ? 'input-form-error' : ''} `}
                            placeholder='Ej: severidad de accidentes'
                            id="nombre"
                            {...register('nombre', {
                                required: {
                                    value: true, 
                                    message: "Debe porporcionar un nombre para el indicador."
                                }, 
                                minLength: {
                                    value: 3, 
                                    message: "El nombre debe tener al menos 3 caracteres."
                                }, 
                                maxLength: {
                                    value: 140, 
                                    message: "El nombre no puede tener más de 140 caracteres."
                                }
                            })}
                        />
                        {(errors.nombre && errors.nombre.message ) && (
                            <p className="input-message-error">{errors.nombre.message}</p>
                        )}
                    </div>

                    {/* Propósito */}
                    <div>
                        <label htmlFor="proposito" className='label-form'>Propósito del indicador<span className='text-red-600'>*</span></label>
                        <textarea 
                            className={`${ errors.proposito ? 'input-form-error' : ''} input-form resize-none h-24`} 
                            placeholder='Objetivo del indicador'
                            id="proposito"
                            {...register('proposito', {
                                required: {
                                    value: true, 
                                    message: "Debe porporcionar un objetivo para el indicador."
                                }, 
                                minLength: {
                                    value: 15, 
                                    message: "El objetivo debe tener al menos 15 caracteres."
                                }, 
                                maxLength: {
                                    value: 250, 
                                    message: "El objetivo no puede tener más de 250 caracteres."
                                }
                            })}
                        ></textarea>
                        {(errors.proposito && errors.proposito.message) && (
                            <p className="input-message-error">{errors.proposito.message}</p>
                        )}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label htmlFor="descripcion" className='label-form'>Descripción del indicador<span className='text-red-600'>*</span></label>
                        <textarea 
                            className={`${ errors.descripcion ? 'input-form-error': ''} input-form resize-none h-24`} 
                            placeholder='Descripción del indicador'
                            id="descripcion"
                            {...register('descripcion', {
                                required: {
                                    value: true, 
                                    message: "Debe porporcionar una descripción para el indicador."
                                }, 
                                minLength: {
                                    value: 15, 
                                    message: "La descripción debe tener al menos 15 caracteres."
                                }, 
                                maxLength: {
                                    value: 250, 
                                    message: "La descripción no puede tener más de 250 caracteres."
                                }
                            })}
                        ></textarea>
                        {(errors.descripcion && errors.descripcion.message) && (
                            <p className="input-message-error">{errors.descripcion.message}</p>
                        )}
                    </div>

                    {/* Frecuencia de medición */}
                    <div>
                        <label htmlFor="frecuenciaMedicion" className='label-form'>Frecuencia de medición<span className='text-red-600'>*</span></label>
                        <select 
                            className={`${errors.frecuenciaMedicion ? 'input-form-error' : ''} input-form`}
                            id="frecuenciaMedicion"
                            {...register("frecuenciaMedicion", {
                                required: {
                                    value: true, 
                                    message: "Debe seleccionar una frecuencia de medición."
                                }
                            })} 
                        >
                            <option value="">Seleccionar...</option>
                            <option value="libre">Libre</option>
                            <option value="mensual">Mensual</option>
                            <option value="trimestral">Trimestral</option>
                            <option value="semestral">Semestral</option>
                            <option value="anual">Anual</option>
                        </select>
                        {(errors.frecuenciaMedicion && errors.frecuenciaMedicion.message) && (
                            <p className="input-message-error">{errors.frecuenciaMedicion.message}</p>
                        )}
                    </div>

                    {/* Unidad medida */}
                    <div>
                        <label htmlFor="unidadMedida" className='label-form'>Unidad de medida<span className='text-red-600'>*</span></label>
                        <select 
                                className={`input-form ${errors.unidadMedida ? 'input-form-error' : ''}`}
                            id="unidadMedida"
                            {...register('unidadMedida', {
                                required: {
                                    value: true,
                                    message: "Debe seleccionar una unidad de medida válida"
                                }
                            })}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="cantidad">Cantidad</option>
                            <option value="porcentaje">Porcentaje</option>
                        </select>
                        {(errors.unidadMedida && errors.unidadMedida.message) && (
                            <p className="input-message-error">{errors.unidadMedida.message}</p>
                        )}
                    </div>  
                    
                    {/* Tipo de meta */}
                    <div>
                        <label htmlFor="tipoMeta" className='label-form'>Tipo de meta<span className='text-red-600'>*</span></label>
                        <select 
                            className={`${errors.tipoMeta ? 'input-form-error': ''} input-form`}
                            id="tipoMeta"
                            {...register('tipoMeta', {
                                required: {
                                    value: true,
                                    message: "Debe seleccionar un tipo de meta válido. Valores válidos: \"Escala\" y \"Absoluta\"" 
                                },
                                onChange: (e) => {
                                    setIsMetaAbsoluta(e.target.value === 'absoluta')
                                }
                            })}
                        >
                            <option value="absoluta">Absoluta</option>
                            <option value="escala">Escala</option>
                        </select>
                        {(errors.tipoMeta && errors.tipoMeta.message) && (
                            <p className="input-message-error">{errors.tipoMeta.message}</p>
                        )}
                    </div>  

                    {/* Sentido de la meta */}
                    <div>
                        <label htmlFor="direccion" className='label-form'>Sentido de la meta <span className='text-red-600'>*</span></label>
                        <select
                            id="direccion"
                            {...register("direccion", {
                                required: {
                                value: true,
                                message: "Debe seleccionar el sentido de la meta"
                                }
                            })}
                            className={`${errors.direccion ? 'input-form-error': ''} input-form`}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="asc">Más alto es mejor (ej: % de cumplimiento)</option>
                            <option value="desc">Más bajo es mejor (ej: días de entrega, defectos)</option>
                        </select>
                        {errors.direccion && <p className="error-message">{errors.direccion.message}</p>}
                    </div>

                    {/* Valor de la meta */}
                    {isMetaAbsoluta ? (
                        <div>
                            <label htmlFor='goalValueOptimo' className='label-form'>Meta<span className='text-red-600'>*</span></label>
                            <div className='flex gap-2 items-center'>
                                <select 
                                    className={`${errors.valorMeta ? 'input-form-error' : ''} input-form w-[60px]`}
                                    {...register('valorMeta', {
                                        required: {
                                            value: true, 
                                            message: "Debe seleccionar un condicional."
                                        }
                                    })}
                                >
                                    <option value="mayor_que">&gt;</option>
                                    <option value="mayor_igual_que">&ge;</option>
                                    <option value="menor_que">&lt;</option>
                                    <option value="menor_igual_que">&le;</option>
                                </select>
                                <input 
                                    type="number" 
                                    className={`${errors.goalValueOptimo ? 'input-form-error' : ''} input-form w-[60px]`}
                                    id="goalValueOptimo"
                                    {...register('goalValueOptimo', {
                                        required: {
                                            value: true, 
                                            message: "El valor de la meta debe ser numérico."
                                        }
                                    })}
                                />
                                {/* {unidadMedidaSymbol && (
                                    <span>{unidadMedidaSymbol}</span>
                                )} */}
                            </div>
                            {(errors.valorMeta && errors.valorMeta.message) && (
                                <p className="input-message-error">{errors.valorMeta.message}</p>
                            )}
                            {(errors.goalValueOptimo && errors.goalValueOptimo.message) && (
                                <p className="input-message-error">{errors.goalValueOptimo.message}</p>
                            )}
                        </div>
                    ):(
                        <div>
                            <label className='label-form' htmlFor='goalValueOptimo'>Meta<span className='text-red-600'>*</span></label>
                            {/* Optimo */}
                            <div>
                                <div className='grid grid-cols-[80px_60px_100px] gap-2 items-center mt-2'>
                                    <label className='label-form'>Óptimo: </label> 
                                    <select 
                                        className={`${errors.goalConditionalOptimo ? 'input-form-error' : ''} input-form w-[60px]`}
                                        {...register('goalConditionalOptimo', {
                                            required: {
                                                value: true, 
                                                message: "Debe seleccionar un condicional."
                                            }
                                        })}
                                    >
                                        <option value="mayor_que">&gt;</option>
                                        <option value="mayor_igual_que">&ge;</option>
                                        <option value="menor_que">&lt;</option>
                                        <option value="menor_igual_que">&le;</option>
                                    </select>
                                    <div>
                                        <input 
                                            type="number" 
                                            id="goalValueOptimo"
                                            className={`${errors.goalValueOptimo ? 'input-form-error' : ''} input-form w-[60px]`}
                                            {...register('goalValueOptimo', {
                                                required: {
                                                    value: true, 
                                                    message: "El valor de la meta debe ser numérico."
                                                }
                                            })}
                                        />
                                        {/* {unidadMedidaSymbol && (
                                            <span className='ml-2'>{unidadMedidaSymbol}</span>
                                        )} */}
                                    </div>
                                </div>
                                {(errors.goalConditionalOptimo && errors.goalConditionalOptimo.message) && (
                                    <p className="input-message-error">{errors.goalConditionalOptimo.message}</p>
                                )}
                                {(errors.goalValueOptimo && errors.goalValueOptimo.message) && (
                                    <p className="input-message-error">{errors.goalValueOptimo.message}</p>
                                )}
                            </div>
                            
                            {/* Aceptable */}
                            <div>
                                <div className='grid grid-cols-[80px_60px_100px] gap-2 items-center mt-2'>
                                    <label className='label-form' htmlFor='goalValueAceptable'>Aceptable: </label> 
                                    <select 
                                        className={`${errors.goalConditionalAceptable ? 'input-form-error' : ''} input-form w-[60px]`}
                                        {...register('goalConditionalAceptable', {
                                            required: {
                                                value: true, 
                                                message: "Debe seleccionar un condicional."
                                            }
                                        })}
                                    >
                                        <option value="mayor_que">&gt;</option>
                                        <option value="mayor_igual_que">&ge;</option>
                                        <option value="menor_que">&lt;</option>
                                        <option value="menor_igual_que">&le;</option>
                                    </select>
                                    <div>
                                        <input 
                                            type="number" 
                                            className={`${errors.goalValueAceptable ? 'input-form-error' : ''} input-form w-[60px]`}
                                            id="goalValueAceptable"
                                            {...register('goalValueAceptable', {
                                                required: {
                                                    value: true, 
                                                    message: "El valor de la meta debe ser numérico."
                                                }
                                            })}
                                        />
                                        {/* {unidadMedidaSymbol && (
                                            <span className='ml-2'>{unidadMedidaSymbol}</span>
                                        )} */}
                                    </div>
                                </div>
                                {(errors.goalConditionalAceptable && errors.goalConditionalAceptable.message) && (
                                    <p className="input-message-error">{errors.goalConditionalAceptable.message}</p>
                                )}
                                {(errors.goalValueAceptable && errors.goalValueAceptable.message) && (
                                    <p className="input-message-error">{errors.goalValueAceptable.message}</p>
                                )}
                            </div>
                            
                            {/* Crítico */}
                            <div>
                                <div className='grid grid-cols-[80px_60px_100px] gap-2 items-center mt-2'>
                                    <label className='label-form' htmlFor='goalValueCritico'>Crítico: </label> 
                                    <select
                                        className={`${errors.goalConditionalCritico ? 'input-form-error': ''} input-form w-[60px]`}
                                        {...register('goalConditionalCritico', {
                                            required: {
                                                value: true, 
                                                message: "Debe seleccionar un condicional."
                                            }
                                        })}
                                    >
                                        <option value="mayor_que">&gt;</option>
                                        <option value="mayor_igual_que">&ge;</option>
                                        <option value="menor_que">&lt;</option>
                                        <option value="menor_igual_que">&le;</option>
                                    </select>
                                    <div>
                                        <input 
                                            type="number" 
                                            className={`${errors.goalValueCritico ? 'input-form-error' : ''} input-form w-[60px]`}
                                            id="goalValueCritico"
                                            {...register('goalValueCritico', {
                                                required: {
                                                    value: true, 
                                                    message: "El valor de la meta debe ser numérico."
                                                }
                                            })}
                                        />
                                        {/* {unidadMedidaSymbol && (
                                            <span className='ml-2'>{unidadMedidaSymbol}</span>
                                        )} */}
                                    </div>
                                </div>
                                {(errors.goalConditionalCritico && errors.goalConditionalCritico.message) && (
                                    <p className="input-message-error">{errors.goalConditionalCritico.message}</p>
                                )}
                                {(errors.goalValueCritico && errors.goalValueCritico.message) && (
                                    <p className="input-message-error">{errors.goalValueCritico.message}</p>
                                )}
                            </div>
                        </div>
                    )}
                </form>
            </Card>
        </div>
    );
};

export default CrearIndicadorPage;