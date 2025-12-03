import React from 'react';
import SkeletonElement from '../../../shared/components/SkeletonElement';
import Card from '../../../shared/components/Card';
import CardTitulo from '../../../shared/components/CardTitulo';
import Table from '../../../shared/components/Table';
import TableThead from '../../../shared/components/TableThead';
import TableTr from '../../../shared/components/TableTr';
import TableTd from '../../../shared/components/TableTd';
import TableTbody from '../../../shared/components/TableTbody';
import TableTh from '../../../shared/components/TableTh';
import Button from '../../../shared/components/Button';
import { LuDownload, LuEye, LuTrash2 } from 'react-icons/lu';

const LoadingEvidencias = () => {
    return (<>
        <div className='font-semibold text-2xl flex items-center gap-2 my-4'>
            <SkeletonElement className="h-6 w-[200px]"/>
        </div>
        <Card>
            <CardTitulo className={`flex items-center gap-2`}>
                Evidencias
                <SkeletonElement className="h-6 w-[120px]"/>
            </CardTitulo>
            <Table>
                <TableThead>
                    <TableTr>
                        <TableTh>Archivo</TableTh>
                        <TableTh className='text-center'>Acciones</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    {[0,1,2,3,4,5,6].map(index => 
                        <TableTr key={index}>
                            <TableTd><SkeletonElement className="h-6 w-full" /></TableTd>
                            <TableTd>
                                <div className="flex items-center justify-center gap-2">
                                    <Button
                                        colorButton={`secondary`}
                                        title="Ver vista previa"
                                    >
                                        <LuEye />
                                    </Button>
                                    <Button
                                        colorButton={`secondary`}
                                        title="Descargar"
                                    >
                                        <LuDownload />
                                    </Button>
                                    <Button
                                        colorButton={`danger`}
                                        title="Eliminar"
                                    >   
                                        <LuTrash2 />
                                    </Button>
                                </div>
                            </TableTd>
                        </TableTr>
                    )}
                </TableTbody>
            </Table>
        </Card>
    </>);
};

export default LoadingEvidencias;