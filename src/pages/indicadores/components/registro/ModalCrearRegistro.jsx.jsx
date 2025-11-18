import React, { useState } from 'react'
import Modal from '../../../../shared/components/Modal'
import { useForm } from 'react-hook-form'
import Button from '../../../../shared/components/Button'
import { handleErrors } from '../../../../utils/handleErrors'
import { toast } from 'sonner'
import MessageError from '../../../../shared/components/MessageError'

const ModalCrearRegistro = (props) => {
    const {register, handleSubmit, setError, formState: { errors }, setValue, reset} = useForm({ mode: "onChange"})
    const [messageError, setMessageError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {cerrarModal, setEmpresas} = props;
    const [frecuenciaMedicion, setFrecuenciaMedicion] = useState("libre");

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

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Crear registro"
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                {/* Frecuencia de medicion */}
                <div>
                    {frecuenciaMedicion === "libre" && (
                        <div>
                            <label className="label-form" htmlFor='fechaRegistro'>Fecha del período<span className="text-red-600">*</span></label>
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

                    {frecuenciaMedicion === "mensual" && (
                        <div>
                            <label className="label-form" htmlFor='fechaRegistro'>Fecha del período<span className="text-red-600">*</span></label>
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

                    {frecuenciaMedicion === "trimestral" && (<>
                        <label for="quarter" className="label-form">Selecciona el trimestre:</label>
                        <select className='select-form' name="quarter" id="quarter">
                            <option value="Q1">Primer Trimestre (Ene-Mar)</option>
                            <option value="Q2">Segundo Trimestre (Abr-Jun)</option>
                            <option value="Q3">Tercer Trimestre (Jul-Sep)</option>
                            <option value="Q4">Cuarto Trimestre (Oct-Dic)</option>
                        </select>

                        <label for="year" className="label-form">Selecciona el año:</label>
                        <input type="number" className='input-form' id="year" name="year" min="2000" max="2099" value="2025"></input>
                    </>)}

                    {frecuenciaMedicion === "semestral" && (<>
                        <label for="semester" className="label-form">Selecciona el semestre:</label>
                            <select name="semester" id="semester" className='select-form'>
                            <option value="H1">Primer Semestre (Ene-Jun)</option>
                            <option value="H2">Segundo Semestre (Jul-Dic)</option>
                        </select>

                        <label for="year" className="label-form">Selecciona el año:</label>
                        <input className='input-form' type="number" id="year" name="year" min="2000" max="2099" value="2025" />
                    </>)}

                    {frecuenciaMedicion === "anual" && (<>
                        <label for="year" className="label-form">Selecciona un período</label>
                        <input className='input-form' type="number" id="year" name="year" min="1900" max="2099" step="1" placeholder="YYYY" value="2025"/>
                    </>)}
                </div>
                <div>
                    {/* Variables */}
                    <div className='mt-2'>
                        <h3 className='font-semibold'>Variables: </h3>
                        <div className='mt-2'>
                            <label className='label-form'>Citas <span className='text-red-600 mr-.5'>*</span></label>
                            <input className='input-form bg-white'/>
                        </div>
                    </div>
                </div>

                <div className='bg-gray-100 rounded-xl p-4 mt-4'>
                    {/* Resultado del período */}
                    <div className=''>
                        <h2 className='font-bold text-center'>Resultado del período</h2>
                        <div className="rounded-md grid grid-cols-2 text-center mt-4">
                            <div>
                                <h2 className='font-semibold'>Valor</h2>
                                <span>210</span>
                            </div>
                            <div>
                                <h2 className='font-semibold'>Escala</h2>
                                <div className='p-2 rounded-md bg-green-200 flex justify-center font-semibold text-sm'>
                                    <span>Optimo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
        </Modal>
    )
}

export default ModalCrearRegistro