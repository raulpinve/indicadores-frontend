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
import { obtenerTodosUsuarios } from "../../services/usuarioServices";
import ModalCrearUsuario from './ModalCrearUsuario';
import ModalEditarUsuario from "./ModalEditarUsuario";
import ModalEliminarUsuario from './ModalEliminarUsuario';
import ModalImagenUsuario from './ModalImagenUsuario';

const Usuarios = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState();
    const [consulta, setConsulta] = useState("");
    const [modalActivo, setModalActivo] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const debouncedConsulta = useDebounce(consulta, 500);

    // Obtener usuarios
    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true);
            setError(null);

            try {
                const respuesta = await obtenerTodosUsuarios(paginaActual, debouncedConsulta);
                setUsuarios(respuesta.data);
                setPaginaActual(respuesta.paginacion.pagina);
                setTotalPaginas(respuesta.paginacion.totalPaginas);
            } catch (error) {
                setError(error?.response?.data?.message || "Ha ocurrido un error interno");
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, [paginaActual, debouncedConsulta]);

    return (
        <Card>
            <CardTitulo>Usuarios</CardTitulo>
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
                        <TableTh>Primer nombre</TableTh>
                        <TableTh>Apellidos</TableTh>
                        <TableTh>E-mail</TableTh>
                        <TableTh>Username</TableTh>
                        <TableTh>Acciones</TableTh>
                    </tr>
                </TableThead>
            
                {/* Loading */}
                {loading && (
                    <SkeletonTable rows={7} columns={5}/>
                )}

                <TableTbody>
                    {/* Mostrar error */}
                    {!loading && error && (
                        <tr>
                            <TableTd colSpan={5}>{error}</TableTd>
                        </tr>
                    )}
                    {!loading && !error && usuarios.length === 0 && (
                        <tr>
                            <TableTd colSpan={5}>No hay usuarios por mostrar</TableTd>
                        </tr>
                    )}
                    {!loading && !error && usuarios.length > 0 && (
                        <>
                            {usuarios.map(usuario => {
                                return <tr 
                                    key={usuario.id}
                                >
                                    <TableTd className='flex items-center gap-2'>
                                        <img 
                                            src={`${usuario.avatarThumbnail}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setUsuarioSeleccionado(usuario);
                                                setModalActivo("imagen"); 
                                            }}
                                            alt="Perfil" 
                                            className="w-8 h-8 block object-cover rounded-full select-none cursor-pointer"  
                                        />
                                        <p>{usuario.primerNombre}</p>
                                    </TableTd>
                                    <TableTd><p>{usuario.apellidos}</p></TableTd>
                                    <TableTd><p>{usuario.email}</p></TableTd>
                                    <TableTd><p>{usuario.username}</p></TableTd>
                                    <TableTd>
                                        <div className="text-gray-700 dark:text-gray-400 flex gap-2">
                                            <button 
                                                className="cursor-pointer p-1"
                                                title="Editar empresa"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setModalActivo("editar"); 
                                                    setUsuarioSeleccionado(usuario);
                                                }}    
                                            >
                                                <LuPencil />
                                            </button>
                                            <button 
                                                className="cursor-pointer p-1"
                                                title="Eliminar empresa"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setUsuarioSeleccionado(usuario);
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
                <ModalCrearUsuario 
                    cerrarModal={() => setModalActivo(null)}
                    setUsuarios = {setUsuarios}
                />
            )}
            {modalActivo === "editar" && (
                <ModalEditarUsuario 
                    cerrarModal={() => setModalActivo(null)}
                    setUsuarios = {setUsuarios}
                    usuarioSeleccionado = {usuarioSeleccionado}
                />
            )}

            {modalActivo === "eliminar" && (
                <ModalEliminarUsuario 
                    cerrarModal={() => setModalActivo(null)}
                    setUsuarios = {setUsuarios}
                    usuarioSeleccionado = {usuarioSeleccionado}
                />
            )}

            {modalActivo === "imagen" && (
                <ModalImagenUsuario
                    cerrarModal={() => setModalActivo(null)}
                    usuarioSeleccionado = {usuarioSeleccionado}
                />
            )}
            
        </Card>
    );
};

export default Usuarios;