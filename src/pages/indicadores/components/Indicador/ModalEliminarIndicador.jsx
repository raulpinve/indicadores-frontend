import MessageError from '../../../../shared/components/MessageError'
import { handleErrors } from '../../../../utils/handleErrors'
import Button from '../../../../shared/components/Button'
import Modal from '../../../../shared/components/Modal'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { eliminarVersionIndicador } from '../../services/indicadoresServices'
import { useNavigate } from 'react-router-dom'

const ModalEliminarIndicador = (props) => {
    const { cerrarModal, versionSeleccionada } = props
    const [confirmText, setConfirmText] = useState("")
    const [messageError, setMessageError] = useState(false)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        if (confirmText !== "ELIMINAR") {
            setMessageError("Debes escribir ELIMINAR para confirmar la eliminación.")
            return
        }

        setMessageError(false)
        setLoading(true)
        try {
            await eliminarVersionIndicador(versionSeleccionada.id)
            cerrarModal()
            toast.success(`La versión del indicador ha sido eliminado exitosamente.`);
            navigate("/indicadores");
        } catch (error) {
            handleErrors(error, () => {}, setMessageError)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Eliminar versión del indicador"
            size="md"
        >
            <div>
                <p className="mb-3">
                    Para eliminar esta versión del indicador escribe <span className="font-semibold">ELIMINAR</span> en el campo de abajo:
                </p>

                <input
                    type="text"
                    className="input-form"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Escribe ELIMINAR"
                />

                {messageError && <MessageError>{messageError}</MessageError>}

                <div className="mt-4 flex justify-end gap-2">
                    <Button
                        colorButton="secondary"
                        textButton="Cancelar"
                        type="button"
                        onClick={() => cerrarModal(false)}
                    />
                    <Button
                        type="button"
                        colorButton="danger"
                        textButton="Eliminar"
                        loading={loading}
                        disabled={confirmText !== "ELIMINAR"}
                        onClick={onDelete}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default ModalEliminarIndicador
