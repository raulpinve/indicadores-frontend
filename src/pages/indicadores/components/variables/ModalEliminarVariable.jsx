import React, { useEffect, useState } from 'react';
import Modal from '../../../../shared/components/Modal';
import Button from '../../../../shared/components/Button';
import MessageError from '../../../../shared/components/MessageError';
import { toast } from 'sonner';

const ModalEliminarVariable = (props) => {
    const { cerrarModal, setVariables, variableSeleccionada } = props;
    const [confirmText, setConfirmText] = useState('variable');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEliminar = () => {
        if (confirmText !== variableSeleccionada.alias) {
            setError('El alias no coincide. Escribe el alias exacto para confirmar.');
            return;
        }

        setError('');
        setLoading(true);

        setVariables(prev =>
            prev.filter(v => v.id !== variableSeleccionada.id)
        );

        toast.success('Variable eliminada exitosamente.');
        setLoading(false);
        cerrarModal();
    };

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Eliminar variable"
            size="md"
        >
            <div className="space-y-2">
                <p> Estás a punto de eliminar la variable <b>{variableSeleccionada?.nombre}</b>. Para confirmar, escribe el alias de la variable: <b>{variableSeleccionada?.alias}</b></p>
                <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Escribe el alias aquí"
                    className={`input-form ${error ? 'input-form-error' : ''}`}
                />
                {error && <MessageError>{error}</MessageError>}
                <div className="mt-4 flex justify-end gap-2">
                    <Button
                        colorButton="secondary"
                        textButton="Cancelar"
                        type="button"
                        onClick={() => cerrarModal(false)}
                    />
                    <Button
                        colorButton="danger"
                        textButton="Eliminar"
                        onClick={handleEliminar}
                        loading={loading}
                        disabled={confirmText !== variableSeleccionada?.alias}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ModalEliminarVariable;
