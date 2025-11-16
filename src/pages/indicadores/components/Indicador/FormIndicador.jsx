import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LuChevronDown } from 'react-icons/lu';
import FormulaEditor from '../FormulaEditor';
import Variables from '../Variables';
import MessageError from '../../../../shared/components/MessageError';
import Button from '../../../../shared/components/Button';
import SkeletonElement from '../../../../shared/components/SkeletonElement';
import Table from '../../../../shared/components/Table';
import TableTh from '../../../../shared/components/TableTh';
import TableThead from '../../../../shared/components/TableThead';
import TableTd from '../../../../shared/components/TableTd';
import TableTbody from '../../../../shared/components/TableTbody';
import TableTr from '../../../../shared/components/TableTr';
import { toast } from 'sonner';

const FormIndicador = (props) => {
    const { tipoFormulario = "crear", versionSeleccionada, procesos = [], loadingIndicador = false, onSubmitForm } = props;
    const {register, handleSubmit, setError, formState: { errors }, clearErrors, setValue} = useForm({ mode: 'onChange' });
    const [unidadMedidaSymbol, setUnidadMediaSymbol] = useState("%");
    const [variables, setVariables] = useState([]);
    const [isMetaAbsoluta, setIsMetaAbsoluta] = useState(true);
    const [messageError, setMessageError] = useState(false);
    const [formulaLaTex, setFormulaLaTex] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const enviarFormulario = () => {
        handleSubmit(onSubmit)();
    }

    useEffect(() => {
        if(versionSeleccionada?.variables){
            setVariables(versionSeleccionada.variables)
        }
    }, [versionSeleccionada])

    const onSubmit = async (data) => {
        clearErrors("formulaLaTex");
        clearErrors("variables");
        setMessageError(false);
        
        // Validaciones
        if(formulaLaTex.length === 0){
            setError("formulaLaTex", {
                type: "manual", 
                message: "La formula no puede estar vacía"
            })
            return;
        } if(variables.length === 0){
            setError("variables", {
                type: "manual", 
                message: "Debe enviar al menos una variable"
            })
            return;
        }
        try {
            const indicadorModificado = await onSubmitForm(
                setLoading, 
                data,
                formulaLaTex,
                variables,
                setError, 
                setMessageError, 
                versionSeleccionada?.id,
            )
            if(versionSeleccionada){
                navigate(`/indicadores/${versionSeleccionada?.id}`);
            }else{
                navigate(`/indicadores/${indicadorModificado?.versiones[0]?.id}`);
            }   

            if(tipoFormulario === "crear"){
                toast.success("Indicador creado exitosamente");
            }else if(tipoFormulario === "editar"){
                toast.success("Indicador editado exitosamente");
            } else {
                toast.success("Indicador eliminado exitosamente");
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() =>{
        if(tipoFormulario === "crear"){
            setValue("nombre", "Nombre del indicador");
            setValue("proposito", "El propósito  del indicador");
            setValue("descripcion", "La descripción del indicador");
            setValue("frecuenciaMedicion", "mensual");
            setValue("unidadMedida", "porcentaje");
            setValue("tipoMeta", "absoluta");
            setValue("direccion", "asc");
        }else if((tipoFormulario === "editar" || tipoFormulario === "actualizar") && versionSeleccionada){
            setValue("nombre", versionSeleccionada.nombre);
            setValue("proposito", versionSeleccionada.proposito);
            setValue("descripcion", versionSeleccionada.descripcion);
            setValue("frecuenciaMedicion", versionSeleccionada.frecuenciaMedicion);
            setValue("unidadMedida", versionSeleccionada.unidadMedida);
            setValue("version", versionSeleccionada.version);
            setFormulaLaTex(versionSeleccionada.formulaLatex)
            
            if(versionSeleccionada?.metas[0]){
                setValue("tipoMeta", versionSeleccionada?.metas[0]?.tipoMeta);
                setValue("direccion", versionSeleccionada?.metas[0]?.direccion);
                setIsMetaAbsoluta(versionSeleccionada?.metas[0]?.tipoMeta === "absoluta")
                if(versionSeleccionada?.metas[0]?.tipoMeta === "absoluta"){
                    setValue("valorMeta", versionSeleccionada?.metas[0]?.valorMeta);
                }else if(versionSeleccionada?.metas[0]?.tipoMeta === "escala"){
                    setValue("critico", versionSeleccionada?.metas[0]?.critico);
                    setValue("aceptable", versionSeleccionada?.metas[0]?.aceptable);
                    setValue("optimo", versionSeleccionada?.metas[0]?.optimo);
                }
            }
        }
    }, [versionSeleccionada])

    return (
        <div>
            {/* Título del tipo de formulario */}
            <h2 className='font-semibold text-2xl'>{
                tipoFormulario === "crear" ? "Crear indicador":
                tipoFormulario === "editar" ? "Editar indicador":
                tipoFormulario === "actualizar" ? "Actualizar indicador": ""
            }</h2>

            <form className='mt-7' autoComplete='off'>
                <div className='grid grid-cols-2 items-start gap-4'>
                    <div className='grid gap-2'>
                        {loadingIndicador && (<>
                            {/* Nombre del indicador */}
                            <div>
                                <SkeletonElement className="w-[150px] h-4" />
                                <SkeletonElement className="w-[full] h-10 mt-2" />
                            </div>

                            {/* Propósito */}
                            <div>
                                <SkeletonElement className="w-[150px] h-4" />
                                <SkeletonElement className="w-[full] h-10 mt-2" />
                            </div>

                            {/* Descripción */}
                            <div>
                                <SkeletonElement className="w-[150px] h-4" />
                                <SkeletonElement className="w-[full] h-10 mt-2" />
                            </div>

                            {/* Frecuencia de medición */}
                            <div>
                                <SkeletonElement className="w-[150px] h-4" />
                                <SkeletonElement className="w-[full] h-10 mt-2" />
                            </div>
                        </>)}
                        {!loadingIndicador && <>
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
                                <div className='relative'>
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
                                    <LuChevronDown className='absolute top-3.5 right-3' />
                                </div>
                                {(errors.frecuenciaMedicion && errors.frecuenciaMedicion.message) && (
                                    <p className="input-message-error">{errors.frecuenciaMedicion.message}</p>
                                )}
                            </div>
                        </>}
                    </div>
                    <div className='grid gap-2'>

                        {loadingIndicador && (<>
                            {/* Unidad de medida */}
                            <div>
                                <SkeletonElement className="w-[150px] h-4" />
                                <SkeletonElement className="w-[full] h-10 mt-2" />
                            </div>

                            {/* Proceso */}
                            {tipoFormulario === "crear" && (
                                <div>
                                    <SkeletonElement className="w-[150px] h-4" />
                                    <SkeletonElement className="w-[full] h-10 mt-2" />
                                </div>
                            )}

                            {/* Tipo de meta */}
                            <div>
                                <SkeletonElement className="w-[150px] h-4" />
                                <SkeletonElement className="w-[full] h-10 mt-2" />
                            </div>

                            {/* Sentido de la meta */}
                            <div>
                                <SkeletonElement className="w-[150px] h-4" />
                                <SkeletonElement className="w-[full] h-10 mt-2" />
                            </div>

                            {/* Valor de la meta */}
                            <div>
                                <SkeletonElement className="w-[150px] h-4" />
                                <SkeletonElement className="w-[full] h-10 mt-2" />
                            </div>
                        </>)}

                        {!loadingIndicador && (<>

                            {/* Nueva versión del indicador */}
                            <div>
                                <label htmlFor="version" className='label-form'>Nueva versión del indicador<span className='text-red-600'>*</span></label>
                                <input
                                    type="number"
                                    className={`input-form ${errors.version ? 'input-form-error' : ''}`}
                                    id="version"
                                        {...register("version", {
                                            required: "Debe ingresar una versión",
                                            valueAsNumber: true,   // convierte el valor a número automáticamente
                                            min: {
                                                value: 1,
                                                message: "La versión debe ser mayor que 0"
                                            },
                                        })}
                                />

                                {(errors.unidadMedida && errors.unidadMedida.message) && (
                                    <p className="input-message-error">{errors.unidadMedida.message}</p>
                                )}
                            </div>  

                            {/* Motivo de la nueva versión */}
                            <div>
                                <label htmlFor="motivoVersion" className='label-form'>
                                    Motivo de la nueva versión <span className='text-red-600'>*</span>
                                </label>

                                <textarea
                                    id="motivoVersion"
                                    className={`input-form ${errors.motivoVersion ? 'input-form-error' : ''} h-20`}
                                    {...register("motivoVersion", {
                                        required: {
                                            value: true,
                                            message: "Debe ingresar el motivo de la nueva versión"
                                        },
                                        maxLength: {
                                            value: 250,
                                            message: "El motivo no debe superar los 250 caracteres"
                                        },
                                        validate: value =>
                                            typeof value === "string" || "El motivo debe ser texto"
                                    })}
                                />

                                {errors.motivoVersion && (
                                    <p className="input-message-error">{errors.motivoVersion.message}</p>
                                )}
                            </div>

                            {/* Unidad medida */}
                            <div>
                                <label htmlFor="unidadMedida" className='label-form'>Unidad de medida<span className='text-red-600'>*</span></label>
                                <div className="relative">
                                    <select 
                                        className={`input-form ${errors.unidadMedida ? 'input-form-error' : ''}`}
                                        id="unidadMedida"
                                        {...register('unidadMedida', {
                                            required: {
                                                value: true,
                                                message: "Debe seleccionar una unidad de medida válida"
                                            }, 
                                            onChange: (e) => setUnidadMediaSymbol(e.target.value === "porcentaje"? "%":"")
                                        })}
                                    >
                                        <option value="">Seleccionar...</option>
                                        <option value="cantidad">Cantidad</option>
                                        <option value="porcentaje">Porcentaje</option>
                                    </select>
                                    <LuChevronDown className='absolute top-3.5 right-3' />
                                </div>
                                {(errors.unidadMedida && errors.unidadMedida.message) && (
                                    <p className="input-message-error">{errors.unidadMedida.message}</p>
                                )}
                            </div>  

                            {/* Proceso */}
                            {tipoFormulario === "crear" && (
                                <div>
                                    <label htmlFor="procesoId" className='label-form'>Proceso<span className='text-red-600'>*</span></label>
                                    <div className="relative">
                                        <select 
                                            className={`input-form ${errors.procesoId ? 'input-form-error' : ''}`}
                                            id="procesoId"
                                            {...register('procesoId', {
                                                required: {
                                                    value: true,
                                                    message: "Debe seleccionar un proceso"
                                                }
                                            })}
                                        >
                                            <option value="">Seleccionar...</option>
                                            {procesos.map(proceso => 
                                                <option value={proceso.id} key={proceso.id}>{proceso.nombre}</option>
                                                )}
                                        </select>
                                        <LuChevronDown className='absolute top-3.5 right-3' />
                                    </div>
                                    {(errors.procesoId && errors.procesoId.message) && (
                                        <p className="input-message-error">{errors.procesoId.message}</p>
                                    )}
                                </div>
                            )}

                            {/* Tipo de meta */}
                            <div>
                                <label htmlFor="tipoMeta" className='label-form'>Tipo de meta<span className='text-red-600'>*</span></label>
                                <div className="relative">
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
                                        <option value="">Seleccionar...</option>
                                        <option value="absoluta">Absoluta</option>
                                        <option value="escala">Escala</option>
                                    </select>
                                    <LuChevronDown className='absolute top-3.5 right-3' />
                                </div>
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
                                    <option value="asc">Más alto es mejor (ej: 95% de cumplimiento)</option>
                                    <option value="desc">Más bajo es mejor (ej: 5 días de entrega, defectos)</option>
                                </select>
                                {errors.direccion && <p className="error-message">{errors.direccion.message}</p>}
                            </div>

                            {/* Valor de la meta */}
                            {isMetaAbsoluta ? (
                                <div>
                                    <label htmlFor='valorMeta' className='label-form'>Valor de la meta<span className='text-red-600'>*</span></label>
                                    <div className='flex gap-2 items-center'>
                                        <input 
                                            type="number" 
                                            className={`${errors.valorMeta ? 'input-form-error' : ''} input-form w-[90px]`}
                                            id="valorMeta"
                                            {...register('valorMeta', {
                                                required: {
                                                    value: true, 
                                                    message: "El valor de la meta debe ser numérico."
                                                }
                                            })}
                                            min={0}
                                        />
                                        {unidadMedidaSymbol && (
                                            <span>{unidadMedidaSymbol}</span>
                                        )}
                                    </div>
                                    {(errors.valorMeta && errors.valorMeta.message) && (
                                        <p className="input-message-error">{errors.valorMeta.message}</p>
                                    )}
                                </div>
                            ):(
                                <div>
                                    <label className='label-form' htmlFor='optimo'>Valor de la meta<span className='text-red-600'>*</span></label>
                                    {/* Optimo */}
                                    <div>
                                        <div className='grid grid-cols-[80px_90px_100px] gap-2 items-center mt-2'>
                                            <label className='label-form'>Óptimo: </label> 
                                            <input 
                                                type="number" 
                                                id="optimo"
                                                className={`${errors.optimo ? 'input-form-error' : ''} input-form w-[90px]`}
                                                {...register('optimo', {
                                                    required: {
                                                        value: true, 
                                                        message: "El valor de la meta debe ser numérico."
                                                    }
                                                })}
                                                min={0}
                                            />
                                            {unidadMedidaSymbol && (
                                                <span>{unidadMedidaSymbol}</span>
                                            )}
                                        </div>
                                        {(errors.optimo && errors.optimo.message) && (
                                            <p className="input-message-error">{errors.optimo.message}</p>
                                        )}
                                    </div>
                                    
                                    {/* Aceptable */}
                                    <div>
                                        <div className='grid grid-cols-[80px_90px_100px] gap-2 items-center mt-2'>
                                            <label className='label-form' htmlFor='aceptable'>Aceptable: </label> 
                                            <input 
                                                type="number" 
                                                className={`${errors.aceptable ? 'input-form-error' : ''} input-form w-[90px]`}
                                                id="aceptable"
                                                {...register('aceptable', {
                                                    required: {
                                                        value: true, 
                                                        message: "El valor de la meta debe ser numérico."
                                                    }
                                                })}
                                                min={0}
                                            />
                                            {unidadMedidaSymbol && (
                                                <span>{unidadMedidaSymbol}</span>
                                            )}
                                        </div>
                                        {(errors.aceptable && errors.aceptable.message) && (
                                            <p className="input-message-error">{errors.aceptable.message}</p>
                                        )}
                                    </div>
                                    
                                    {/* Crítico */}
                                    <div>
                                        <div className='grid grid-cols-[80px_90px_100px] gap-2 items-center mt-2'>
                                            <label className='label-form' htmlFor='critico'>Crítico: </label> 
                                            <input 
                                                type="number" 
                                                className={`${errors.critico ? 'input-form-error' : ''} input-form w-[90px]`}
                                                id="critico"
                                                {...register('critico', {
                                                    required: {
                                                        value: true, 
                                                        message: "El valor de la meta debe ser numérico."
                                                    }
                                                })}
                                                min={0}
                                            />
                                            {unidadMedidaSymbol && (
                                                <span>{unidadMedidaSymbol}</span>
                                            )}
                                        </div>
                                        {(errors.critico && errors.critico.message) && (
                                            <p className="input-message-error">{errors.critico.message}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                        </>)}
                    </div>
                </div>

                <div className="grid grid-cols-2 mt-6 gap-4">
                    
                </div>
            </form>

            <div className='mt-6'>
                {loadingIndicador && <>
                    <div>
                        <SkeletonElement className="w-[150px] h-4" />
                        <SkeletonElement className="w-[full] h-10 mt-2" />
                    </div>

                    <div className='mt-4'>
                        <SkeletonElement className="w-[150px] h-4" />
                        <Table>
                            <TableThead>
                                <TableTr>
                                    <TableTh>Nombre de la variable</TableTh>
                                    <TableTh>Alias</TableTh>
                                    <TableTh>Descripción</TableTh>
                                    <TableTh>Acciones</TableTh>
                                </TableTr>
                            </TableThead>
                            <TableTbody>
                                <TableTr>
                                    <TableTd>
                                        <SkeletonElement className="w-[150px] h-4" />
                                    </TableTd>
                                    <TableTd>
                                        <SkeletonElement className="w-[150px] h-4" />
                                    </TableTd>
                                    <TableTd>
                                        <SkeletonElement className="w-[150px] h-4" />
                                    </TableTd>
                                    <TableTd>
                                        <SkeletonElement className="w-[150px] h-4" />
                                    </TableTd>
                                </TableTr>
                            </TableTbody>
                        </Table>
                    </div>
                </>}

                {!loadingIndicador && <>
                    {/* Fórmula */}
                    <FormulaEditor 
                        variables={variables}
                        setValueFormula={setFormulaLaTex}
                        valueFormula = {formulaLaTex}
                        setError = {setError}
                        clearErrors = {clearErrors}
                        errors =  {errors}
                    />
                    
                    {/* Variables */}
                    <Variables 
                        setVariables = {setVariables} 
                        variables = {variables} 
                        setError = {setError}
                        clearErrors = {clearErrors}
                        errors =  {errors}
                    />
                </>}
            </div>
            {messageError && 
                <MessageError>{messageError}</MessageError>
            }

            <div className="flex items-center gap-2 mt-6">
                <Button
                    type={`button`}
                    textButton={`Guardar cambios`}
                    colorButton={`primary`}
                    loading={loading}
                    onClick={() => enviarFormulario()}
                ></Button>
                <Button
                    type={`button`}
                    textButton={`Cancelar`}
                    colorButton={`danger`}
                    onClick={() => {
                        navigate("/indicadores");
                    }}
                >
                </Button>
            </div>
        </div>
    );
};

export default FormIndicador;