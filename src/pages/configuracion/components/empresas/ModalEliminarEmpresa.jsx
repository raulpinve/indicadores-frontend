import MessageError from '../../../../shared/components/MessageError'
import { eliminarEmpresa } from '../../services/empresaServices'
import { handleErrors } from '../../../../utils/handleErrors'
import Button from '../../../../shared/components/Button'
import Modal from '../../../../shared/components/Modal'
import React, { useState } from 'react'
import { toast } from 'sonner'

const ModalEliminarEmpresa = (props) => {
    const { cerrarModal, setEmpresas, empresaSeleccionada } = props
    const [confirmText, setConfirmText] = useState("")
    const [messageError, setMessageError] = useState(false)
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        if (confirmText !== "ELIMINAR") {
            setMessageError("Debes escribir ELIMINAR para confirmar la eliminación.")
            return
        }

        setMessageError(false)
        setLoading(true)
        try {
            await eliminarEmpresa(empresaSeleccionada.id)
            setEmpresas(prevEmpresas => prevEmpresas.filter(e => e.id !== empresaSeleccionada.id))
            cerrarModal()
            toast.success(`La empresa "${empresaSeleccionada.nombre}" fue eliminada exitosamente.`)
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
            title="Eliminar empresa"
            size="md"
        >
            <div>
                <p className="mb-3">
                    Para eliminar la empresa <strong>{empresaSeleccionada?.nombre}</strong>, 
                    escribe <span className="font-semibold">ELIMINAR</span> en el campo de abajo:
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

export default ModalEliminarEmpresa
