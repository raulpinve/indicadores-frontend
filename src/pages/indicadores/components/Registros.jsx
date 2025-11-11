import React from 'react';
import CardTitulo from '../../../shared/components/CardTitulo';
import Card from '../../../shared/components/Card';
import Button from '../../../shared/components/Button';
import Table from '../../../shared/components/Table';
import TableThead from '../../../shared/components/TableThead';
import TableTr from '../../../shared/components/TableTr';
import TableTh from '../../../shared/components/TableTh';
import TableTbody from '../../../shared/components/TableTbody';
import TableTd from '../../../shared/components/TableTd';
import { LuFileText, LuFolder, LuPencil, LuTrash2 } from 'react-icons/lu';

const Registros = () => {
    return (
        <Card>
            <CardTitulo>
                Registros 
                <Button
                    className='text-sm ml-2'
                    colorButton={`primary`}
                >Crear</Button>
            </CardTitulo>

            {/* Tabla */}
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
                    <TableTr>
                        <TableTd>16/05/2025</TableTd>
                        <TableTd>
                            <div className="flex justify-center gap-2 items-center">
                                <span className='font-semibold'>70</span>
                                <div className="bg-green-200 dark:bg-green-800 dark:text-white py-1.5 px-2 text-xs rounded-md font-semibold">Óptimo</div>
                            </div>
                        </TableTd>
                        <TableTd>
                            <div className="flex justify-center">
                                <Button colorButton={`secondary`}>
                                    <LuFolder />
                                </Button>
                            </div>
                        </TableTd>
                        <TableTd >
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
                        </TableTd>
                        <TableTd>
                            <div className="flex justify-center gap-1">
                                <Button
                                    colorButton={`secondary`}
                                >
                                    <LuPencil />
                                </Button>
                                <Button 
                                    colorButton={`danger`}
                                >
                                    <LuTrash2 />
                                </Button>
                            </div>
                        </TableTd>
                    </TableTr>
                </TableTbody>
            </Table>
        </Card>
    );
};

export default Registros;