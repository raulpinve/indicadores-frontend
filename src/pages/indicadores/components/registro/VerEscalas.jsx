import React from 'react';
import Table from '../../../../shared/components/Table';
import TableThead from '../../../../shared/components/TableThead';
import TableTr from '../../../../shared/components/TableTr';
import TableTh from '../../../../shared/components/TableTh';
import TableTd from '../../../../shared/components/TableTd';
import TableTbody from '../../../../shared/components/TableTbody';

const VerEscalas = (props) => {
    const {versionSeleccionada} = props;
    return (
        <Table>
            <TableThead>
                <TableTr>
                    <TableTh className='text-xs text-center'>Escala</TableTh>
                    <TableTh className='text-xs text-center'>Valor</TableTh>
                </TableTr>
            </TableThead>
            <TableTbody>
                {/* Tipo absoluta */}
                {versionSeleccionada?.metas[0]?.tipoMeta === "absoluta" && (<>
                    <TableTr>
                        <TableTd className='text-xs text-center'>Óptimo</TableTd>
                        <TableTd className='text-xs text-center'>{versionSeleccionada?.metas[0]?.direccion === "asc" ? "≥": "<" }  {versionSeleccionada?.metas[0]?.valorMeta}</TableTd>
                    </TableTr>
                    <TableTr>
                        <TableTd className='text-xs text-center'>Crítico</TableTd>
                        <TableTd className='text-xs text-center'>{versionSeleccionada?.metas[0]?.direccion === "asc" ? "<": ">" }  {versionSeleccionada?.metas[0]?.valorMeta}</TableTd>
                    </TableTr>
                </>)}

                {/* Tipo escala */}
                {versionSeleccionada?.metas[0]?.tipoMeta === "escala"  && (<>
                    <TableTr>
                        <TableTd className='text-xs text-center'>Óptimo</TableTd>
                        <TableTd className='text-xs text-center'>{versionSeleccionada?.metas[0]?.direccion === "asc" ? "≥": "≤" }  {versionSeleccionada?.metas[0]?.optimo}</TableTd>
                    </TableTr>
                    <TableTr>
                        <TableTd className='text-xs text-center'>Aceptable</TableTd>
                        <TableTd className='text-xs text-center'>{versionSeleccionada?.metas[0]?.direccion === "asc" ? "≥": "≤" }  {versionSeleccionada?.metas[0]?.aceptable}</TableTd>
                    </TableTr>
                    <TableTr>
                        <TableTd className='text-xs text-center'>Crítico</TableTd>
                        <TableTd className='text-xs text-center'>{versionSeleccionada?.metas[0]?.direccion === "asc" ? "<": ">" }  {versionSeleccionada?.metas[0]?.aceptable}</TableTd>
                    </TableTr>
                </>)}
            </TableTbody>
        </Table>
    );
};

export default VerEscalas;