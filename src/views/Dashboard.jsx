import { useMemo } from 'react'
import { emissionFactors } from '../data/emissionFactors'
import { calcularCO2, redondear } from '../data/calc'

function Dashboard({ activities }) {
  const resumen = useMemo(() => {
    const totals = {
      transporte: 0,
      alimentacion: 0,
      hogar: 0,
      consumo: 0,
      ocio: 0
    }

    for (const a of activities) {
      const factor = emissionFactors[a.categoria][a.tipo].factor
      totals[a.categoria] += calcularCO2(a.cantidad, factor)
    }

    const total = Object.values(totals).reduce((acc, v) => acc + v, 0)
    const max = Math.max(...Object.values(totals), 1)

    return { totals, total, max }
  }, [activities])

  return (
    <div className='panel'>
      <h2>Dashboard</h2>
      <p style={{ marginTop: '6px' }}>
        Total acumulado: <strong>{redondear(resumen.total)} kg CO₂e</strong>
      </p>

      {activities.length === 0 ? (
        <p style={{ marginTop: '10px' }}>
          Aún no hay datos. Ve a <strong>Cálculo</strong> y añade alguna
          actividad.
        </p>
      ) : (
        <div style={{ marginTop: '12px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Emisiones por categoría</h3>

          {[
            ['transporte', 'Transporte'],
            ['alimentacion', 'Alimentación'],
            ['hogar', 'Hogar'],
            ['consumo', 'Consumo'],
            ['ocio', 'Ocio']
          ].map(([key, label]) => {
            const value = resumen.totals[key]
            const width = (value / resumen.max) * 100

            return (
              <div className='barRow' key={key}>
                <div className='barLabel'>{label}</div>
                <div className='barTrack'>
                  <div className='barFill' style={{ width: `${width}%` }} />
                </div>
                <div className='barValue'>{redondear(value)} kg</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dashboard
