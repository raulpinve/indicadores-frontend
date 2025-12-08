import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter, LineChart } from 'recharts';
import Card from '../../../shared/components/Card';
import CardTitulo from '../../../shared/components/CardTitulo';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { handleErrorsBasic } from '../../../utils/handleErrors';
import { obtenerRegistros } from '../services/registrosServices';
import { formatPeriodo } from '../utils/utils';

const Grafica = () => {
  const { versionId } = useParams();
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [data, setData] = useState([]);

  // Obtener registros
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const respuesta = await obtenerRegistros(versionId);
        setRegistros(respuesta.data);
      } catch (error) {
        handleErrorsBasic(error, setMessageError);
      } finally {
        setLoading(false);
      }
    };

    if (versionId) fetchData();
  }, [versionId]);

  // Formatear data para Recharts
  useEffect(() => {
    if (!registros || registros.length === 0) return;

    const nuevaData = registros.map(reg => ({
      name: formatPeriodo(reg),        // eje X
      value: Number(reg.resultado),    // valor numérico
    }));

    setData(nuevaData);
  }, [registros]);

  return (
    <Card>
      <CardTitulo>Gráfica</CardTitulo>

      <LineChart
        width={`100%`}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </Card>
  );
};

export default Grafica;