import { useMemo } from 'react'
import { emissionFactors } from '../data/emissionFactors'
import { calcularCO2, redondear } from '../data/calc'

function Impacto({ activities }) {
  const datos = useMemo(() => {
    let totalKg = 0

    for (const a of activities) {
      const factor = emissionFactors[a.categoria][a.tipo].factor
      totalKg += calcularCO2(a.cantidad, factor)
    }

    const totalTon = totalKg / 1000

    // Equivalencias (aproximadas, para visualizar)
    // - km coche gasolina: usamos 0.192 kg/km (del factor)
    const kmCoche = totalKg / 0.192

    // - horas streaming: 0.055 kg/h
    const horasStreaming = totalKg / 0.055

    // - árboles: aproximación simple: 1 árbol absorbe ~21 kg CO2/año
    const arboles = totalKg / 21

    // Impacto colectivo simulado (para la demo)
    const usuariosActivos = 10240

    // Supongamos que la media de reducción por usuario al año es 1 tonelada (objetivo del enunciado)
    // Lo ponemos como una estimación del proyecto:
    const impactoAnualTon = usuariosActivos * 1 // 1 tonelada por usuario/año

    return {
      totalKg,
      totalTon,
      kmCoche,
      horasStreaming,
      arboles,
      usuariosActivos,
      impactoAnualTon
    }
  }, [activities])

  return (
    <div style={{ display: 'grid', gap: '14px' }}>
      <div className='panel'>
        <h2>Impacto colectivo</h2>

        {activities.length === 0 ? (
          <p style={{ marginTop: '8px' }}>
            Aún no hay datos personales. Ve a <strong>Cálculo</strong> y añade
            alguna actividad.
          </p>
        ) : (
          <>
            <p style={{ marginTop: '8px' }}>
              Tu huella registrada:{' '}
              <strong>{redondear(datos.totalKg)} kg CO₂e</strong> (
              {redondear(datos.totalTon)} toneladas)
            </p>

            <div className='grid' style={{ marginTop: '12px' }}>
              <div className='card'>
                <h3>Equivalencia</h3>
                <p>
                  ≈ <strong>{Math.round(datos.kmCoche)}</strong> km en coche
                  (gasolina)
                </p>
              </div>

              <div className='card'>
                <h3>Equivalencia</h3>
                <p>
                  ≈ <strong>{Math.round(datos.horasStreaming)}</strong> horas de
                  streaming
                </p>
              </div>

              <div className='card'>
                <h3>Compensación</h3>
                <p>
                  ≈ <strong>{Math.ceil(datos.arboles)}</strong> árboles / año
                  para compensar
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className='panel'>
        <h2>Proyecto (simulado)</h2>
        <p style={{ marginTop: '8px' }}>
          Usuarios activos:{' '}
          <strong>{datos.usuariosActivos.toLocaleString()}</strong>
        </p>
        <p>
          Objetivo del proyecto: <strong>1 tonelada</strong> de reducción media
          por usuario/año.
        </p>
        <p>
          Estimación impacto anual total:{' '}
          <strong>
            {datos.impactoAnualTon.toLocaleString()} toneladas CO₂e
          </strong>
        </p>
        <p style={{ opacity: 0.8, marginTop: '10px' }}>
          (Estos valores del proyecto son una estimación para la demo del
          prototipo.)
        </p>
      </div>
    </div>
  )
}

export default Impacto
