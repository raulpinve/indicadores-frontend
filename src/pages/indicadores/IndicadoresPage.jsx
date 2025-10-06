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
import { obtenerTodosIndicadores } from './services/indicadoresServices';
import { useSelector } from 'react-redux';
import useDebounce from '../../shared/hooks/useDebounce';
import Pagination from '../../shared/components/Pagination';
import SkeletonTable from '../../shared/components/SkeletonTable';
import { LuEraser, LuPencil } from 'react-icons/lu';

const IndicadoresPage = () => {
    const [indicadorSeleccionado, setIndicadorSeleccionado] = useState(null);
    const empresaId = useSelector(state => state?.empresa?.empresa?.id);
    const [modalActivo, setModalActivo] = useState("");
    const [consulta, setConsulta] = useState("");
    const [loading, setLoading] = useState(null);
    const [indicadores, setIndicadores] = useState([]);
    const [error, setError] = useState(null);
    const debouncedConsulta = useDebounce(consulta, 500);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    // Obtener indicadores
   useEffect(() => {

        const fetchEmpresas = async () => {
            setLoading(true);
            setError(null);

            try {
                const respuesta = await obtenerTodosIndicadores(paginaActual, debouncedConsulta, empresaId);
                setIndicadores(respuesta.data);
                setPaginaActual(respuesta.paginacion.pagina);
                setTotalPaginas(respuesta.paginacion.totalPaginas);
            } catch (error) {
                setError(error?.response?.data?.message || "Ha ocurrido un error interno");
            } finally {
                setLoading(false);
            }
        };
        if(empresaId) fetchEmpresas();
    }, [paginaActual, debouncedConsulta, empresaId]);

    console.log(indicadores)

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
                                    const resultado = indicador?.ultimoRegistro?.resultado;
                                    const estado = indicador?.ultimoRegistro?.estadoResultado;
                                    const vrup = indicador?.ultimoRegistro?.vrup;
                                    const tendencia = indicador?.ultimoRegistro?.tendenciaResultado; // "mejora" o "empeora"

                                    // Color y símbolo según tendencia
                                    let vrupColor = "text-gray-500";
                                    let vrupIcon = "→";

                                    if (tendencia === "mejora") {
                                        vrupColor = "text-green-600";
                                        vrupIcon = "↑";
                                    } else if (tendencia === "empeora") {
                                        vrupColor = "text-red-600";
                                        vrupIcon = "↓";
                                    }

                                    return (
                                        <tr key={indicador.id} className="cursor-pointer">
                                            {/* Nombre del indicador */}
                                            <TableTd className="flex items-center gap-3">
                                                <p>{indicador?.ultimaVersion?.nombre}</p>
                                            </TableTd>

                                            {/* Último resultado y estado */}
                                            <TableTd>
                                                {resultado && estado ? (
                                                    <div className="flex items-center gap-2 font-semibold">
                                                        <span>{resultado}</span>
                                                        {estado === "optimo" && (
                                                            <div className="bg-green-200 rounded-lg p-2 text-slate-800">Óptimo</div>
                                                        )}
                                                        {estado === "critico" && (
                                                            <div className="bg-red-200 rounded-lg p-2 text-slate-800">Crítico</div>
                                                        )}
                                                        {estado === "aceptable" && (
                                                            <div className="bg-yellow-200 rounded-lg p-2 text-slate-800">Aceptable</div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p>—</p>
                                                )}
                                            </TableTd>

                                            {/* VRUP con flecha y color */}
                                            <TableTd>
                                                {vrup !== null && vrup !== undefined ? (
                                                    <p className={`flex items-center gap-1 font-semibold ${vrupColor}`}>
                                                        {vrupIcon} {Math.round(Math.abs(vrup))} %
                                                    </p>
                                                ) : (
                                                    <p>—</p>
                                                )}
                                            </TableTd>

                                            {/* Nombre del proceso */}
                                            <TableTd>
                                                <p>{indicador?.procesoNombre}</p>
                                            </TableTd>

                                            {/* Botones */}
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
                                    );
                                })}

                            </>
                        )}
                    </TableTbody>
                </Table>
                {!loading && (
                    <Pagination
                        paginaActual={paginaActual}
                        totalPaginas={totalPaginas}
                        onPageChange={setPaginaActual}
                    />
                )}
            </Card>
        </div>
    );
};

export default IndicadoresPage;