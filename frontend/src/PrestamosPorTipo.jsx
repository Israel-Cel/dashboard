import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

function PrestamosPorTipo() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/PrestamosPorTipo").then((res) => {
      setDatos(res.data);
    });
  }, []);

  const colores = {
    Personal: "#3f51b5",     // Azul
    Automotriz: "#4caf50",   // Verde
    Hipotecario: "#ff9800",  // Naranja
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Préstamos por Tipo</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datos}>
          <XAxis dataKey="Tipo_Prestamo" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" name="Cantidad de Préstamos">
            {datos.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colores[entry.Tipo_Prestamo] || "#8884d8"} />
            ))}
          </Bar>
        </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
          <div><span style={{ color: "#3f51b5" }}>■</span> Personal</div>
          <div><span style={{ color: "#4caf50" }}>■</span> Automotriz</div>
          <div><span style={{ color: "#ff9800" }}>■</span> Hipotecario</div>
        </div>
        </div>

  );
}

export default PrestamosPorTipo;