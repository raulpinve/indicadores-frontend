import Title from '../../shared/components/Title';
import Empresas from './components/empresas/Empresas';

const ConfiguracionPage = () => {
    return (
        <>
            <Title>Configuración</Title>  
            <div className="grid grid-cols-2">
                <Empresas />
            </div>
        </>
    );
};

export default ConfiguracionPage;