import { useEffect, useState } from 'react';
import Card from '../../shared/components/Card';
import FormIndicador from './components/Indicador/FormIndicador';
import { obtenerTodosProcesos } from '../configuracion/services/procesoServices';
import { useSelector } from 'react-redux';
import { crearIndicador } from './services/indicadoresServices';
import { handleErrors } from '../../utils/handleErrors';

const CrearIndicadorPage = () => {
    const [procesos, setProcesos] = useState([]);
    const empresaId = useSelector(state => state?.empresa?.empresa?.id);

    // obtener todos los procesos
    useEffect(() => {
        const fetchProcesos = async () => {
            try {
                const result = await obtenerTodosProcesos(1, "", empresaId);
                setProcesos(result.data);
            } catch (error) {
                console.error(error);
            }
        }
        if(empresaId){
            fetchProcesos();
        }
    }, [empresaId])

    const onSubmitForm = async (setLoading, data, formulaLaTex, variables, setError, setMessageError) => {
        setLoading(true);

        try {
            const result = await crearIndicador({
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
                tipoFormulario= "crear"
                procesos = {procesos}
                onSubmitForm = {onSubmitForm}
            />
        </Card>
    );
};

export default CrearIndicadorPage;