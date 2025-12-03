import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../shared/components/Card';
import CardTitulo from '../../shared/components/CardTitulo';
import Button from '../../shared/components/Button';
import { obtenerRegistro } from '../indicadores/services/registrosServices';
import { obtenerVersionIndicador } from '../indicadores/services/indicadoresServices';
import { obtenerEvidencias } from '../indicadores/services/evidenciasServices';
import useDebounce from '../../shared/hooks/useDebounce';
import { LuDownload, LuEye, LuPaperclip, LuTrash2 } from 'react-icons/lu';
import Table from '../../shared/components/Table';
import TableThead from '../../shared/components/TableThead';
import TableTr from '../../shared/components/TableTr';
import TableTh from '../../shared/components/TableTh';
import TableTbody from '../../shared/components/TableTbody';
import TableTd from '../../shared/components/TableTd';
import SkeletonElement from '../../shared/components/SkeletonElement';
import FormUploadFile from './components/FormUploadFile';

const EvidenciasPage = () => {
    const {registroId} = useParams();
    const [registro, setRegistro] = useState();
    const [versionIndicador, setVersionIndicador] = useState();
    const [consulta, setConsulta] = useState("");
    const debouncedConsulta = useDebounce(consulta, 500);
    const [loading, setLoading] = useState(true);
    const [pagina, setPagina] = useState(0);
    const [evidencias, setEvidencias] = useState([]);

    // Obtener información del registro
    useEffect(() => {
        let isActive = true;

        const runPipeline = async () => {
            setLoading(true);

            try {
                const resultadoRegistro = await obtenerRegistro(registroId);
                if (!isActive) return;
                setRegistro(resultadoRegistro?.data);
                
                const resultadoVersion = await obtenerVersionIndicador(resultadoRegistro?.data?.versionIndicadorId);
                if(!isActive) return;
                setVersionIndicador(resultadoVersion?.data)

                const resultadoEvidencias = await obtenerEvidencias(pagina, debouncedConsulta, resultadoRegistro?.data?.id)
                if(!isActive) return;
                setEvidencias(resultadoEvidencias?.data);

            } catch (error) {
                console.error(error);
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        };

        if (registroId != null) {
            runPipeline();
        }

        return () => {
            isActive = false;
        };
    }, [registroId]);

    return (<>
        {loading && (<>
            <div className='font-semibold text-2xl flex items-center gap-2 my-4'>
                <SkeletonElement className="h-6 w-[200px]"/>
            </div>
            <Card>
                <CardTitulo className={`flex items-center gap-2`}>
                    Evidencias
                    <SkeletonElement className="h-6 w-[120px]"/>
                </CardTitulo>
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh>Archivo</TableTh>
                            <TableTh className='text-center'>Acciones</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>
                        {[0,1,2,3,4,5,6].map(index => 
                            <TableTr key={index}>
                                <TableTd><SkeletonElement className="h-6 w-full" /></TableTd>
                                <TableTd>
                                    <div className="flex items-center justify-center gap-2">
                                        <Button
                                            colorButton={`secondary`}
                                            title="Ver vista previa"
                                        >
                                            <LuEye />
                                        </Button>
                                        <Button
                                            colorButton={`secondary`}
                                            title="Descargar"
                                        >
                                            <LuDownload />
                                        </Button>
                                        <Button
                                            colorButton={`danger`}
                                            title="Eliminar"
                                        >   
                                            <LuTrash2 />
                                        </Button>
                                    </div>
                                </TableTd>
                            </TableTr>
                        )}
                    </TableTbody>
                </Table>
            </Card>
        </>)}
        {!loading && (<>
            <h1 className='font-semibold text-2xl flex items-center gap-2 my-4'>
                {/* Nombre */}
                <span>{versionIndicador?.nombre}</span>

                {/* Versión */}
                <span className="inline-flex items-center rounded-lg bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10">
                    V.{versionIndicador?.version}
                </span>

                {/* Estado con color */}
                <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium inset-ring capitalize
                        ${
                            {
                                vigente: "bg-green-100 dark:bg-green-700 dark:text-white text-green-700 inset-ring-green-600/10",
                                obsoleto: "bg-red-100 dark:bg-red-700 dark:text-white text-red-700 inset-ring-red-600/10",
                                enRevision: "bg-yellow-50 text-yellow-700 inset-ring-yellow-600/10",
                            }[versionIndicador?.estado] || "bg-gray-50 text-gray-700 inset-ring-gray-600/10"
                        }`
                    }
                >
                    {{
                        vigente: "Vigente",
                        obsoleto: "Obsoleto",
                        enRevision: "En Revisión",
                    }[versionIndicador?.estado] || versionIndicador?.estado}
                </span>
            </h1>
            <Card>
                <CardTitulo> 
                    Evidencias 
                    <FormUploadFile
                        registro = {registro}
                        setEvidencias = {setEvidencias}
                    />
                </CardTitulo>
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh>Archivo</TableTh>
                            <TableTh className='text-center'>Acciones</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>
                        <TableTr>
                            <TableTd>Nombre del archivo</TableTd>
                            <TableTd>
                                <div className="flex items-center justify-center gap-2">
                                    <Button
                                        colorButton={`secondary`}
                                        title="Ver vista previa"
                                    >
                                        <LuEye />
                                    </Button>
                                    <Button
                                        colorButton={`secondary`}
                                        title="Descargar"
                                    >
                                        <LuDownload />
                                    </Button>
                                    <Button
                                        colorButton={`danger`}
                                        title="Eliminar"
                                    >   
                                        <LuTrash2 />
                                    </Button>
                                </div>
                            </TableTd>
                        </TableTr>
                    </TableTbody>
                </Table>
            </Card>
        </>)}
    </>);
};

export default EvidenciasPage;