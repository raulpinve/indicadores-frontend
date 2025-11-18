import React, { useEffect, useState } from 'react';
import Grafica from './components/Grafica';
import Registros from './components/Registros';
import FichaTecnica from './components/FichaTecnica';
import ControlVersiones from './components/ControlVersiones';
import { useParams } from 'react-router-dom';
import { obtenerVersionIndicador } from './services/indicadoresServices';
import SkeletonElement from '../../shared/components/SkeletonElement';
import Card from '../../shared/components/Card';
import CardTitulo from '../../shared/components/CardTitulo';
import Table from '../../shared/components/Table';
import TableTr from '../../shared/components/TableTr';
import TableTh from '../../shared/components/TableTh';
import TableThead from '../../shared/components/TableThead';
import TableTd from '../../shared/components/TableTd';
import TableTbody from '../../shared/components/TableTbody';
import LoadingIndicador from './components/Indicador/LoadingIndicador';

const IndicadorPage = () => {
    const [versionSeleccionada, setVersionSeleccionada] = useState(null);
    const [loadingPage, setLoadingPage] = useState(false);
    const [error, setError] = useState(null);

    const { versionId } = useParams();

    useEffect(() => {
        const fetchInformacionVersion = async () => {
            setLoadingPage(true);
            try {
                const response = await obtenerVersionIndicador(versionId);
                setVersionSeleccionada(response.data);
            } catch (error) {
                if (error.response?.status === 404) {
                    setError("El indicador no existe o fue eliminado.");
                } else {
                    setError("Ocurrió un error cargando el indicador.");
                }
            } finally {
                setLoadingPage(false);  
            }
        };

        fetchInformacionVersion();
    }, [versionId]);

    if (loadingPage) {
        return (<LoadingIndicador />);
    }

    if (error) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
                <p className="text-gray-600 mt-2">Verifica el enlace o la versión solicitada.</p>
            </div>
        );
    }

    if (!versionSeleccionada) {
        return (
            <div className="p-6">
                <p className="text-gray-600">No hay información disponible del indicador.</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className='font-semibold text-2xl flex items-center gap-2 my-4'>
                {/* Nombre */}
                <span>{versionSeleccionada?.nombre}</span>

                {/* Versión */}
                <span className="inline-flex items-center rounded-lg bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10">
                    V.{versionSeleccionada?.version}
                </span>

                {/* Estado con color */}
                <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium inset-ring capitalize
                        ${
                            {
                                vigente: "bg-green-100 dark:bg-green-700 dark:text-white text-green-700 inset-ring-green-600/10",
                                obsoleto: "bg-red-100 dark:bg-red-700 dark:text-white text-red-700 inset-ring-red-600/10",
                                enRevision: "bg-yellow-50 text-yellow-700 inset-ring-yellow-600/10",
                            }[versionSeleccionada?.estado] || "bg-gray-50 text-gray-700 inset-ring-gray-600/10"
                        }`
                    }
                >
                    {{
                        vigente: "Vigente",
                        obsoleto: "Obsoleto",
                        enRevision: "En Revisión",
                    }[versionSeleccionada?.estado] || versionSeleccionada?.estado}
                </span>
            </h1>

            {/* Gráfica y registros */}
            <div className="grid gap-4">
                <Grafica />
                <Registros />
            </div>

            {/* Ficha técnica y control de versiones */}
            <div className="grid grid-cols-[400px_1fr] gap-4 mt-4">
                <FichaTecnica
                    versionSeleccionada={versionSeleccionada}
                    loadingPage={loadingPage}
                />
                <ControlVersiones />
            </div>
        </div>
    );
};

export default IndicadorPage;