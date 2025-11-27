import React, { useEffect, useState } from 'react'
import Modal from '../../../../shared/components/Modal'
import { useForm } from 'react-hook-form'
import Button from '../../../../shared/components/Button'
import MessageError from '../../../../shared/components/MessageError'
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { LuInfo } from 'react-icons/lu'
import {useFormulaEvaluator} from '../../hooks/useFormulaEvaluator'
import { calcularResultadoPeriodo, etiquetasResultado, getResultadoColor } from '../../utils/utils'
import Table from '../../../../shared/components/Table'
import TableTbody from '../../../../shared/components/TableTbody'
import TableTr from '../../../../shared/components/TableTr'
import TableTd from '../../../../shared/components/TableTd'
import ModalVerEscalas from './ModalVerEscalas'
import TableThead from '../../../../shared/components/TableThead'

const ModalCrearRegistro = (props) => {
    const {register, handleSubmit, setError, formState: { errors }, setValue, reset} = useForm({ mode: "onChange"})
    const [messageError, setMessageError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {cerrarModal, versionSeleccionada} = props;
    const [cambiosVariables, setCambiosVariables] = useState(0);
    const [valorVariables, setValorVariables] = useState([]);
    const [resultadoPeriodo, setResultadoPeriodo] = useState(); 
    const [modalActivo, setModalActivo] = useState("");
    const evaluarFormula = useFormulaEvaluator();

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

    const onSubmit = async(values) => {
        // setMessageError(false)
        // setLoading(true)
        // try {
        //     const result = await crearEmpresa(values)
        //     const { data } = result 
        //     setEmpresas(prevGrupos => [data, ...prevGrupos]);
        //     cerrarModal();
        //     setValue("nombre", "");
        //     toast.success(`La empresa ha sido creada exitosamente.`);
        //     reset();
        // } catch (error) {
        //     handleErrors(error, setError, setMessageError);
        // } finally{
        //     setLoading(false)
        // }
    }

    return (<>
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Crear registro"
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                {/* Frecuencia de medicion */}
                <div>
                    {versionSeleccionada?.frecuenciaMedicion === "libre" && (
                        <div>
                            <label className="label-form" htmlFor='fechaRegistro'>Fecha del período <span className="input-required">*</span></label>
                            <input 
                                type='date'
                                className={`${errors.fechaRegistro && errors.fechaRegistro.message ? 'input-form-error' : ''} input-form`}
                                {...register('fechaRegistro', {
                                    required: {
                                        value: true,
                                        message: 'Debe seleccionar una fecha de registro.',
                                    },
                                })}
                                id="name"
                            />
                            {errors.fechaRegistro && errors.fechaRegistro.message && (<p className="input-message-error">{errors.fechaRegistro.message}</p>)} 
                        </div>
                    )}

                    {versionSeleccionada?.frecuenciaMedicion === "mensual" && (
                        <div>
                            <label className="label-form" htmlFor='fechaRegistro'>Fecha del período <span className="input-required">*</span></label>
                            <input 
                                type='month'
                                className={`${errors.fechaRegistro && errors.fechaRegistro.message ? 'input-form-error' : ''} input-form`}
                                {...register('fechaRegistro', {
                                    required: {
                                        value: true,
                                        message: 'Debe seleccionar una fecha de registro.',
                                    },
                                })}
                                id="name"
                            />
                            {errors.fechaRegistro && errors.fechaRegistro.message && (<p className="input-message-error">{errors.fechaRegistro.message}</p>)} 
                        </div>
                    )}

                    {versionSeleccionada?.frecuenciaMedicion === "trimestral" && (<>
                        <label htmlFor="quarter" className="label-form">Selecciona el trimestre: <span className="input-required">*</span></label>
                        <select className='select-form' name="quarter" id="quarter">
                            <option value="Q1">Primer Trimestre (Ene-Mar)</option>
                            <option value="Q2">Segundo Trimestre (Abr-Jun)</option>
                            <option value="Q3">Tercer Trimestre (Jul-Sep)</option>
                            <option value="Q4">Cuarto Trimestre (Oct-Dic)</option>
                        </select>

                        <label htmlFor="year" className="label-form">Selecciona el año: <span className="input-required">*</span></label>
                        <input type="number" className='input-form' id="year" name="year" min="2000" max="2099" value="2025"></input>
                    </>)}

                    {versionSeleccionada?.frecuenciaMedicion === "semestral" && (<>
                        <label htmlFor="semester" className="label-form">Selecciona el semestre: <span className="input-required">*</span></label>
                            <select name="semester" id="semester" className='select-form'>
                            <option value="H1">Primer Semestre (Ene-Jun)</option>
                            <option value="H2">Segundo Semestre (Jul-Dic)</option>
                        </select>

                        <label htmlFor="year" className="label-form">Selecciona el año: <span className="input-required">*</span></label>
                        <input className='input-form' type="number" id="year" name="year" min="2000" max="2099" value="2025" />
                    </>)}

                    {versionSeleccionada?.frecuenciaMedicion === "anual" && (<>
                        <label htmlFor="year" className="label-form">Selecciona un período <span className="input-required">*</span></label>
                        <input className='input-form' type="number" id="year" name="year" min="1900" max="2099" step="1" placeholder="YYYY" value="2025"/>
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

                {resultadoPeriodo && (
                    <div className="opacity-0 animate-fadeIn">
                        <Table className='table-fixed'>
                            <TableThead>
                                <TableTr>
                                    <TableTd colSpan={`2`} className='font-semibold'>Resultado del período</TableTd>
                                </TableTr>
                            </TableThead>
                            <TableTbody>
                                <TableTr>
                                    <TableTd className='w-1/2 text-left'>Valor</TableTd>
                                    <TableTd className='w-1/2'>{resultadoPeriodo?.resultado}</TableTd>
                                </TableTr>
                                <TableTr>
                                    <TableTd className='text-left'>Escala</TableTd>
                                    <TableTd>
                                        <div
                                            className={`p-2 rounded-md flex justify-center font-semibold text-sm
                                                ${getResultadoColor(resultadoPeriodo?.resultadoPeriodo)}`}
                                        >
                                            <span>{etiquetasResultado[resultadoPeriodo?.resultadoPeriodo]}</span>
                                        </div>
                                    </TableTd>
                                </TableTr>
                            </TableTbody>
                        </Table>
                        <Button 
                            className="mt-3"
                            type={`button`}
                            textButton={`Ver escalas`}
                            colorButton={`secondary`}
                            onClick ={() => {
                                setModalActivo("ver-escalas")
                            }}
                        />
                    </div>
                )}

                {/* Análisis */}
                <div className='mt-2'>
                    <label className="label-form" htmlFor='analisis'>Análisis<span className="text-red-600">*</span></label>
                    <textarea className='input-form h-20 resize-none' name="" id=""></textarea>
                    {errors.analisis && errors.analisis.message && (<p className="input-message-error">{errors.analisis.message}</p>)} 
                </div>
                <p className='text-sm my-2'>
                    <span className='text-red-600 mr-.5'>*</span> Los campos con asteriscos son obligatorios
                </p>
                
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
        </Modal>
        {modalActivo && (
            <ModalVerEscalas
                versionSeleccionada = {versionSeleccionada}
                cerrarModal={() => setModalActivo("")}
            />
        )}
    </>)
}

export default ModalCrearRegistro