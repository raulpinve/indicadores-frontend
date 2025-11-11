import React from 'react';
import Card from '../../../shared/components/Card';
import { LuPencil, LuRotateCcw, LuTrash2 } from 'react-icons/lu';
import Button from '../../../shared/components/Button';

const FichaTecnica = () => {
    return (
        <Card>
            <h2 className='font-semibold text-lg'>Ficha técnica</h2>
            <div className='grid gap-5 mt-4 text-sm'>
                {/* Propósito */}
                <div>
                    <h3 className='font-semibold'>Propósito</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </div>

                {/* Descripción */}
                <div>
                    <h3 className='font-semibold'>Descripción</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </div>

                {/* Frecuencia de medición */}
                <div>
                    <h3 className='font-semibold'>Frecuencia de medición</h3>
                    <p>Mensual</p>
                </div>

                {/* Unidad de medida */}
                <div>
                    <h3 className='font-semibold'>Unidad de medida</h3>
                    <p>Porcentaje</p>
                </div>

                {/* Tipo de meta */}
                <div>
                    <h3 className='font-semibold'>Tipo de meta</h3>
                    <p>Absoluta</p>
                </div>

                {/* Motivo de la versión */}
                <div>
                    <h3 className='font-semibold'>Mótivo de la versión</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </p>
                </div>

                {/* Fórmula */}
                <div>
                    <h3 className='font-semibold'>Fórmula</h3>
                    <p> x + 2 </p>
                </div>
                
                <div className="flex items-center justify-content gap-2">
                    <Button
                        colorButton={`secondary`}
                        title={`Editar versión`}
                    >
                        <LuPencil /> Editar
                    </Button>
                    <Button
                        colorButton={`secondary`}
                        title={`Actualizar versión`}
                    >
                        <LuRotateCcw /> Actualizar
                    </Button>
                    <Button
                        colorButton={`danger`}
                        title={`Eliminar versión`}
                    ><LuTrash2 /> Eliminar</Button>
                </div>
            </div>
        </Card>
    );
};

export default FichaTecnica;