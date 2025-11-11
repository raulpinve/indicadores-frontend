import React from 'react';
import Card from '../../../shared/components/Card';
import CardTitulo from '../../../shared/components/CardTitulo';
import Table from '../../../shared/components/Table';
import TableThead from '../../../shared/components/TableThead';
import TableTr from '../../../shared/components/TableTr';
import TableTh from '../../../shared/components/TableTh';
import TableTbody from '../../../shared/components/TableTbody';
import TableTd from '../../../shared/components/TableTd';
import { LuArrowLeftRight, LuFileText, LuPencil, LuRotateCcw, LuTrash2 } from 'react-icons/lu';
import Button from '../../../shared/components/Button';

const ControlVersiones = () => {
    return (
        <Card>
            <CardTitulo>Control de versiones </CardTitulo>
            <Table>
                <TableThead>
                    <TableTr>
                        <TableTh><span>Nombre</span></TableTh>
                        <TableTh className='text-center'><span>Estado</span></TableTh>
                        <TableTh className='text-center'><span>Versión</span></TableTh>
                        <TableTh className='text-center'><span>Descripción</span></TableTh>
                        <TableTh className='text-center'><span>Acciones</span></TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    <TableTr>
                        <TableTd>Severidad de accidentes</TableTd>
                        <TableTd>
                            <div className="bg-red-200 py-1.5 px-2 text-xs rounded-md text-red-600 font-semibold text-center">Obsoleto</div>
                        </TableTd>
                        <TableTd className='text-center'>1</TableTd>
                        <TableTd>
                            <div className="flex justify-center">
                                <Button
                                    title={`Descripción de la versión`}
                                    colorButton={`secondary`}
                                >
                                    <LuFileText />
                                </Button>
                            </div> 
                        </TableTd>
                        <TableTd>
                            <div className="flex justify-center gap-1">
                                <Button
                                    colorButton={`secondary`}
                                    title={`Actualizar versión a partir de esta`}
                                >
                                    <LuRotateCcw />
                                </Button>
                                <Button
                                    colorButton={`secondary`}
                                    title={`Editar número de versión`}
                                >
                                    <LuArrowLeftRight />
                                </Button>
                                {/* <Button
                                    colorButton={`secondary`}
                                    title={`Editar versión`}
                                >
                                    <LuPencil />
                                </Button>
                                <Button
                                    colorButton={`danger`}
                                    title={`Eliminar versión`}
                                >
                                    <LuTrash2 />
                                </Button> */}
                            </div>
                        </TableTd>
                    </TableTr>
                </TableTbody>
            </Table>
        </Card>
    );
};

export default ControlVersiones;