function nivelPorPuntos(puntos) {
  if (puntos < 50) return 1
  if (puntos < 120) return 2
  if (puntos < 220) return 3
  if (puntos < 350) return 4
  return 5
}

const retos = [
  {
    id: 'reto1',
    titulo: 'Un día sin coche',
    descripcion:
      'Intenta no usar coche hoy y elige transporte público, bici o caminar.',
    puntos: 25
  },
  {
    id: 'reto2',
    titulo: 'Comida más sostenible',
    descripcion:
      'Cambia una comida con carne roja por una opción vegetal o pollo.',
    puntos: 20
  },
  {
    id: 'reto3',
    titulo: 'Ahorro en casa',
    descripcion:
      'Reduce el uso de electricidad 1 hora (luces/pantallas) y apaga stand-by.',
    puntos: 15
  }
]

function Retos({ puntos, setPuntos, retosHechos, setRetosHechos }) {
  const nivel = nivelPorPuntos(puntos)

  const marcarReto = (id, puntosReto) => {
    if (retosHechos.includes(id)) return
    setRetosHechos([...retosHechos, id])
    setPuntos(puntos + puntosReto)
  }

  // Insignias (muy simple)
  const badge1 = puntos >= 30 // “Primer paso”
  const badge2 = puntos >= 100 // “Constante”
  const badge3 = retosHechos.length >= 3 // “Semana completa”

  return (
    <div style={{ display: 'grid', gap: '14px' }}>
      <div className='panel'>
        <h2>Retos y recompensas</h2>
        <p style={{ marginTop: '6px' }}>
          Puntos: <strong>{puntos}</strong> · Nivel: <strong>{nivel}</strong>
        </p>

        <h3 style={{ marginTop: '14px' }}>Insignias</h3>
        <div className='badgeRow'>
          <span className={'badgeChip ' + (!badge1 ? 'badgeLocked' : '')}>
            {badge1 ? '✅ Primer paso' : '🔒 Primer paso (30 pts)'}
          </span>
          <span className={'badgeChip ' + (!badge2 ? 'badgeLocked' : '')}>
            {badge2 ? '✅ Constante' : '🔒 Constante (100 pts)'}
          </span>
          <span className={'badgeChip ' + (!badge3 ? 'badgeLocked' : '')}>
            {badge3 ? '✅ Semana completa' : '🔒 Semana completa (3 retos)'}
          </span>
        </div>
      </div>

      <div className='panel'>
        <h3>Retos semanales</h3>
        <p style={{ marginTop: '6px', opacity: 0.8 }}>
          (Prototipo: marcas el reto como hecho y se suman puntos)
        </p>

        <div className='grid' style={{ marginTop: '12px' }}>
          {retos.map((r) => {
            const hecho = retosHechos.includes(r.id)

            return (
              <div className='card' key={r.id}>
                <h4 style={{ margin: '0 0 6px 0' }}>{r.titulo}</h4>
                <p style={{ margin: '0 0 10px 0', opacity: 0.8 }}>
                  {r.descripcion}
                </p>
                <p style={{ margin: '0 0 10px 0' }}>
                  Recompensa: <strong>{r.puntos} pts</strong>
                </p>

                <button
                  className={'btn ' + (hecho ? 'btnSecondary' : '')}
                  onClick={() => marcarReto(r.id, r.puntos)}
                  disabled={hecho}>
                  {hecho ? 'Completado' : 'Marcar como hecho'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Retos
