import { cambiarAvatarEmpresa, eliminarAvatarEmpresa, eliminarEmpresa } from "../../services/empresaServices";
import { LuUpload, LuTrash2 } from "react-icons/lu";
import { ImSpinner2 } from "react-icons/im";
import { useState, useRef } from "react";
import { toast } from "sonner";

export default function EmpresaAvatar({ imagenInicial, empresaId }) {
  const [preview, setPreview] = useState(imagenInicial);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  const fileInputRef = useRef(null);
  const handleEditClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const imagenAnterior = preview;
		setLoading(true);

		try {
			const nuevoAvatar = await cambiarAvatarEmpresa(empresaId, file);
			setPreview(nuevoAvatar?.data?.avatarThumbnail || imagenAnterior);
			toast.success("Avatar cambiado exitosamente.");
		} catch {
			toast.error("Error al subir avatar.");
			setPreview(imagenAnterior);
		} finally {
			setLoading(false);
		}
  };

  const handleDelete = async () => {
		const defaultAvatar = `${import.meta.env.VITE_API_URL}/images/defaults/empresa-default.png`;
		setPreview(defaultAvatar);
		try {
			const respuesta = await eliminarAvatarEmpresa(empresaId);
			setPreview(respuesta?.avatarThumbnail || defaultAvatar);
			toast.success("Avatar eliminado exitosamente.");
		} catch (error) {
			toast.error(error?.response?.data?.message || "No se pudo eliminar el avatar.");
			setPreview(defaultAvatar);
		}
  };

  return (
		<div
			className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer"
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{/* Imagen */}
			<img
				src={preview}
				alt="Avatar empresa"
				className="w-full h-full object-cover rounded-full border border-gray-300"
			/>

			{/* Botones hover */}
			{hover && !loading && (
				<div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center gap-2 rounded-full">
					<button
						onClick={handleEditClick}
						className="bg-white p-1 rounded-full text-black hover:bg-gray-200"
						title="Cambiar avatar"
					>
						<LuUpload className="w-4 h-4" />
					</button>
					<button
						onClick={handleDelete}
						className="bg-red-500 p-1 rounded-full text-white hover:bg-red-600"
						title="Eliminar avatar"
					>
						<LuTrash2 className="w-4 h-4" />
					</button>
				</div>
			)}

			{/* Input oculto */}
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }}
				accept="image/*"
				onChange={handleFileChange}
			/>

			{/* Spinner loading */}
			{loading && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
					<ImSpinner2 className="w-7 h-7 text-white animate-spin" />
				</div>
			)}
		</div>
  );
}

