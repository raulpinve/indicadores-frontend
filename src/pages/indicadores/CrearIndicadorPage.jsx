import { useEffect, useState } from 'react';
import Card from '../../shared/components/Card';
import FormIndicador from './components/Indicador/FormIndicador';
import { obtenerTodosProcesos } from '../configuracion/services/procesoServices';
import { useSelector } from 'react-redux';

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

    return (
        <Card>
            <FormIndicador 
                tipoFormulario= "crear"
                procesos = {procesos}
            />
        </Card>
    );
};

export default CrearIndicadorPage;