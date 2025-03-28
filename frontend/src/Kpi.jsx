import { useEffect, useState } from "react";
import axios from "axios";

function Kpi() {
  const [data, setData] = useState({
    totalClientes: 0,
    totalPagado: 0,
    totalDeuda: 0,
    prestamosAprobados: 0,
    totalPrestamos: 0,
    porcentajeDeudaPagada: 0
  });

  useEffect(() => {
    axios.get("http://localhost:3001/kpi").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
      <KpiCard label="Total de Clientes" value={data.totalClientes} />
      <KpiCard label="Total Pagado" value={`$${data.totalPagado}`} />
      <KpiCard label="Total Deuda" value={`$${data.totalDeuda}`} />
      <KpiCard label="% Préstamos Aprobados" value={`${data.prestamosAprobados}%`} />
      <KpiCard label="Total Préstamos Emitidos" value={data.totalPrestamos} />
      <KpiCard label="% Deuda Pagada" value={`${data.porcentajeDeudaPagada}%`} />
    </div>
  );
}

function KpiCard({ label, value }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "1rem",
      minWidth: "200px",
      background: "#1a1a1a",
      color: "white",
      textAlign: "center"
    }}>
      <h3 style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>{label}</h3>
      <strong style={{ fontSize: "1.5rem" }}>{value}</strong>
    </div>
  );
}

export default Kpi;