import { useParams } from 'react-router-dom';
import Card from '../../shared/components/Card';
import FormIndicador from './components/Indicador/FormIndicador';
import { useEffect, useState } from 'react';
import { editarIndicador, obtenerVersionIndicador } from './services/indicadoresServices';
import { handleErrors } from '../../utils/handleErrors';

const EditarIndicadorPage = () => {
    const [versionSeleccionada, setVersionSeleccionada] = useState();
    const [loading, setLoading] = useState(false);

    // Obtener la versión seleccionada
    const {versionId} = useParams();

    // Consultar información del indicador
    useEffect(() => {
        const fecthInformacionVersion = async() => {
            setLoading(true);
            try {
                const response = await obtenerVersionIndicador(versionId);
                setVersionSeleccionada(response.data);
            } catch (error) {
                // console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fecthInformacionVersion();
    }, [])

    const onSubmitForm = async (setLoading, data, formulaLaTex, variables, setError, setMessageError, versionId) => {
        setLoading(true);

        try {
            const result = await editarIndicador(versionId, {
                ...data, 
                variables, 
                formulaLaTex: formulaLaTex
            });
            return result.data;
        } catch (err) {
            handleErrors(err, setError, setMessageError);
            throw err; 
        } finally{
            setLoading(false);
        }
    }

    return (
        <Card>
            <FormIndicador
                tipoFormulario = "editar"
                versionSeleccionada= {versionSeleccionada}
                loadingIndicador = {loading}
                onSubmitForm = {onSubmitForm}
            />
        </Card>
    );
};

export default EditarIndicadorPage;