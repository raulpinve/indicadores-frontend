import React, { useEffect, useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerVersionesPorVersionId } from '../services/versionesServices';
import SkeletonTable from '../../../shared/components/SkeletonTable';
import ModalEditarNumeroVersion from './versiones/ModalEditarNumeroVersion';

const ControlVersiones = (props) => {
    const [loading, setLoading] = useState();
    const [versiones, setVersiones] = useState([]);
    const navigate = useNavigate();
    const {versionId} = useParams();
    const [modalActivo, setModalActivo] = useState("");
    const [versionSeleccionada, setVersionSeleccionada] = useState();

    // Obtener el listado de versiones
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const resultado = await obtenerVersionesPorVersionId(versionId);
                setVersiones(resultado?.data);   
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    return (
        <Card>
            <CardTitulo>Control de versiones </CardTitulo>
            <Table>
                <TableThead>
                    <TableTr>
                        <TableTh className='text-center'><span>Versión</span></TableTh>
                        <TableTh className='text-center'><span>Estado</span></TableTh>
                        <TableTh><span>Descripción</span></TableTh>
                        <TableTh className='text-center'><span>Acciones</span></TableTh>
                    </TableTr>
                </TableThead>
                {loading && versiones.length === 0 && <SkeletonTable rows={7} columns={4} />}
                {!loading && versiones.length > 0 && (
                    <TableTbody>
                        {versiones.map(version => (
                            <TableTr key={version?.id}>
                                <TableTd className='text-center'>{version.version}</TableTd>
                                <TableTd>
                                    <div className="flex items-center justify-center">
                                        <span
                                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium inset-ring capitalize
                                                ${
                                                    {
                                                        vigente: "bg-green-100 dark:bg-green-700 dark:text-white text-green-700 inset-ring-green-600/10",
                                                        obsoleto: "bg-red-100 dark:bg-red-700 dark:text-white text-red-700 inset-ring-red-600/10",
                                                        enRevision: "bg-yellow-50 text-yellow-700 inset-ring-yellow-600/10",
                                                    }[version?.estado] || "bg-gray-50 text-gray-700 inset-ring-gray-600/10"
                                                }`
                                            }
                                        >
                                            {{
                                                vigente: "Vigente",
                                                obsoleto: "Obsoleto",
                                                enRevision: "En Revisión",
                                            }[version?.estado] || version?.estado}
                                        </span>
                                    </div>
                                </TableTd>
                                <TableTd>
                                    {version?.descripcion}
                                </TableTd>
                                <TableTd>
                                    <div className="flex justify-center gap-1">
                                        <Button
                                            colorButton={`secondary`}
                                            title={`Actualizar versión a partir de esta`}
                                            onClick={() => {
                                                navigate(`/indicadores/${version?.id}/actualizar`)
                                            }}
                                        >
                                            <LuRotateCcw />
                                        </Button>
                                        <Button
                                            colorButton={`secondary`}
                                            title={`Editar número de versión`}
                                            onClick={() => {
                                                setModalActivo("editar-version");
                                                setVersionSeleccionada(version);
                                            }}
                                        >
                                            <LuArrowLeftRight />
                                        </Button>
                                    </div>
                                </TableTd>
                            </TableTr>
                        ))}
                    </TableTbody>
                )}
            </Table>
            {modalActivo === "editar-version" && 
                <ModalEditarNumeroVersion 
                    cerrarModal = {() => setModalActivo("")}
                    versionSeleccionada = {versionSeleccionada}
                    setVersiones = {setVersiones}
                />
            }
        </Card>
    );
};

export default ControlVersiones;