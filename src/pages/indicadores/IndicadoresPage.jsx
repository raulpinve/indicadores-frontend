import React, { use, useEffect, useState } from 'react';
import Title from '../../shared/components/Title';
import Card from '../../shared/components/Card';
import CardTitulo from '../../shared/components/CardTitulo';
import Table from '../../shared/components/Table';
import TableThead from '../../shared/components/TableThead';
import TableTh from '../../shared/components/TableTh';
import TableTd from '../../shared/components/TableTd';
import TableTbody from '../../shared/components/TableTbody';
import { Link, useNavigate } from 'react-router-dom';
import { obtenerUltimasVersiones } from './services/indicadoresServices';
import { useSelector } from 'react-redux';
import useDebounce from '../../shared/hooks/useDebounce';
import Pagination from '../../shared/components/Pagination';
import SkeletonTable from '../../shared/components/SkeletonTable';
import { LuChevronDown } from 'react-icons/lu';
import { obtenerTodosProcesos } from './services/procesosServices';
import { toast } from 'sonner';
import Button from '../../shared/components/Button';

const IndicadoresPage = () => {
    const [procesoSeleccionado, setProcesoSeleccionado] = useState("");
    const empresaId = useSelector(state => state?.empresa?.empresa?.id);
    const [modalActivo, setModalActivo] = useState("");
    const [procesos, setProcesos] = useState([]);
    const [consulta, setConsulta] = useState("");
    const [loading, setLoading] = useState(null);
    const [indicadores, setIndicadores] = useState([]);
    const [error, setError] = useState(null);
    const debouncedConsulta = useDebounce(consulta, 500);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const navigate = useNavigate();

    // Obtener indicadores
    useEffect(() => {
        const fetchEmpresas = async () => {
            setLoading(true);
            setError(null);

            try {
                const respuesta = await obtenerUltimasVersiones(paginaActual, debouncedConsulta, empresaId, procesoSeleccionado);
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
    }, [paginaActual, debouncedConsulta, empresaId, procesoSeleccionado]);

    const redireccionarVersionIndicador = (versionId) => {
        navigate(`/indicadores/${versionId}`);
    }

    // Cargar todos los procesos de la empresa
    useEffect(() => {
        const fecthProcesos = async() => {
            try {
                const respuesta = await obtenerTodosProcesos(empresaId);
                setProcesos(respuesta.data);
            } catch (error) {
                toast.error(error?.response?.data?.message || "Error interno. Vuelve a intentarlo.")
            }
        }
        if(empresaId) fecthProcesos(); 
    }, [empresaId])

    return (
        <div>
            <Card>
                <CardTitulo>
                    Indicadores 
                    <Button
                        onClick={() => {
                            navigate("/indicadores/crear")
                        }}
                        className="ml-2"
                        colorButton="primary"
                        textButton={`Crear`}
                    />
                </CardTitulo>
                
                {/* Filtros para buscar indicador */}
                <div className="mt-3 flex items-center gap-2">
                    <input
                        type="text"
                        className="input-form w-50"
                        placeholder="Buscar..."
                        onChange={(e) => setConsulta(e.target.value)}
                    />
                    <div className='relative'>
                        <select 
                            className="select-form w-50"
                            onChange={(e) => setProcesoSeleccionado(e.target.value)}
                        >
                            <option value="">Seleccionar proceso...</option>
                            {procesos.map(proceso => {
                                return <option 
                                    key={proceso.id}
                                    value={proceso.id}
                                >
                                    {proceso.nombre}
                                </option>
                            })}
                        </select>
                        <LuChevronDown className="absolute top-[15px] right-3" />
                    </div>
                </div>

                <Table>
                    <TableThead>
                        <tr className="text-left">
                            <TableTh>Nombre del indicador</TableTh>
                            <TableTh>Estado actual</TableTh>
                            <TableTh>VRUP</TableTh>
                            <TableTh>Proceso</TableTh>
                        </tr>
                    </TableThead>
                
                    {/* Loading */}
                    {loading && (
                        <SkeletonTable rows={7} columns={4}/>
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
                                    const valor = indicador?.ultimoResultado?.valor;
                                    const estado = indicador?.ultimoResultado?.estadoResultado;
                                    const vrupRaw = indicador?.ultimoResultado?.vrup;
                                    const direccion = indicador?.ultimoResultado?.direccionMeta;

                                    // Convertir VRUP a número
                                    const vrup = vrupRaw !== null && vrupRaw !== undefined ? parseFloat(vrupRaw) : null;

                                    // Determinar tendencia (según dirección de la meta)
                                    let tendencia = null;
                                    if (vrup !== null && !isNaN(vrup)) {
                                        if (direccion === "asc") {
                                            tendencia = vrup > 0 ? "mejora" : vrup < 0 ? "empeora" : "sin cambio";
                                        } else if (direccion === "desc") {
                                            tendencia = vrup > 0 ? "empeora" : vrup < 0 ? "mejora" : "sin cambio";
                                        } else {
                                            tendencia = vrup > 0 ? "mejora" : vrup < 0 ? "empeora" : "sin cambio";
                                        }
                                    }

                                    // Color y símbolo según tendencia
                                    let vrupColor = "text-gray-500";
                                    let vrupIcon = "";

                                    if (tendencia === "mejora") {
                                        vrupColor = "text-green-600";
                                        vrupIcon = "↑";
                                    } else if (tendencia === "empeora") {
                                        vrupColor = "text-red-600";
                                        vrupIcon = "↓";
                                    }

                                    return (
                                        <tr 
                                            key={indicador.id} 
                                            className="cursor-pointer text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                            onClick={() => redireccionarVersionIndicador(indicador.id)}
                                        >
                                            {/* Nombre del indicador */}
                                            <TableTd className="flex items-center gap-3">
                                                <p>{indicador?.nombre}</p>
                                            </TableTd>

                                            {/* Último resultado y estado */}
                                            <TableTd>
                                                {valor && estado ? (
                                                    <div className="flex items-center gap-2 font-semibold">
                                                        <span>{valor}</span>
                                                        {estado === "optimo" && (
                                                            <div className="bg-green-200 rounded-lg px-2 py-1 text-slate-800 text-xs">Óptimo</div>
                                                        )}
                                                        {estado === "critico" && (
                                                            <div className="bg-red-200 rounded-lg px-2 py-1 text-slate-800 text-xs">Crítico</div>
                                                        )}
                                                        {estado === "aceptable" && (
                                                            <div className="bg-yellow-200 rounded-lg px-2 py-1 text-slate-800 text-xs">Aceptable</div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p>—</p>
                                                )}
                                            </TableTd>

                                            {/* VRUP con flecha y color */}
                                            <TableTd>
                                                {vrup !== null && !isNaN(vrup) ? (
                                                    <p className={`flex items-center gap-1 font-semibold ${vrupColor}`}>
                                                        {vrupIcon} {Math.abs(Math.round(vrup))} %
                                                    </p>
                                                ) : (
                                                    <p>—</p>
                                                )}
                                            </TableTd>

                                            {/* Nombre del proceso */}
                                            <TableTd>
                                                <p>{indicador?.procesoNombre}</p>
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