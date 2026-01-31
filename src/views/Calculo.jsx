import { useMemo } from 'react'
import ActivityForm from '../components/ActivityForm'
import { emissionFactors } from '../data/emissionFactors'
import { calcularCO2, redondear } from '../data/calc'

function Calculo({ activities, setActivities }) {
  const onAdd = (act) => {
    setActivities([act, ...activities])
  }

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
      const co2 = calcularCO2(a.cantidad, factor)
      totals[a.categoria] += co2
    }

    const total = Object.values(totals).reduce((acc, v) => acc + v, 0)

    return { totals, total }
  }, [activities])

  return (
    <div style={{ display: 'grid', gap: '14px' }}>
      <ActivityForm onAdd={onAdd} />

      <div className='panel'>
        <h2>Resultado (kg CO₂e)</h2>
        <p style={{ marginTop: '6px' }}>
          Total: <strong>{redondear(resumen.total)} kg CO₂e</strong>
        </p>

        <div className='grid' style={{ marginTop: '12px' }}>
          <div className='card'>
            <h3>Transporte</h3>
            <p>{redondear(resumen.totals.transporte)} kg</p>
          </div>
          <div className='card'>
            <h3>Alimentación</h3>
            <p>{redondear(resumen.totals.alimentacion)} kg</p>
          </div>
          <div className='card'>
            <h3>Hogar</h3>
            <p>{redondear(resumen.totals.hogar)} kg</p>
          </div>
          <div className='card'>
            <h3>Consumo</h3>
            <p>{redondear(resumen.totals.consumo)} kg</p>
          </div>
          <div className='card'>
            <h3>Ocio</h3>
            <p>{redondear(resumen.totals.ocio)} kg</p>
          </div>
        </div>
      </div>

      <div className='panel'>
        <h2>Actividades añadidas</h2>
        {activities.length === 0 ? (
          <p>Aún no has añadido actividades.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '18px' }}>
            {activities.map((a) => {
              const info = emissionFactors[a.categoria][a.tipo]
              const co2 = calcularCO2(a.cantidad, info.factor)
              return (
                <li key={a.id} style={{ marginBottom: '6px' }}>
                  <strong>{info.label}</strong> — {a.cantidad} {info.unit} (
                  {a.fecha}) → {redondear(co2)} kg CO₂e
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Calculo
