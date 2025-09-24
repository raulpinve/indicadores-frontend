import { useState } from "react";
import { LuCamera } from "react-icons/lu";
import { cambiarAvatarEmpresa } from "../../services/empresaServices";
import { toast } from "sonner";

export default function EmpresaAvatar({ imagenInicial, empresaId }) {
  const [preview, setPreview] = useState(imagenInicial);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imagenAnterior = preview;
    try {
      const nuevoAvatar = await cambiarAvatarEmpresa(empresaId, file);
      setPreview(nuevoAvatar?.data?.avatarThumbnail || imagenAnterior);
    } catch {
      toast.error("Error al subir avatar.");
      setPreview(imagenAnterior);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <label className="relative cursor-pointer group">
        {/* Avatar */}
        <img
          src={preview}
          alt={`Avatar empresa`}
          className={`rounded-full w-12 h-12 object-cover transition-opacity duration-300 ${
            loading ? "opacity-50" : "opacity-100"
          }`}
          onLoad={() => setLoading(false)}
        />

        {/* Overlay de cámara */}
        <div
          className="absolute inset-0 flex items-center justify-center 
          bg-black/50 opacity-0 group-hover:opacity-100 
          rounded-full transition"
        >
          <LuCamera className="text-white text-lg" />
        </div>

        {/* Loader simple */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
