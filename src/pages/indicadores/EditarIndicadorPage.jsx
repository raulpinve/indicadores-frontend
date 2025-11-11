import { useParams } from 'react-router-dom';
import Card from '../../shared/components/Card';
import FormIndicador from './components/Indicador/FormIndicador';
import { useEffect, useState } from 'react';
import { obtenerVersionIndicador } from './services/indicadoresServices';

const EditarIndicadorPage = () => {
    const [versionSeleccionada, setVersionSeleccionada] = useState();

    // Obtener la versión seleccionada
    const {versionId} = useParams();

    // Consultar información del indicador
    useEffect(() => {
        const fecthInformacionVersion = async() => {
            try {
                const response = await obtenerVersionIndicador(versionId);
                setVersionSeleccionada(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fecthInformacionVersion();
    }, [])
    
    return (
        <Card>
            <FormIndicador
                tipoFormulario = "editar"
                versionSeleccionada= {versionSeleccionada}
            />
        </Card>
    );
};

export default EditarIndicadorPage;