import React, { useEffect, useState } from 'react';
import Grafica from './components/Grafica';
import Registros from './components/Registros';
import FichaTecnica from './components/FichaTecnica';
import ControlVersiones from './components/ControlVersiones';
import { useParams } from 'react-router-dom';
import { obtenerVersionIndicador } from './services/indicadoresServices';
import SkeletonElement from '../../shared/components/SkeletonElement';

const IndicadorPage = () => {
    // Obtener la información del indicador
    const [versionSeleccionada, setVersionSeleccionada] = useState(null);
    const [loadingPage, setLoadingPage] = useState(false);

    // Obtener la versión seleccionada
    const {versionId} = useParams();

    // Consultar información del indicador
    useEffect(() => {
        const fecthInformacionVersion = async() => {
            setLoadingPage(true);
            try {
                const response = await obtenerVersionIndicador(versionId);
                setVersionSeleccionada(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingPage(false);
            }
        }
        fecthInformacionVersion();
    }, [])

    console.log(versionSeleccionada)

    return (
        <div>
            <h1 className='font-semibold text-2xl flex items-center gap-2 my-4'> 
                {loadingPage && !versionSeleccionada && (<>
                    <SkeletonElement className="w-[220px] h-6"/>
                    <SkeletonElement className="w-8 h-6"/>
                    <SkeletonElement className="w-12 h-6"/>
                </>)}
                {!loadingPage && versionSeleccionada && (<>
                    {/* Color versión estado  */}
                    <span>{versionSeleccionada?.nombre}</span>
                    <span className="inline-flex items-center rounded-lg bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10">V.{versionSeleccionada?.version}</span>
                    {/* Estado con color dinámico */}
                    <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium inset-ring capitalize
                            ${{
                                vigente: "bg-green-100 dark:bg-green-700 dark:text-white text-green-700 inset-ring-green-600/10",
                                obsoleto: "bg-red-100 dark:bg-red-700 dark:text-white text-red-700 inset-ring-red-600/10",
                                enRevision: "bg-yellow-50 text-yellow-700 inset-ring-yellow-600/10",
                            }[versionSeleccionada?.estado] || "bg-gray-50 text-gray-700 inset-ring-gray-600/10"}`
                        }
                    >
                        {{
                            vigente: "Vigente",
                            obsoleto: "Obsoleto",
                            enRevision: "En Revisión",
                        }[versionSeleccionada?.estado] || versionSeleccionada?.estado}
                    </span>
                </>)}
                {/* <span className="inline-flex items-center rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10">Vigente</span>    */}
            </h1>

            {/* Gráfica y registros */}
            <div className="grid gap-4 hidden">
                {/* Gráfica */}
                <Grafica />

                {/* Registros */}
                <Registros />
            </div>
            
            {/* Ficha técnica y control de versiones */}
            <div className="grid grid-cols-[400px_1fr] gap-4 mt-4">
                <FichaTecnica 
                    versionSeleccionada={versionSeleccionada}
                    loadingPage = {loadingPage}
                />
                <ControlVersiones />
            </div>
        </div>
    );
};

export default IndicadorPage;