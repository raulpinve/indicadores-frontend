import React, { useState } from 'react';
import Card from '../../../shared/components/Card';
import { LuPencil, LuRotateCcw, LuTrash2 } from 'react-icons/lu';
import Button from '../../../shared/components/Button';
import { useNavigate } from 'react-router-dom';
import SkeletonElement from '../../../shared/components/SkeletonElement';
import ModalEliminarIndicador from './Indicador/ModalEliminarIndicador';

const FichaTecnica = (props) => {
    const {loadingPage, versionSeleccionada} = props;
    const [modalActivo, setModalActivo] = useState("");
    const navigate = useNavigate();

    return (
        <Card>
            <h2 className='font-semibold text-lg'>Ficha técnica</h2>

            {/* Loading */}
            {loadingPage && !versionSeleccionada && (
                <div>
                    {/* Propósito */}
                    <div className='grid gap-2 mt-4 text-sm'>
                        <SkeletonElement className="w-[120px] h-4" />
                        <SkeletonElement className="w-full h-8" />
                    </div>

                    {/* Descripción */}
                    <div className='grid gap-2 mt-4 text-sm'>
                        <SkeletonElement className="w-[120px] h-4" />
                        <SkeletonElement className="w-full h-8" />
                    </div>

                    {/* Frecuencia de medición */}
                    <div className='grid gap-2 mt-4 text-sm'>
                        <SkeletonElement className="w-[120px] h-4" />
                        <SkeletonElement className="w-full h-4" />
                    </div>

                    {/* Unidad de medida */}
                    <div className='grid gap-2 mt-4 text-sm'>
                        <SkeletonElement className="w-[120px] h-4" />
                        <SkeletonElement className="w-full h-4" />
                    </div>

                    {/* Tipo de meta */}
                    <div className='grid gap-2 mt-4 text-sm'>
                        <SkeletonElement className="w-[120px] h-4" />
                        <SkeletonElement className="w-full h-4" />
                    </div>

                    {/* Mótivo de la versión */}
                    <div className='grid gap-2 mt-4 text-sm'>
                        <SkeletonElement className="w-[120px] h-4" />
                        <SkeletonElement className="w-full h-8" />
                    </div>

                    {/* Fórmula */}
                    <div className='grid gap-2 mt-4 text-sm'>
                        <SkeletonElement className="w-[120px] h-4" />
                        <SkeletonElement className="w-full h-8" />
                    </div>

                    {/* Botones */}
                    <div className="flex items-center justify-content gap-2 mt-4">
                        <SkeletonElement className="w-[120px] h-6" />
                        <SkeletonElement className="w-[120px] h-6" />
                        <SkeletonElement className="w-[120px] h-6" />
                    </div>
                </div>
            )}
            
            {!loadingPage && versionSeleccionada && (
                <div className='grid gap-5 mt-4 text-sm'>
                    {/* Propósito */}
                    <div>
                        <h3 className='font-semibold'>Propósito</h3>
                        <p>{versionSeleccionada.proposito}</p>
                    </div>

                    {/* Descripción */}
                    <div>
                        <h3 className='font-semibold'>Descripción</h3>
                        <p>{versionSeleccionada.descripcion}</p>
                    </div>

                    {/* Frecuencia de medición */}
                    <div>
                        <h3 className='font-semibold'>Frecuencia de medición</h3>
                        <p className='capitalize'>{versionSeleccionada.frecuenciaMedicion}</p>
                    </div>

                    {/* Unidad de medida */}
                    <div>
                        <h3 className='font-semibold'>Unidad de medida</h3>
                        <p className='capitalize'>{versionSeleccionada.unidadMedida}</p>
                    </div>

                    {/* Tipo de meta */}
                    <div>
                        <h3 className='font-semibold'>Tipo de meta</h3>
                        <p className='capitalize'>{versionSeleccionada?.metas[0]?.tipoMeta}</p>
                    </div>

                    {/* Motivo de la versión */}
                    <div>
                        <h3 className='font-semibold'>Mótivo de la versión</h3>
                        <p>{versionSeleccionada.motivoVersion}</p>
                    </div>

                    {/* Fórmula */}
                    <div>
                        <h3 className='font-semibold'>Fórmula</h3>
                        <p>{versionSeleccionada.formulaLatex}</p>
                    </div>
                    
                    <div className="flex items-center justify-content gap-2">
                        <Button
                            colorButton={`secondary`}
                            title={`Editar versión`}
                            onClick = {() => {
                                navigate(`/indicadores/${versionSeleccionada?.id}/editar`)
                            }}
                        >
                            <LuPencil /> Editar
                        </Button>
                        <Button
                            colorButton={`secondary`}
                            title={`Actualizar versión`}
                            onClick = {() => {
                                navigate(`/indicadores/${versionSeleccionada?.id}/actualizar`)
                            }}
                        >
                            <LuRotateCcw /> Actualizar
                        </Button>
                        <Button
                            colorButton={`danger`}
                            title={`Eliminar versión`}
                            onClick = {() => {
                                setModalActivo("eliminar-indicador");
                            }}
                        ><LuTrash2 /> 
                            Eliminar
                        </Button>
                    </div>
                </div>
            )}
            {modalActivo === "eliminar-indicador" && (
                <ModalEliminarIndicador 
                    cerrarModal = {() => setModalActivo("")}
                    versionSeleccionada = {versionSeleccionada}
                />
            )}
        </Card>
    );
};

export default FichaTecnica;