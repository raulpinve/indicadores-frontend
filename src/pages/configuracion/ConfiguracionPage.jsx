import Title from '../../shared/components/Title';
import Empresas from './components/empresas/Empresas';
import Usuarios from './components/usuarios/Usuarios';

const ConfiguracionPage = () => {
    return (
        <>
            <Title>Configuración</Title>  
            <div className="grid mt-4">
                <Usuarios/> 
                <Empresas/>
            </div>
        </>
    );
};

export default ConfiguracionPage;