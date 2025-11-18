import React from 'react';
import CardTitulo from '../../../../shared/components/CardTitulo';
import SkeletonElement from '../../../../shared/components/SkeletonElement';
import Card from '../../../../shared/components/Card';
import Table from '../../../../shared/components/Table';
import TableThead from '../../../../shared/components/TableThead';
import TableTr from '../../../../shared/components/TableTr';
import TableTd from '../../../../shared/components/TableTd';
import TableTh from '../../../../shared/components/TableTh';
import TableTbody from '../../../../shared/components/TableTbody';

const LoadingIndicador = () => {
    return (
        <div>
             <div className='py-6 space-y-3'>
                <SkeletonElement className="w-[220px] h-6" />
            </div>
            {/* Gráfica y registros */}
            <div className="grid gap-4">
                <Card>
                    <CardTitulo>Gráfica</CardTitulo>
                    <SkeletonElement className="h-96 w-full mt-2"/>
                </Card>
                <Card>
                    <CardTitulo>Registros</CardTitulo>
                    <Table className='table-fixed'>
                        <TableThead>
                            <TableTr>
                                <TableTh>Períodos</TableTh>
                                <TableTh className='text-center'>Resultado</TableTh>
                                <TableTh className='text-center'>Evidencias</TableTh>
                                <TableTh className='text-center'>Análisis</TableTh>
                                <TableTh className='text-center'>Acciones</TableTh>
                            </TableTr>
                        </TableThead>
                        <TableTbody>
                            {[0,1,2,3,4,5,6].map(element => <TableTr key={element}>
                                <TableTd><SkeletonElement className="h-6" /></TableTd>
                                <TableTd><SkeletonElement className="h-6" /></TableTd>
                                <TableTd><SkeletonElement className="h-6" /></TableTd>
                                <TableTd><SkeletonElement className="h-6" /></TableTd>
                                <TableTd>
                                    <div className="flex items-center justify-center gap-1">
                                        <SkeletonElement className="h-6 w-full" />
                                        <SkeletonElement className="h-6 w-full" />
                                    </div>
                                </TableTd>
                            </TableTr>)}
                        </TableTbody>
                    </Table>
                </Card>
            </div>

            {/* Ficha técnica y control de versiones */}
            <div className="grid grid-cols-[400px_1fr] gap-4 mt-4">

                <Card>
                    <CardTitulo>Ficha técnica</CardTitulo>

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
                </Card>

                <Card>
                    <Table className='table-fixed'>
                        <TableThead>
                            <TableTr>
                                <TableTh>Períodos</TableTh>
                                <TableTh className='text-center'>Resultado</TableTh>
                                <TableTh className='text-center'>Evidencias</TableTh>
                                <TableTh className='text-center'>Análisis</TableTh>
                                <TableTh className='text-center'>Acciones</TableTh>
                            </TableTr>
                        </TableThead>
                        <TableTbody>
                            {[0,1,2,3,4,5,6,7,8,9].map(element => 
                                <TableTr key={element}>
                                    <TableTd><SkeletonElement className="h-6" /></TableTd>
                                    <TableTd><SkeletonElement className="h-6" /></TableTd>
                                    <TableTd><SkeletonElement className="h-6" /> </TableTd>
                                    <TableTd><SkeletonElement className="h-6" /></TableTd>
                                    <TableTd>
                                        <div className="flex justify-center gap-1">
                                            <SkeletonElement className="h-6 w-full" />
                                            <SkeletonElement className="h-6 w-full" />
                                        </div>
                                    </TableTd>
                                </TableTr>
                            )}
                        </TableTbody>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default LoadingIndicador;