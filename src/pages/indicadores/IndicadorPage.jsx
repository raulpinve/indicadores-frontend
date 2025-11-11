import React from 'react';
import Grafica from './components/Grafica';
import Registros from './components/Registros';
import FichaTecnica from './components/FichaTecnica';
import ControlVersiones from './components/ControlVersiones';

const IndicadorPage = () => {
    return (
        <div>
            <h1 className='font-semibold text-xl flex gap-2 my-4'> 
                <span>Nombre del indicador </span>
                <span className="inline-flex items-center rounded-lg bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10">V.1</span>
                {/* <span className="inline-flex items-center rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10">Vigente</span>    */}
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 inset-ring inset-ring-red-600/10">Obsoleto</span>
            </h1>

            {/* Gráfica y registros */}
            <div className="grid gap-4">
                {/* Gráfica */}
                <Grafica />

                {/* Registros */}
                <Registros />
            </div>
            
            {/* Ficha técnica y control de versiones */}
            <div className="grid grid-cols-[400px_1fr] gap-4 mt-4">
                <FichaTecnica />
                <ControlVersiones />
            </div>
        </div>
    );
};

export default IndicadorPage;