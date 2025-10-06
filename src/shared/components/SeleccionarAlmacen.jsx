import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmpresa } from '../../store/empresaSlice';
import React, { useEffect, useState } from 'react';
import { logout } from '../../store/authSlice';
import { LuLogOut } from 'react-icons/lu';
import Modal from './Modal';
import { obtenerTodasEmpresas } from '../../pages/configuracion/services/empresaServices';

const SeleccionarEmpresa = () => {
    const [validandoEmpresa, setValidandoEmpresa] = useState(true);
    const empresa = useSelector(state => state.empresa.empresa);
    const usuario = useSelector(state => state.auth.usuario);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const token = useSelector(state => state.auth.token);
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    
    const rutasSinModal = ['/configuracion', '/editar-perfil', '/perfil'];
    const enRutaExcluida = rutasSinModal.some(ruta => location.pathname.startsWith(ruta));
    const navigate = useNavigate();

    useEffect(() => {
        const validarEmpresaGuardada = async () => {
            setLoading(true);
            try {
                const empresaLocal = localStorage.getItem('empresaSeleccionada');
                const res = await obtenerTodasEmpresas(token);
                setEmpresas(res.data);

                if (empresaLocal) {
                    const empresaParseada = JSON.parse(empresaLocal);
                    const empresaActualizada = res.data.find(a => a.id === empresaParseada.id);

                    if (empresaActualizada) {
                        dispatch(setEmpresa(empresaActualizada));
                        localStorage.setItem('empresaSeleccionada', JSON.stringify(empresaActualizada));
                        return;
                    }
                    localStorage.removeItem('empresaSeleccionada');
                    dispatch(setEmpresa(null));
                }

                setIsOpenModal(true);
            } catch (error) {
                console.error('Error al validar almacén:', error);
                setIsOpenModal(true);
            } finally {
                setValidandoEmpresa(false);
                setLoading(false);
            }
        };

        validarEmpresaGuardada();
    }, [dispatch, token]);
    
    // Este useEffect está bien si se necesita que el modal se cierre automáticamente cuando se elige un almacén desde otro componente
    useEffect(() => {
        setIsOpenModal(!empresa);
    }, [empresa]);

    // Obtiene el listado de almacenes cuando cambia el valor de almacén
    useEffect(() => {
        const refrescarEmpresas = async () => {
            try {
                const res = await obtenerTodasEmpresas(token);
                setEmpresas(res.data);
            } catch (error) {
                console.error('Error al refrescar empresas:', error);
            }
        };

        refrescarEmpresas();
    }, [empresa, token]);

    return (
        !validandoEmpresa && !empresa && !enRutaExcluida && (
            <Modal
                isOpenModal={isOpenModal}
                setIsOpenModal={() => setIsOpenModal(false)}
                title="Seleccionar empresa"
                size="md"
                allowClose= { false }
            >
                <div className='grid gap-4 text-sm'>
                    {/* Loading  */}
                    {loading && <>{
                        [...Array(5)].map((_,index) => <div key={index} className="animate-pulse bg-slate-200 dark:bg-slate-700 rounded-xl h-[20px] mb-3">
                        </div>)
                    }</>}

                    {/* Mostrando contenido */}
                    {!loading && (<>
                        {empresas.length === 0 ? (
                            <div className="text-sm">
                                {usuario.rol === "superadmin" ? (<>
                                    <p className="mb-4">No tienes empresas creadas. Crea uno para comenzar.</p>
                                    <button 
                                        onClick={() => {
                                            navigate('/configuracion')
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    >
                                        Crear empresa
                                    </button>
                                </>) : (<>
                                    <p className="mb-4">No tienes acceso a ningún empresa. Pídele a tu administrador que cree una nueva o que te otorgue permisos para acceder a una existente.</p>
                                    <button 
                                        onClick={() => {
                                            dispatch(logout())
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
                                    >
                                        <LuLogOut />
                                        Cerrar sesión
                                    </button>
                                </>)}
                            </div>
                        ) : (
                            <div className=''>
                                <p className='text-sm'>Por favor selecciona una empresa para continuar: </p>
                                <ul className="space-y-2 dark:text-gray-300 mt-3 divide-y py-1 divide-gray-200">
                                    {empresas.map(empresa => (
                                        <li 
                                            key={empresa.id} 
                                            className="cursor-pointer hover:font-medium select-none p-1"
                                            onClick={() => {
                                                localStorage.setItem('empresaSeleccionada', JSON.stringify(empresa));
                                                dispatch(setEmpresa(empresa));

                                                const primerSegmento = location.pathname.split('/')[1];
                                                navigate(`/${primerSegmento}`);
                                            }}
                                        >
                                            {empresa.nombre}
                                        </li>
                                    ))}
                                </ul>

                        </div>) 
                        } 
                    </>) 
                    }
                </div>
            </Modal>
        )
    );
};

export default SeleccionarEmpresa;