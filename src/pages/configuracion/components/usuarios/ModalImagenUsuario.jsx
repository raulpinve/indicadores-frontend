import React from "react";
import Modal from "../../../../shared/components/Modal";

const ModalImagenUsuario = ({ cerrarModal, usuarioSeleccionado }) => {
    if (!usuarioSeleccionado) return null;

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title={`Imagen de ${usuarioSeleccionado.primerNombre} ${usuarioSeleccionado.apellidos}`}
            size="md"
        >
            <div className="flex flex-col items-center justify-center p-4">
                {/* Imagen de perfil */}
                <img
                    src={usuarioSeleccionado.avatar}
                    alt={`Avatar de ${usuarioSeleccionado.primerNombre}`}
                    className="max-h-[70vh] w-auto rounded-lg shadow-md object-contain"
                />
            </div>
        </Modal>
    );
};

export default ModalImagenUsuario;
