import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import Table from '../../../../shared/components/Table'
import TableTbody from '../../../../shared/components/TableTbody'
import TableTr from '../../../../shared/components/TableTr'
import TableTd from '../../../../shared/components/TableTd'
import TableThead from '../../../../shared/components/TableThead'
import { LuInfo } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import MessageError from '../../../../shared/components/MessageError'
import { Tooltip } from "react-tooltip";
import { useFormulaEvaluator } from '../../hooks/useFormulaEvaluator';
import { calcularResultadoPeriodo, etiquetasResultado, getResultadoColor } from '../../utils/utils';
import VerEscalas from './VerEscalas';
import TableTh from '../../../../shared/components/TableTh';

const FormRegistro = (props) => {
    const {versionSeleccionada, onSubmitFormulario, cerrarModal, messageError, loading} = props;
    const {register, handleSubmit, setError, formState: { errors }, setValue, reset} = useForm({ mode: "onChange"})
    const [cambiosVariables, setCambiosVariables] = useState(0);
    const [valorVariables, setValorVariables] = useState([]);
    const [resultadoPeriodo, setResultadoPeriodo] = useState(); 
    const evaluarFormula = useFormulaEvaluator();

    useEffect(() => {
        setValue("fechaLibre", "2025-08-05");
        setValue("anio", 2025);
        setValue("mes", 12);
        setValue("analisis", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua")
    }, [])

    useEffect(() => {
        if (versionSeleccionada) {
            setValorVariables(
                versionSeleccionada.variables.map(v => ({
                    alias: v.alias,
                    valor: ""
                }))
            );
        }
    }, [versionSeleccionada]);

    // Calcular el resultado del período automaticamente
    useEffect(() => {
        const calcular = async () => {
            if (cambiosVariables > 0) {
                const calculoFormula = evaluarFormula(
                    versionSeleccionada?.formulaLatex,
                    valorVariables
                );

                if (calculoFormula === null) {
                    setResultadoPeriodo(null);
                    return;
                }

                const resultadoPeriodo = await calcularResultadoPeriodo(
                    versionSeleccionada?.metas?.[0],
                    calculoFormula
                );

                setResultadoPeriodo(resultadoPeriodo);
            }
        };

        calcular();
    }, [cambiosVariables]);

    const enviarFormulario = async (values) => {
        const data = {
            ...values,
            variables: valorVariables,
            versionId: versionSeleccionada?.id,
            resultado: resultadoPeriodo?.resultado,
            estadoResultado: resultadoPeriodo?.estadoResultado
        }
        await onSubmitFormulario(data, setError, setValue, setCambiosVariables, setValorVariables, reset);
    }
    
    return (
        <>
            <form onSubmit={handleSubmit(enviarFormulario)} autoComplete='off'>
                <div className="grid xl:grid-cols-2 gap-6">
                    <div>
                        {/* Frecuencia de medicion */}
                        <div>
                            {/* Libre */}
                            {versionSeleccionada?.frecuenciaMedicion === "libre" && (
                                <div>
                                    <label className="label-form" htmlFor='fechaLibre'>Fecha del período <span className="input-required">*</span></label>
                                    <input 
                                        type='date'
                                        className={`${errors.fechaLibre && errors.fechaLibre.message ? 'input-form-error' : ''} input-form`}
                                        {...register('fechaLibre', {
                                            required: {
                                                value: true,
                                                message: 'Debe seleccionar una fecha de registro.',
                                            },
                                        })}
                                        id="name"
                                    />
                                    {errors.fechaLibre && errors.fechaLibre.message && (<p className="input-message-error">{errors.fechaLibre.message}</p>)} 
                                </div>
                            )}

                            {/* Mensual */}
                            {versionSeleccionada?.frecuenciaMedicion === "mensual" && (<>
                                {/* Mes */}
                                <div>
                                    <label htmlFor="mes" className="label-form">Mes: <span className="input-required">*</span></label>
                                    <select 
                                        {...register("mes", {
                                            required: {
                                                value: true, 
                                                message: "Debe seleccionar un mes",
                                            }
                                        })}
                                        className={`${errors.mes ? 'select-form-error' : ''} select-form`}
                                    >
                                        <option value="" disabled selected>Seleccionar</option>
                                        <option value="1">Enero</option>
                                        <option value="2">Febrero</option>
                                        <option value="3">Marzo</option>
                                        <option value="4">Abril</option>
                                        <option value="5">Mayo</option>
                                        <option value="6">Junio</option>
                                        <option value="7">Julio</option>
                                        <option value="8">Agosto</option>
                                        <option value="9">Septiembre</option>
                                        <option value="10">Octubre</option>
                                        <option value="11">Noviembre</option>
                                        <option value="12">Diciembre</option>
                                    </select>
                                    {errors.mes && errors.mes.message && (<p className="input-message-error">{errors.mes.message}</p>)} 
                                </div>

                                {/* Año */}
                                <div>
                                    <label htmlFor="anio" className="label-form">
                                        Año: <span className="input-required">*</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        {...register("anio", {
                                            required: {
                                                value: true,
                                                message: "Debe ingresar un año"
                                            }
                                        })}
                                        className={`${errors.anio ? 'select-form-error' : ''} select-form`}
                                        id="anio" 
                                        name="anio" 
                                        min="2000" 
                                        max="2099" 
                                    ></input>
                                    {errors.anio && errors.anio.message && (<p className="input-message-error">{errors.anio.message}</p>)} 
                                </div>
                            </>)}

                            {/* Trimestral */}
                            {versionSeleccionada?.frecuenciaMedicion === "trimestral" && (<>
                                {/* Trimestre */}
                                <div>
                                    <label htmlFor="trimestre" className="label-form">Trimestre: <span className="input-required">*</span></label>
                                    <select 
                                        {...register("trimestre", {
                                            required: {
                                                value: true, 
                                                message: "Debe seleccionar un trimestre",
                                            }
                                        })}
                                        className={`${errors.trimestre ? 'select-form-error' : ''} select-form`}
                                    >
                                        <option value="1">Primer Trimestre (Ene-Mar)</option>
                                        <option value="2">Segundo Trimestre (Abr-Jun)</option>
                                        <option value="3">Tercer Trimestre (Jul-Sep)</option>
                                        <option value="4">Cuarto Trimestre (Oct-Dic)</option>
                                    </select>
                                    {errors.trimestre && errors.trimestre.message && (<p className="input-message-error">{errors.trimestre.message}</p>)} 
                                </div>
                                {/* Año */}
                                <div>
                                    <label htmlFor="anio" className="label-form">
                                        Año: <span className="input-required">*</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        {...register("anio", {
                                            required: {
                                                value: true,
                                                message: "Debe ingresar un año"
                                            }
                                        })}
                                        className={`${errors.anio ? 'select-form-error' : ''} select-form`}
                                        id="anio" 
                                        name="anio" 
                                        min="2000" 
                                        max="2099" 
                                    ></input>
                                    {errors.anio && errors.anio.message && (<p className="input-message-error">{errors.anio.message}</p>)} 
                                </div>
                            </>)}
                            
                            {/* Semestral */}
                            {versionSeleccionada?.frecuenciaMedicion === "semestral" && (<>
                                {/* Semestre */}
                                <label htmlFor="semestre" className="label-form">
                                    Semestre: <span className="input-required">*</span>
                                </label>
                                <select 
                                    {...register("semestre", {
                                        required: {
                                            value: true, 
                                            message: "Debe seleccionar un semestre",
                                        }
                                    })}
                                    className={`${errors.semestre ? 'select-form-error' : ''} select-form`}
                                >
                                    <option value="1">Primer Semestre (Ene-Jun)</option>
                                    <option value="2">Segundo Semestre (Jul-Dic)</option>
                                </select>

                                {/* Año */}
                                <div>
                                    <label htmlFor="anio" className="label-form">
                                        Año: <span className="input-required">*</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        {...register("anio", {
                                            required: {
                                                value: true,
                                                message: "Debe ingresar un año"
                                            }
                                        })}
                                        className={`${errors.anio ? 'select-form-error' : ''} select-form`}
                                        id="anio" 
                                        name="anio" 
                                        min="2000" 
                                        max="2099" 
                                    ></input>
                                    {errors.anio && errors.anio.message && (<p className="input-message-error">{errors.anio.message}</p>)} 
                                </div>
                            </>)}

                            {/* Anual */}
                            {versionSeleccionada?.frecuenciaMedicion === "anual" && (<>
                                {/* Año */}
                                <div>
                                    <label htmlFor="anio" className="label-form">
                                        Año: <span className="input-required">*</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        {...register("anio", {
                                            required: {
                                                value: true,
                                                message: "Debe ingresar un año"
                                            }
                                        })}
                                        className={`${errors.anio ? 'select-form-error' : ''} select-form`}
                                        id="anio" 
                                        name="anio" 
                                        min="2000" 
                                        max="2099" 
                                    ></input>
                                    {errors.anio && errors.anio.message && (<p className="input-message-error">{errors.anio.message}</p>)} 
                                </div>
                            </>)}
                        </div>

                        <div>
                            {/* Variables */}
                            <div className='mt-2'>
                                <h3 className='font-semibold'>Valores </h3>
                                {versionSeleccionada?.variables.map(variable => <div className='mt-2' key={variable.id}>
                                    <div className="flex items-center gap-1">
                                        <label className='label-form mb-0'>{variable.alias} <span className='text-red-600 mr-.5'>*</span></label>
                                        <button 
                                            type='button'
                                            data-tooltip-id="home-tip"
                                            data-tooltip-content={variable.descripcion}
                                        >
                                            <LuInfo />
                                        </button>
                                    </div>
                                    <input
                                        type='number'
                                        className='input-form'
                                        value={ valorVariables.find(v => v.alias === variable.alias)?.valor ?? "" }
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setValorVariables(prev =>
                                                prev.map(item =>
                                                    item.alias === variable.alias
                                                        ? { ...item, valor: value }
                                                        : item
                                                )
                                            );
                                            setCambiosVariables(x => x + 1);
                                        }}
                                    />
                                </div>)}
                            </div>
                        </div>

                        {/* Análisis */}
                        <div className='mt-2'>
                            <label className="label-form" htmlFor='analisis'>
                                Análisis<span className="text-red-600">*</span>
                            </label>
                            <textarea 
                                className='input-form h-20 resize-none' 
                                {...register("analisis", { 
                                    required: true,

                                })}
                            ></textarea>
                            {errors.analisis && errors.analisis.message && (<p className="input-message-error">{errors.analisis.message}</p>)} 
                        </div>
                        <p className='text-sm my-2'>
                            <span className='text-red-600 mr-.5'>*</span> Los campos con asteriscos son obligatorios
                        </p>
                
                    </div>
                    {!resultadoPeriodo && (<div 
                        className='flex items-center justify-center h-full w-full bg-gray-50 rounded-xl'
                    >
                        <p className='text-gray-800 text-sm'>Dígite los valores de las variables para calcular el período</p>
                    </div>)}
                    {resultadoPeriodo && (
                        <div className="opacity-0 animate-fadeIn">
                            <Table className='table-fixed'>
                                <TableThead>
                                    <TableTr>
                                        <TableTh colSpan={`2`} className='text-center'>Resultado del período</TableTh>
                                    </TableTr>
                                </TableThead>
                                <TableTbody>
                                    <TableTr>
                                        <TableTd className='w-1/2 text-left'>Valor</TableTd>
                                        <TableTd className='w-1/2'>{resultadoPeriodo?.resultado}</TableTd>
                                    </TableTr>
                                    <TableTr>
                                        <TableTd className='text-left'>Resultado</TableTd>
                                        <TableTd>
                                            <div
                                                className={`p-2 rounded-md flex justify-center font-semibold text-sm
                                                    ${getResultadoColor(resultadoPeriodo?.estadoResultado)}`}
                                            >
                                                <span>{etiquetasResultado[resultadoPeriodo?.estadoResultado]}</span>
                                            </div>
                                        </TableTd>
                                    </TableTr>
                                </TableTbody>
                            </Table>
                            <VerEscalas 
                                versionSeleccionada = {versionSeleccionada}
                            />
                        </div>
                    )}
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
                        type="submit"
                        colorButton="primary"
                        textButton="Guardar cambios"
                        loading={loading}
                    />
                </div>
            </form>
            <Tooltip id="home-tip" place="top" />
        </>
    );
};

export default FormRegistro;