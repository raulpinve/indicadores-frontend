import React from 'react';
import Modal from '../../../../shared/components/Modal';
import Table from '../../../../shared/components/Table';
import TableThead from '../../../../shared/components/TableThead';
import TableTh from '../../../../shared/components/TableTh';
import TableTbody from '../../../../shared/components/TableTbody';
import TableTd from '../../../../shared/components/TableTd';
import TableTr from '../../../../shared/components/TableTr';

const ModalVerEscalas = (props) => {
    const {cerrarModal, versionSeleccionada} = props;

    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title="Escalas"
            size="sm"
        >
            <Table>
                <TableThead>
                    <TableTr>
                        <TableTh>Escala</TableTh>
                        <TableTh>Valor</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    {/* Tipo absoluta */}
                    {versionSeleccionada?.metas[0]?.tipoMeta === "absoluta" && (<>
                        <TableTr>
                            <TableTd>Óptimo</TableTd>
                            <TableTd>{versionSeleccionada?.metas[0]?.direccion === "asc" ? "≥": "<" }  {versionSeleccionada?.metas[0]?.valorMeta}</TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTd>Crítico</TableTd>
                            <TableTd>{versionSeleccionada?.metas[0]?.direccion === "asc" ? "<": ">" }  {versionSeleccionada?.metas[0]?.valorMeta}</TableTd>
                        </TableTr>
                    </>)}

                    {/* Tipo escala */}
                    {versionSeleccionada?.metas[0]?.tipoMeta === "escala"  && (<>
                        <TableTr>
                            <TableTd>Óptimo</TableTd>
                            <TableTd>{versionSeleccionada?.metas[0]?.direccion === "asc" ? "≥": "≤" }  {versionSeleccionada?.metas[0]?.optimo}</TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTd>Aceptable</TableTd>
                            <TableTd>{versionSeleccionada?.metas[0]?.direccion === "asc" ? "≥": "≤" }  {versionSeleccionada?.metas[0]?.aceptable}</TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTd>Crítico</TableTd>
                            <TableTd>{versionSeleccionada?.metas[0]?.direccion === "asc" ? "<": ">" }  {versionSeleccionada?.metas[0]?.aceptable}</TableTd>
                        </TableTr>
                    </>)}
                </TableTbody>
            </Table>
        </Modal>
    );
};

export default ModalVerEscalas;