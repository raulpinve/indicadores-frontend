import SkeletonElement from '../../shared/components/SkeletonElement';
import EmpresaAvatar from './components/empresa/EmpresaAvatar';
import React, { useEffect, useState } from 'react';
import { obtenerEmpresa } from './services/empresaServices';
import Title from '../../shared/components/Title';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Procesos from './components/procesos/Procesos';

const ConfiguracionEmpresaPage = () => {
    const { empresaId } = useParams();
    const [ empresa, setEmpresa ] = useState();
    const [ loading, setLoading ] = useState();

    // Obtener información de la empresa
    useEffect(() => {
        const fetchEmpresa = async () => {
            try {
                const result = await obtenerEmpresa(empresaId)
                setEmpresa(result.data);
            } catch {
                toast.error("Ha ocurrido un error al obtener la empresa.")
            } finally{
                setLoading(false)
            }
        }
        fetchEmpresa();
    }, []); 

    return (
        <div>
            <Title className="flex items-center gap-3">
                {empresa ? (
                    <EmpresaAvatar
                        empresaId={empresaId}
                        imagenInicial={`${empresa.avatarThumbnail}`}
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                )}
                {empresa?.nombre || <SkeletonElement className="w-50 h-8" />}
            </Title>

            <div className='mt-4'>
                <Procesos />
            </div>
        </div>
    );
};

export default ConfiguracionEmpresaPage;