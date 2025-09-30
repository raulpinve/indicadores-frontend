import CardTitulo from '../../../../shared/components/CardTitulo';
import TableThead from '../../../../shared/components/TableThead';
import TableTbody from '../../../../shared/components/TableTbody';
import useDebounce from '../../../../shared/hooks/useDebounce';
import TableTh from '../../../../shared/components/TableTh';
import TableTd from '../../../../shared/components/TableTd';
import React, { useEffect, useState } from 'react';
import Table from '../../../../shared/components/Table';
import Card from '../../../../shared/components/Card';
import SkeletonTable from '../../../../shared/components/SkeletonTable';
import Pagination from '../../../../shared/components/Pagination';
import Button from '../../../../shared/components/Button';
import { LuEraser, LuPencil, LuSearch } from 'react-icons/lu';
import { obtenerTodosProcesos } from '../../services/procesoServices';
import { useParams } from 'react-router-dom';
import ModalCrearProceso from './ModalCrearProceso';
import ModalEditarProceso from './ModalEditarProceso';
import ModalEliminarProceso from './ModalEliminarProceso';

const Procesos = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [procesos, setProcesos] = useState([]);
    const [procesoSeleccionado, setProcesoSeleccionado] = useState();
    const [consulta, setConsulta] = useState("");
    const [modalActivo, setModalActivo] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const debouncedConsulta = useDebounce(consulta, 500);
    const { empresaId } = useParams();

    // Obtener empresas
    useEffect(() => {
        const fetchProcesos = async () => {
            setLoading(true);
            setError(null);

            try {
                const respuesta = await obtenerTodosProcesos(paginaActual, debouncedConsulta, empresaId);
                setProcesos(respuesta.data);
                setPaginaActual(respuesta.paginacion.pagina);
                setTotalPaginas(respuesta.paginacion.totalPaginas);
            } catch (error) {
                console.log(error)
                setError(error?.response?.data?.message || "Ha ocurrido un error interno");
            } finally {
                setLoading(false);
            }
        };
        fetchProcesos();
    }, [paginaActual, debouncedConsulta]);

    return (
        <Card className={`mt-4`}>
            <CardTitulo>Procesos</CardTitulo>
            <div className='flex items-center gap-2 mt-3'>
                <Button
                    type="button"
                    colorButton="primary"
                    onClick={() => {
                        setModalActivo("crear")
                    }}
                >   
                    Crear 
                </Button>
                <div className="relative hidden md:block">
                    <LuSearch className="absolute left-3.5 top-3 text-gray-600 text-lg dark:text-gray-800" />
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="input-form pl-10 dark:bg-gray-900"
                        value={consulta}
                        onChange={(e) => {
                            setConsulta(e.currentTarget.value);
                        }}
                    />
                </div>
            </div>
            <Table>
                <TableThead>
                    <tr className="text-left">
                        <TableTh>Nombre del proceso</TableTh>
                        <TableTh>Acciones</TableTh>
                    </tr>
                </TableThead>
            
                {/* Loading */}
                {loading && (
                    <SkeletonTable rows={7} columns={2}/>
                )}
                <TableTbody>
                    {/* Mostrar error */}
                    {!loading && error && (
                        <tr>
                            <TableTd colSpan={2}>{error}</TableTd>
                        </tr>
                    )}
                    {!loading && !error && procesos.length === 0 && (
                        <tr>
                            <TableTd colSpan={2}>No hay procesos por mostrar</TableTd>
                        </tr>
                    )}
                    {!loading && !error && procesos.length > 0 && (
                        <>
                            {procesos.map(proceso => {
                                return <tr 
                                    key={proceso.id}
                                    className="cursor-pointer"
                                >
                                    <TableTd className='flex items-center gap-2'>
                                        <p> {proceso.nombre}</p>
                                    </TableTd>
                                    <TableTd>
                                        <div className="text-gray-700 dark:text-gray-400 flex gap-2">
                                            <button 
                                                className="cursor-pointer p-1"
                                                title="Editar proceso"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setModalActivo("editar"); 
                                                    setProcesoSeleccionado(proceso);
                                                }}    
                                            >
                                                <LuPencil />
                                            </button>
                                            <button 
                                                className="cursor-pointer p-1"
                                                title="Eliminar proceso"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setProcesoSeleccionado(proceso);
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
            
            {!loading && (
                <Pagination
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                    onPageChange={setPaginaActual}
                />
            )}
            {modalActivo === "crear" && (
                <ModalCrearProceso 
                    cerrarModal={() => setModalActivo(null)}
                    setProcesos = {setProcesos}
                />
            )}
            {modalActivo === "editar" && (
                <ModalEditarProceso 
                    cerrarModal={() => setModalActivo(null)}
                    setProcesos = {setProcesos}
                    procesoSeleccionado = {procesoSeleccionado}
                />
            )}

            {modalActivo === "eliminar" && (
                <ModalEliminarProceso 
                    cerrarModal={() => setModalActivo(null)}
                    setProcesos = {setProcesos}
                    procesoSeleccionado = {procesoSeleccionado}
                />
            )}
            
        </Card>
    );
};

export default Procesos;