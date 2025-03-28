const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Ruta para KPIs
app.get("/kpi", (req, res) => {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM dim_cliente) AS totalClientes,
      (SELECT SUM(Pago) FROM fact_historial) AS totalPagado,
      (SELECT SUM(Deuda) FROM fact_historial) AS totalDeuda,
      ROUND(
        (SELECT COUNT(*) FROM fact_historial h 
          JOIN dim_estatus e ON h.ID_Estatus = e.ID_Estatus 
          WHERE e.Estado = 'Aprobado') 
        / 
        (SELECT COUNT(*) FROM fact_historial) * 100, 2
      ) AS prestamosAprobados,
      (SELECT COUNT(*) FROM fact_historial) AS totalPrestamos,
      ROUND(
        (SELECT SUM(Pago) / (SUM(Pago) + SUM(Deuda)) FROM fact_historial) * 100, 2
      ) AS porcentajeDeudaPagada
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

app.get("/PrestamosPorTipo", (req, res) => {
  const query = `
    SELECT 
      e.Tipo_Prestamo,
      COUNT(*) AS cantidad
    FROM fact_historial h
    JOIN dim_estatus e ON h.ID_Estatus = e.ID_Estatus
    GROUP BY e.Tipo_Prestamo;
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/PagosPorMes", (req, res) => {
  const query = `
    SELECT 
    DATE_FORMAT(f.Fecha, '%b-%Y') AS Mes,
    SUM(h.Pago) AS totalPago,
    SUM(h.Deuda) AS totalDeuda
  FROM fact_historial h
  JOIN dim_fecha f ON h.ID_Fecha = f.ID_Fecha
  GROUP BY DATE_FORMAT(f.Fecha, '%b-%Y')
  ORDER BY MIN(f.Fecha);

  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/detallePrestamos", (req, res) => {
  const query = `
    SELECT 
      c.Nombre AS Cliente,
      c.Apellido AS Apellido,
      f.Fecha,
      e.Tipo_Prestamo,
      e.Estado AS Estado_Prestamo,
      h.Pago,
      h.Deuda,
      (h.Deuda - h.Pago) AS Total_Prestamo
    FROM fact_historial h
    JOIN dim_cliente c ON h.ID_Cliente = c.ID_Cliente
    JOIN dim_fecha f ON h.ID_Fecha = f.ID_Fecha
    JOIN dim_estatus e ON h.ID_Estatus = e.ID_Estatus
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});



app.listen(3001, () => {
  console.log("Servidor backend corriendo en http://localhost:3001");
});