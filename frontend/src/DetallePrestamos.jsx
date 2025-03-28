import { useEffect, useState } from "react";
import axios from "axios";

function DetallePrestamos() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/DetallePrestamos").then((res) => {
      setDatos(res.data);
    });
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Detalle de Préstamos por Cliente</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Apellido</th>
            <th>Fecha</th>
            <th>Tipo de Préstamo</th>
            <th>Estado</th>
            <th>Pago</th>
            <th>Deuda</th>
            <th>Total Préstamo</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((row, index) => (
            <tr key={index}>
              <td>{row.Cliente}</td>
              <td>{row.Apellido}</td>
              <td>{row.Fecha?.split("T")[0]}</td>
              <td>{row.Tipo_Prestamo}</td>
              <td>{row.Estado_Prestamo}</td>
              <td>${row.Pago}</td>
              <td>${row.Deuda}</td>
              <td>${row.Total_Prestamo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetallePrestamos;
