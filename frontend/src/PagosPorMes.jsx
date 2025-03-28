import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function PagosPorMes() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/PagosPorMes").then((res) => {
      // ✅ Convertimos los valores a número (float)
      const transformados = res.data.map(item => ({
        Mes: item.Mes,
        totalPago: parseFloat(item.totalPago),
        totalDeuda: parseFloat(item.totalDeuda),
      }));
      setDatos(transformados);
    });
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Pagos y Deudas por Mes</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={datos}>
          <XAxis dataKey="Mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalPago" stroke="#4caf50" name="Pago" />
          <Line type="monotone" dataKey="totalDeuda" stroke="#f44336" name="Deuda" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PagosPorMes;
