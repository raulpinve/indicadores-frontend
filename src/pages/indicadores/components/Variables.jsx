import React, { useEffect, useState } from 'react';
import Table from '../../../shared/components/Table';
import TableThead from '../../../shared/components/TableThead';
import TableTh from '../../../shared/components/TableTh';
import TableTr from '../../../shared/components/TableTr';
import TableTd from '../../../shared/components/TableTd';
import TableTbody from '../../../shared/components/TableTbody';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import ModalAgregarVariable from './variables/ModalAgregarVariable';
import Button from '../../../shared/components/Button';
import ModalEditarVariable from './variables/ModalEditarVariable';
import ModalEliminarVariable from './variables/ModalEliminarVariable';

const Variables = ({ variables, setVariables }) => {
    const [modalActivo, setModalActivo] = useState("");
    const [variableSeleccionada, setVariableSeleccionada] = useState();

    useEffect(() => {
        setVariables([{
            id: "fgfgfgf", 
            nombre: "Nombre variable",
            alias: "variable",
            descripcion: "Descripción de la variable"
        }])
    }, [])

    return (    
        <>
            <div className="mt-6">
                <div className="flex items-center gap-2 mt-2">
                    <h4 className='font-semibold'>Variables</h4>
                    <button
                        type='button'
                        onClick={() => setModalActivo("crear-variable")}
                        className='button-form-primary font-normal text-sm py-1 px-2'
                    >
                        Agregar
                    </button>
                </div>
            </div>
            <Table>
                <TableThead>
                    <TableTr>
                        <TableTh>Nombre de la variable</TableTh>
                        <TableTh>Alias</TableTh>
                        <TableTh>Descripción</TableTh>
                        <TableTh>Acciones</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    {variables.length === 0 && (
                        <TableTr>
                            <TableTd colSpan={4} >No hay variables registradas</TableTd>
                        </TableTr>
                    )}
                    {variables.length > 0 && variables.map( variable => 
                        <TableTr key={variable.id}>
                            <TableTd>{variable.nombre}</TableTd>
                            <TableTd>{variable.alias}</TableTd>
                            <TableTd>{variable.descripcion}</TableTd>
                            <TableTd>
                                <div className='flex gap-1'>
                                    <button 
                                        className='p-1 cursor-pointer'
                                        onClick={() => {
                                            setVariableSeleccionada(variable);
                                            setModalActivo("editar-variable")
                                        }}
                                    >
                                        <LuPencil />
                                    </button>
                                    <button 
                                        className='p-1 cursor-pointer'
                                        onClick={() => {
                                            setVariableSeleccionada(variable)
                                            setModalActivo("eliminar-variable")
                                        }}
                                    >
                                        <LuTrash2 />
                                    </button>
                                </div>
                            </TableTd>
                        </TableTr>
                    )}
                </TableTbody>
            </Table>

            {modalActivo === "crear-variable" && (
                <ModalAgregarVariable 
                    cerrarModal={() => setModalActivo(null)}
                    setVariables = {setVariables}
                    variables = {variables}
                />
            )}

            {modalActivo === "editar-variable" && (
                <ModalEditarVariable 
                    cerrarModal = {() => setModalActivo(null)}
                    setVariables = {setVariables}
                    variables = {variables}
                    variableSeleccionada = {variableSeleccionada}
                />
            )}

            {modalActivo === "eliminar-variable" && (
                <ModalEliminarVariable
                    cerrarModal = {() => setModalActivo(null)}
                    setVariables = {setVariables}
                    variables = {variables}
                    variableSeleccionada = {variableSeleccionada}
                />
            )}
        </>
    );
};

export default Variables;