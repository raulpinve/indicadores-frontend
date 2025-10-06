import React, { use, useEffect, useState } from 'react';
import Title from '../../shared/components/Title';
import Card from '../../shared/components/Card';
import CardTitulo from '../../shared/components/CardTitulo';
import Table from '../../shared/components/Table';
import TableThead from '../../shared/components/TableThead';
import TableTh from '../../shared/components/TableTh';
import TableTd from '../../shared/components/TableTd';
import TableTbody from '../../shared/components/TableTbody';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { obtenerTodosIndicadores } from './services/indicadoresServices';

const IndicadoresPage = () => {
    const [indicadorSeleccionado, setIndicadorSeleccionado] = useState(null);
    const [modalActivo, setModalActivo] = useState("");
    const [loading, setLoading] = useState(null);
    const [indicadores, setIndicadores] = useState([]);
    const [error, setError] = useState(null);
    
    // // Obtener indicadores
    // useEffect(() => {
    //     const fetchIndicadores = async () => {
    //         try {
    //             const result = await obtenerTodosIndicadores(empresaId)
    //             setIndicadores(result.data);
    //         } catch {
    //             toast.error("Ha ocurrido un error al obtener la empresa.")
    //         } finally{
    //             setLoading(false)
    //         }
    //     }
    //     fetchIndicadores();
    // }, []); 

    return (
        <div>
            <Card>
                <CardTitulo>
                    Indicadores 
                    <Link to="/indicadores/crear" className='ml-3 p-2 text-sm rounded-lg bg-blue-600 text-white dark:bg-blue-200 dark:text-slate-800'>Crear</Link>
                </CardTitulo>
                <Table>
                    <TableThead>
                        <tr className="text-left">
                            <TableTh>Nombre del indicador</TableTh>
                            <TableTh>Estado actual</TableTh>
                            <TableTh>VRUP</TableTh>
                            <TableTh>Última medición</TableTh>
                            <TableTh>Proceso</TableTh>
                            <TableTh>Acciones</TableTh>
                        </tr>
                    </TableThead>
                
                    {/* Loading */}
                    {loading && (
                        <SkeletonTable rows={7} columns={6}/>
                    )}
                    <TableTbody>
                        {/* Mostrar error */}
                        {!loading && error && (
                            <tr>
                                <TableTd colSpan={6}>{error}</TableTd>
                            </tr>
                        )}
                        {!loading && !error && indicadores.length === 0 && (
                            <tr>
                                <TableTd colSpan={6}>No hay indicadores por mostrar</TableTd>
                            </tr>
                        )}
                        {!loading && !error && indicadores.length > 0 && (
                            <>
                                {indicadores.map(indicador => {
                                    return <tr 
                                        key={indicador.id}
                                        className="cursor-pointer"
                                    >
                                        <TableTd className='flex items-center gap-3'><p>{indicador.nombre}</p></TableTd>
                                        <TableTd><span>70</span> <div className='bg-green-200'>Óptimo</div> </TableTd>
                                        <TableTd>
                                            <div className="text-gray-700 dark:text-gray-400 flex gap-2">
                                                <button 
                                                    className="cursor-pointer p-1"
                                                    title="Editar indicador"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setModalActivo("editar"); 
                                                        setIndicadorSeleccionado(indicador);
                                                    }}    
                                                >
                                                    <LuPencil />
                                                </button>
                                                <button 
                                                    className="cursor-pointer p-1"
                                                    title="Eliminar indicador"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIndicadorSeleccionado(indicador);
                                                        setModalActivo("eliminar"); 
                                                    }} 
                                                >
                                                    <LuEraser />
                                                </button>
                                            </div>
                                        </TableTd>
                                    </tr>
                                })}
                            </>
                        )}
                    </TableTbody>
                </Table>
                
            </Card>
        </div>
    );
};

export default IndicadoresPage;