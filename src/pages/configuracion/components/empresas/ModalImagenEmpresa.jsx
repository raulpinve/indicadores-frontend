import React from "react";
import Modal from "../../../../shared/components/Modal";

const ModalImagenEmpresa = ({ cerrarModal, empresaSeleccionada }) => {
    if (!empresaSeleccionada) return null;

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title={`Imagen de ${empresaSeleccionada.nombre}`}
            size="md"
        >
            <div className="flex flex-col items-center justify-center p-4">
                <img
                    src={empresaSeleccionada.avatar}
                    alt={`Avatar de ${empresaSeleccionada.primerNombre}`}
                    className="max-h-[70vh] w-auto rounded-lg shadow-md object-contain"
                />
            </div>
        </Modal>
    );
};

export default ModalImagenEmpresa;
