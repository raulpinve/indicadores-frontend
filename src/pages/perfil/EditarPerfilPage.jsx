import React from 'react';
import Card from '../../shared/components/Card';
import CardTitulo from '../../shared/components/CardTitulo';
import { useSelector } from 'react-redux';
import { LuPencil } from 'react-icons/lu';
import AvatarUploader from './components/AvatarUploader';

const EditarPerfilPage = () => {
    const usuario = useSelector(state => state?.auth?.usuario);

    return (
        <Card>
            <CardTitulo>Editar perfil</CardTitulo>
            <div className="mb-6 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <AvatarUploader avatarInicial={usuario.avatarThumbnail} />
                    <div className="order-3 xl:order-2">
                        <h4 className="mb-2 text-center text-lg font-semibold text-gray-800 xl:text-left dark:text-white/90">
                            {usuario.primerNombre} {usuario.apellidos}
                        </h4>
                        <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                            <p className="text-sm text-gray-500 dark:text-gray-400">{usuario.username}</p>
                            <div className="hidden h-3.5 w-px bg-gray-300 xl:block dark:bg-gray-700"></div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{usuario.email}</p>
                        </div>
                    </div>
                </div>

                <button className="flex items-center justify-center cursor-pointer gap-2 rounded-full border border-gray-300 dark:border-gray-800 dark:bg-white/[0.01] px-4 py-3 font-medium text-sm">
                    <LuPencil /> Editar
                </button>
            </div>
        </Card>
    );
};

export default EditarPerfilPage;
