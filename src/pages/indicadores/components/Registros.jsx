import React, { useEffect, useState } from 'react';
import CardTitulo from '../../../shared/components/CardTitulo';
import Card from '../../../shared/components/Card';
import Button from '../../../shared/components/Button';
import Table from '../../../shared/components/Table';
import TableThead from '../../../shared/components/TableThead';
import TableTr from '../../../shared/components/TableTr';
import TableTh from '../../../shared/components/TableTh';
import TableTbody from '../../../shared/components/TableTbody';
import TableTd from '../../../shared/components/TableTd';
import { LuFolder, LuPencil, LuTrash2 } from 'react-icons/lu';
import ModalCrearRegistro from './registro/ModalCrearRegistro.jsx';
import { obtenerRegistros } from '../services/registrosServices.js';
import { etiquetasResultado, formatPeriodo, getResultadoColor } from '../utils/utils.js';
import ModalEditarRegistro from './registro/ModalEditarRegistro.jsx';
import ModalEliminarRegistro from './registro/ModalEliminarRegistro.jsx';
import { useNavigate } from 'react-router-dom';
import { handleErrorsBasic } from '../../../utils/handleErrors.js';
import Pagination from '../../../shared/components/Pagination.jsx';
import SkeletonElement from '../../../shared/components/SkeletonElement.jsx';

const Registros = (props) => {
    const {versionSeleccionada} = props;
    const [modalActivo, setModalActivo] = useState("");
    const [registros, setRegistros] = useState([]);
    const [registroSeleccionado, setRegistroSeleccionado] = useState();
    const [messageError, setMessageError] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [loading, setLoading] = useState();
    const navigate = useNavigate();

    // Obtener los registros
    useEffect(() => {
        const fetchRegistros = async () => {
            setLoading(true);
            try {
                const resultado = await obtenerRegistros(versionSeleccionada?.id, "", paginaActual);
                setPaginaActual(resultado.paginacion.pagina);
                setTotalPaginas(resultado.paginacion.totalPaginas);
                setRegistros(resultado.data);
            } catch (error) {
                handleErrorsBasic(error, setMessageError)
            } finally{
                setLoading(false);
            }
        }
        fetchRegistros();
    }, [paginaActual])

    return (<>
        <Card>
            <CardTitulo>
                Registros 
                <Button
                    className='text-sm ml-2'
                    colorButton={`primary`}
                    onClick = {() => {
                        setModalActivo("crear");
                    }}
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
                    {!loading && registros.length === 0 && messageError && (
                        <TableTr><TableTd colSpan={`5`}>{messageError}</TableTd></TableTr>
                    )}
                    {loading && registros.length === 0 && !messageError && 
                        [0,1,2,3,4,5,6,7,8,9].map(element => 
                        <TableTr key={element}>
                            <TableTd><SkeletonElement 
                            
                            className="h-6" /></TableTd>
                            <TableTd><SkeletonElement className="h-6" /></TableTd>
                            <TableTd><SkeletonElement className="h-6" /> </TableTd>
                            <TableTd><SkeletonElement className="h-6" /></TableTd>
                            <TableTd>
                                <div className="flex justify-center gap-1">
                                    <SkeletonElement className="h-6 w-full" />
                                    <SkeletonElement className="h-6 w-full" />
                                </div>
                            </TableTd>
                        </TableTr>
                    )}
                    {registros.map(registro => 
                        <TableTr key={registro.id}>
                            <TableTd>{formatPeriodo(registro)}</TableTd>
                            <TableTd>
                                <div className="flex justify-center gap-2 items-center">
                                    <span className='font-semibold'>{registro.resultado}</span>
                                    <div className={`${getResultadoColor(registro.estadoResultado)} dark:text-white py-1.5 px-2 text-xs rounded-md font-semibold`}>
                                        {etiquetasResultado[registro.estadoResultado]}
                                    </div>
                                </div>
                            </TableTd>
                            <TableTd>
                                <div className="flex justify-center">
                                    <Button 
                                        colorButton={`secondary`}
                                        onClick={()=> {
                                            navigate("/evidencias/" + registro?.id)
                                        }}
                                    >
                                        <LuFolder />
                                    </Button>
                                </div>
                            </TableTd>
                            <TableTd >
                                {registro.analisis !== "" ? 
                                    <p>{registro.analisis}</p>
                                    : <p className='text-center'>---</p>
                                }
                            </TableTd>
                            <TableTd>
                                <div className="flex justify-center gap-1">
                                    <Button
                                        colorButton={`secondary`}
                                        onClick= {() => {
                                            setModalActivo("editar");
                                            setRegistroSeleccionado(registro)
                                        }}
                                    >
                                        <LuPencil />
                                    </Button>
                                    <Button 
                                        colorButton={`danger`}
                                        onClick={() => {
                                            setModalActivo("eliminar");
                                            setRegistroSeleccionado(registro);
                                        }}
                                    >
                                        <LuTrash2 />
                                    </Button>
                                </div>
                            </TableTd>
                        </TableTr>
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

        {modalActivo === "crear" && (
            <ModalCrearRegistro 
                cerrarModal = {()=> setModalActivo("")}
                versionSeleccionada = {versionSeleccionada}
                setRegistros = {setRegistros}
            />
        )}

        {modalActivo === "editar" && (
            <ModalEditarRegistro 
                cerrarModal = {()=> setModalActivo("")}
                versionSeleccionada = {versionSeleccionada}
                registroSeleccionado = {registroSeleccionado}
                setRegistros = {setRegistros}
            />
        )}

        {modalActivo === "eliminar" && (
            <ModalEliminarRegistro 
                cerrarModal={() => setModalActivo("")}
                registroSeleccionado = {registroSeleccionado}
                setRegistros={setRegistros}
            />
        )}
    </>);
};

export default Registros;