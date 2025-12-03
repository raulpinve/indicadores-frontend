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
import FormUploadFile from './components/FormUploadFile';
import LoadingEvidencias from './components/LoadingEvidencias';
import { useSelector } from 'react-redux';
import { host } from '../../utils/config';
import ModalAdvertencia from '../../shared/components/ModalAdvertencia';

const EvidenciasPage = () => {
    const [versionIndicador, setVersionIndicador] = useState();
    const token = useSelector(state => state.auth.token);
    const [evidencias, setEvidencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [consulta, setConsulta] = useState("");
    const [registro, setRegistro] = useState();
    const [pagina, setPagina] = useState(0);
    const {registroId} = useParams();
    const [modalActivo, setModalActivo] = useState("");
    const [messageErrorDownload, setMessageErrorDownload] = useState("");
    const debouncedConsulta = useDebounce(consulta, 500);

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

     const getFileExt = (filename) => {
        return filename.split('.').pop().toLowerCase();
    }

    const getMimetype = (filename) => {
        const ext = getFileExt(filename);
      
        // Excel
        if (ext === "xls") {
          return "application/vnd.ms-excel";
        } else if (ext === "xlsx") {
          return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        }
        // Word
        else if (ext === "doc") {
          return "application/msword";
        } else if (ext === "docx") {
          return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        }
        // Powerpoint
        else if (ext === "ppt") {
          return "application/vnd.ms-powerpoint";
        } else if (ext === "pptx") {
          return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        }
        // PDF
        else if (ext === "pdf") {
          return "application/pdf";
        }
        // Imágenes
        else if (ext === "png") {
          return "image/png";
        } else if (ext === "jpg" || ext === "jpeg") {
          return "image/jpeg";
        }
        // Video
        else if (ext === "mp4") {
          return "video/mp4";
        }
        // Otros tipos de archivos (genérico)
        else {
          return "application/octet-stream"; // MIME type por defecto para archivos binarios
        }
    };

    const handleDownload = async (evidencia) => {
        try {
            let headers = new Headers();
            headers.append('Authorization', token);

            const res = await fetch(`${host}/evidencias/${evidencia.id}/download`, {
                method: 'GET',
                headers: headers
            });

            if (!res.ok) {
                const errorBody = await res.json();
                setModalActivo("advertencia");
                throw new Error(errorBody.message);
            }

            const blob = await res.blob();
            const newBlob = new Blob([blob], { type: getMimetype(evidencia?.nombreGuardado) });

            const data = window.URL.createObjectURL(newBlob);
            const link = document.createElement('a');
            link.href = data;
            link.download = evidencia?.nombreOriginal || 'archivo'; // 👈 fuerza la descarga
            link.click();

            setTimeout(() => window.URL.revokeObjectURL(data), 100);
        } catch (error) {
            setModalActivo("advertencia");
            setMessageErrorDownload(error?.message);
        }
    }


    return (<>
        {loading && (<LoadingEvidencias />)}
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
                        {evidencias.map(evidencia => 
                            <TableTr key={evidencia.id}>
                                <TableTd>{evidencia.nombreOriginal}</TableTd>
                                <TableTd>
                                    <div className="flex items-center justify-center gap-2">
                                       <a 
                                            href={`/evidencias/${evidencia.id}/vista-previa`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            <Button colorButton="secondary" title="Ver vista previa">
                                                <LuEye />
                                            </Button>
                                        </a>
                                        <Button
                                            colorButton={`secondary`}
                                            title="Descargar"
                                            onClick={() => handleDownload(evidencia)}
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
        {modalActivo === "advertencia" && (
            <ModalAdvertencia 
                cerrarModal = {() => {
                    setModalActivo("");
                }}
                title={`Error`}
                message= {messageErrorDownload}
            />
        )}
    </>);
};

export default EvidenciasPage;