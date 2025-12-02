import React, { useEffect, useState } from 'react';
import CardTitulo from '../../../shared/components/CardTitulo';
import Card from '../../../shared/components/Card';
import Button from '../../../shared/components/Button';
import Table from '../../../shared/components/Table';
import TableThead from '../../../shared/components/TableThead';
import TableTr from '../../../shared/components/TableTr';
import TableTh from '../../../shared/components/TableTh';
import TableTbody from '../../../shared/components/TableTbody';
import TableTd from '../../../shared/components/TableTd';
import { LuFolder, LuPencil, LuTrash2 } from 'react-icons/lu';
import ModalCrearRegistro from './registro/ModalCrearRegistro.jsx';
import { obtenerRegistros } from '../services/registrosServices.js';
import { etiquetasResultado, formatPeriodo, getResultadoColor } from '../utils/utils.js';
import ModalEditarRegistro from './registro/ModalEditarRegistro.jsx';

const Registros = (props) => {
    const {versionSeleccionada} = props;
    const [modalActivo, setModalActivo] = useState("");
    const [registros, setRegistros] = useState([]);
    const [registroSeleccionado, setRegistroSeleccionado] = useState();

    // Obtener los registros
    useEffect(() => {
        const fetchRegistros = async () => {
            try {
                const resultado = await obtenerRegistros(versionSeleccionada?.id);
                setRegistros(resultado.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchRegistros();
    }, [])

    return (<>
        <Card>
            <CardTitulo>
                Registros 
                <Button
                    className='text-sm ml-2'
                    colorButton={`primary`}
                    onClick = {() => {
                        setModalActivo("crear");
                    }}
                >Crear</Button>
            </CardTitulo>

            {/* Tabla */}
            <Table className='table-fixed'>
                <TableThead>
                    <TableTr>
                        <TableTh>Períodos</TableTh>
                        <TableTh className='text-center'>Resultado</TableTh>
                        <TableTh className='text-center'>Evidencias</TableTh>
                        <TableTh className='text-center'>Análisis</TableTh>
                        <TableTh className='text-center'>Acciones</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    {registros.map(registro => 
                        <TableTr key={registro.id}>
                            <TableTd>{formatPeriodo(registro)}</TableTd>
                            <TableTd>
                                <div className="flex justify-center gap-2 items-center">
                                    <span className='font-semibold'>{registro.resultado}</span>
                                    <div className={`${getResultadoColor(registro.estadoResultado)} dark:text-white py-1.5 px-2 text-xs rounded-md font-semibold`}>
                                        {etiquetasResultado[registro.estadoResultado]}
                                    </div>
                                </div>
                            </TableTd>
                            <TableTd>
                                <div className="flex justify-center">
                                    <Button colorButton={`secondary`}>
                                        <LuFolder />
                                    </Button>
                                </div>
                            </TableTd>
                            <TableTd >
                                <p>{registro.analisis}</p>
                            </TableTd>
                            <TableTd>
                                <div className="flex justify-center gap-1">
                                    <Button
                                        colorButton={`secondary`}
                                        onClick= {() => {
                                            setModalActivo("editar");
                                            setRegistroSeleccionado(registro)
                                        }}
                                    >
                                        <LuPencil />
                                    </Button>
                                    <Button 
                                        colorButton={`danger`}
                                    >
                                        <LuTrash2 />
                                    </Button>
                                </div>
                            </TableTd>
                        </TableTr>
                    )}
                </TableTbody>
            </Table>
        </Card>
        {modalActivo === "crear" && (
            <ModalCrearRegistro 
                cerrarModal = {()=> setModalActivo("")}
                versionSeleccionada = {versionSeleccionada}
                setRegistros = {setRegistros}
            />
        )}

        {modalActivo === "editar" && (
            <ModalEditarRegistro 
                cerrarModal = {()=> setModalActivo("")}
                versionSeleccionada = {versionSeleccionada}
                registroSeleccionado = {registroSeleccionado}
                setRegistros = {setRegistros}
            />
        )}
    </>);
};

export default Registros;