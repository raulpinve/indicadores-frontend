import React, { useState } from 'react';
import Card from '../../../shared/components/Card';
import { LuPencil, LuRotateCcw, LuTrash2 } from 'react-icons/lu';
import Button from '../../../shared/components/Button';
import { useNavigate } from 'react-router-dom';
import SkeletonElement from '../../../shared/components/SkeletonElement';
import ModalEliminarIndicador from './Indicador/ModalEliminarIndicador';
import CardTitulo from '../../../shared/components/CardTitulo';

const FichaTecnica = (props) => {
    const {versionSeleccionada} = props;
    const [modalActivo, setModalActivo] = useState("");
    const navigate = useNavigate();

    return (
        <Card>
             <CardTitulo>
                Ficha técnica 
                <Button
                    className='text-sm ml-2'
                    colorButton={`primary`}
                >Crear</Button>
            </CardTitulo>


            {versionSeleccionada && (
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