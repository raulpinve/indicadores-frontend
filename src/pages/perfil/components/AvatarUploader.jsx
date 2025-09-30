import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LuUpload, LuTrash2 } from 'react-icons/lu';
import { actualizarAvatar } from '../../../store/authSlice';
import { cambiarAvatarUsuario, eliminarAvatarUsuario } from '../services/perfilServices';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'sonner';

const AvatarUploader = ({ avatarInicial }) => {
    const usuario = useSelector(state => state.auth.usuario);
    const dispatch = useDispatch();

    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(avatarInicial || usuario?.avatarThumbnail);
    const [hover, setHover] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEditClick = () => fileInputRef.current.click();

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        try {
            setLoading(true);
            const respuesta = await cambiarAvatarUsuario(usuario.id, file);

            // Actualizar Redux con el nuevo avatar
            dispatch(actualizarAvatar({
                avatar: respuesta.data.data.avatar,
                avatarThumbnail: respuesta.data.data.avatarThumbnail,
            }));

            setPreview(respuesta.data.data.avatarThumbnail);
        } catch (error) {
            console.error("Error al actualizar avatar:", error);
            alert("No se pudo actualizar el avatar");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const defaultAvatar = `${import.meta.env.VITE_API_URL}/images/defaults/empresa-default.png`;
        setPreview(defaultAvatar); // previsualización inmediata

        try {
            // Llamada al backend para eliminar avatar
            const respuesta = await eliminarAvatarUsuario();

            // Actualizar Redux con el avatar eliminado (o datos devueltos por backend)
            dispatch(actualizarAvatar({
                avatar: respuesta.avatar || defaultAvatar,
                avatarThumbnail: respuesta.avatarThumbnail || defaultAvatar,
            }));
        } catch (error) {
            toast.error(error?.response?.data?.message || "Ha ocurrido un interno. Por favor, intente de nuevo.");
        }
    };

    return (
        <div 
            className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img 
                src={preview} 
                alt="avatar" 
                className="w-full h-full object-cover rounded-full border border-gray-300"
            />

            {hover && !loading && (
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center gap-1 rounded-full">
                    <button 
                        onClick={handleEditClick}
                        className="bg-white p-1 rounded-full text-black hover:bg-gray-200"
                        title="Cambiar avatar"
                    >
                        <LuUpload />
                    </button>
                    <button 
                        onClick={handleDelete}
                        className="bg-red-500 p-1 rounded-full text-white hover:bg-red-600"
                        title="Eliminar avatar"
                    >
                        <LuTrash2 />
                    </button>
                </div>
            )}

            <input 
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
            />
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                    <ImSpinner2 className="w-10 h-10 text-white animate-spin" />
                </div>
            )}
        </div>
    );
};

export default AvatarUploader;
