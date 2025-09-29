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
import { obtenerTodasEmpresas } from "../../services/empresaServices";
import ModalCrearEmpresa from "./ModalCrearEmpresa";
import ModalEditarEmpresa from "./ModalEditarEmpresa";
import ModalEliminarEmpresa from "./ModalEliminarEmpresa";
import { useNavigate } from "react-router-dom";
import ModalImagenEmpresa from './ModalImagenEmpresa';

const Empresas = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [empresas, setEmpresas] = useState([]);
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState();
    const [consulta, setConsulta] = useState("");
    const [modalActivo, setModalActivo] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const debouncedConsulta = useDebounce(consulta, 500);
    const navigate = useNavigate();

    // Obtener empresas
    useEffect(() => {
        const fetchEmpresas = async () => {
            setLoading(true);
            setError(null);

            try {
                const respuesta = await obtenerTodasEmpresas(paginaActual, debouncedConsulta);
                setEmpresas(respuesta.data);
                setPaginaActual(respuesta.paginacion.pagina);
                setTotalPaginas(respuesta.paginacion.totalPaginas);
            } catch (error) {
                setError(error?.response?.data?.message || "Ha ocurrido un error interno");
            } finally {
                setLoading(false);
            }
        };
        fetchEmpresas();
    }, [paginaActual, debouncedConsulta]);

    const redireccionarAEmpresa = (empresaId) => {
       navigate(`/configuracion/empresas/${empresaId}`);
    }

    return (
        <Card className={`mt-4`}>
            <CardTitulo>Empresas</CardTitulo>
            <div className='flex items-center gap-2'>
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
                        <TableTh>Nombre de la empresa</TableTh>
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
                    {!loading && !error && empresas.length === 0 && (
                        <tr>
                            <TableTd colSpan={2}>No hay empresas por mostrar</TableTd>
                        </tr>
                    )}
                    {!loading && !error && empresas.length > 0 && (
                        <>
                            {empresas.map(empresa => {
                                return <tr 
                                    key={empresa.id}
                                    onClick={() => redireccionarAEmpresa(empresa.id)}
                                    className="cursor-pointer"
                                >
                                    <TableTd className='flex items-center gap-2'>
                                        <img 
                                            src={`${empresa.avatarThumbnail}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEmpresaSeleccionada(empresa);
                                                setModalActivo("imagen");
                                            }}
                                            alt="Perfil" 
                                            className="w-8 h-8 block object-cover rounded-full select-none cursor-pointer"  
                                        />
                                        <p> {empresa.nombre}</p>
                                    </TableTd>
                                    <TableTd>
                                        <div className="text-gray-700 dark:text-gray-400 flex gap-2">
                                            <button 
                                                className="cursor-pointer p-1"
                                                title="Editar empresa"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setModalActivo("editar"); 
                                                    setEmpresaSeleccionada(empresa);
                                                }}    
                                            >
                                                <LuPencil />
                                            </button>
                                            <button 
                                                className="cursor-pointer p-1"
                                                title="Eliminar empresa"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEmpresaSeleccionada(empresa);
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
                <ModalCrearEmpresa 
                    cerrarModal={() => setModalActivo(null)}
                    setEmpresas = {setEmpresas}
                />
            )}
            {modalActivo === "editar" && (
                <ModalEditarEmpresa 
                    cerrarModal={() => setModalActivo(null)}
                    setEmpresas = {setEmpresas}
                    empresaSeleccionada = {empresaSeleccionada}
                />
            )}

            {modalActivo === "eliminar" && (
                <ModalEliminarEmpresa 
                    cerrarModal={() => setModalActivo(null)}
                    setEmpresas = {setEmpresas}
                    empresaSeleccionada = {empresaSeleccionada}
                />
            )}

            {modalActivo === "imagen" && (
                <ModalImagenEmpresa
                    cerrarModal={() => setModalActivo(null)}
                    empresaSeleccionada = {empresaSeleccionada}
                />
            )}
            
        </Card>
    );
};

export default Empresas;