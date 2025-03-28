import './Estilo.css';
import Kpi from './Kpi';
import PrestamosPorTipo from './PrestamosPorTipo';
import PagosPorMes from './PagosPorMes';
import DetallePrestamos from './DetallePrestamos';

function App() {
  return (
    <div>
      <h1>Dashboard Financiero</h1>

      {/* Tarjetas KPI */}
      <Kpi />

      {/* Gráfica de préstamos por tipo */}
      <div className="chart-box">
        <PrestamosPorTipo />
      </div>

      {/* Gráfica de pagos por mes */}
      <div className="chart-box">
        <PagosPorMes />
      </div>

      {/* Tabla final con detalles si la tienes */}
      <div className="chart-box">
        <DetallePrestamos />
      </div>
    </div>
  );
}

export default App;
