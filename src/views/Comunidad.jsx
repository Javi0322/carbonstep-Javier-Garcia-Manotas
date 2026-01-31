import { useState } from 'react'

const comunidadesDemo = [
  {
    id: 'com1',
    nombre: 'Barrio Centro',
    descripcion:
      'Gente del centro que se apunta a retos sencillos cada semana.',
    miembros: 128
  },
  {
    id: 'com2',
    nombre: 'DAW Sostenible',
    descripcion: 'Grupo del ciclo para comparar progreso y proponer acciones.',
    miembros: 34
  },
  {
    id: 'com3',
    nombre: 'Movilidad Verde',
    descripcion: 'Enfocado a reducir emisiones de transporte en el día a día.',
    miembros: 76
  }
]

function Comunidad() {
  const [misComunidades, setMisComunidades] = useState([])
  const [mensajes, setMensajes] = useState([
    { id: 1, user: 'Lucía', text: 'Esta semana intento ir 2 días en bus 🙌' },
    {
      id: 2,
      user: 'Mario',
      text: 'Yo he cambiado 1 comida por vegetal, se nota.'
    }
  ])
  const [nuevoMsg, setNuevoMsg] = useState('')

  const unirse = (id) => {
    if (misComunidades.includes(id)) return
    setMisComunidades([...misComunidades, id])
  }

  const salir = (id) => {
    setMisComunidades(misComunidades.filter((x) => x !== id))
  }

  const enviar = (e) => {
    e.preventDefault()
    const texto = nuevoMsg.trim()
    if (!texto) return

    setMensajes([{ id: Date.now(), user: 'Yo', text: texto }, ...mensajes])
    setNuevoMsg('')
  }

  // reto comunitario (simulado)
  const objetivoKg = 500
  const progresoKg = 210 // fijo para demo (podrías hacerlo variable si quieres)
  const progresoPct = Math.min((progresoKg / objetivoKg) * 100, 100)

  return (
    <div style={{ display: 'grid', gap: '14px' }}>
      <div className='panel'>
        <h2>Comunidades de acción</h2>
        <p style={{ marginTop: '6px', opacity: 0.8 }}>
          Aquí los usuarios se juntan para retos locales y se motivan entre
          ellos.
        </p>
      </div>

      <div className='panel'>
        <h3>Reto comunitario (demo)</h3>
        <p style={{ marginTop: '6px' }}>
          Objetivo semanal: <strong>{objetivoKg} kg CO₂e</strong> evitados
        </p>
        <p>
          Progreso actual: <strong>{progresoKg} kg</strong> (
          {Math.round(progresoPct)}%)
        </p>

        <div className='barTrack' style={{ marginTop: '10px' }}>
          <div className='barFill' style={{ width: `${progresoPct}%` }} />
        </div>

        <p style={{ marginTop: '10px', opacity: 0.8 }}>
          (En una app real, esto se calcularía sumando aportes de los miembros.)
        </p>
      </div>

      <div className='panel'>
        <h3>Comunidades disponibles</h3>

        <div className='grid' style={{ marginTop: '12px' }}>
          {comunidadesDemo.map((c) => {
            const dentro = misComunidades.includes(c.id)

            return (
              <div className='card' key={c.id}>
                <h4 style={{ margin: '0 0 6px 0' }}>{c.nombre}</h4>
                <p style={{ margin: '0 0 8px 0', opacity: 0.8 }}>
                  {c.descripcion}
                </p>
                <p style={{ margin: '0 0 10px 0' }}>
                  Miembros: <strong>{c.miembros}</strong>
                </p>

                {dentro ? (
                  <button
                    className='btn btnSecondary'
                    onClick={() => salir(c.id)}>
                    Salir
                  </button>
                ) : (
                  <button className='btn' onClick={() => unirse(c.id)}>
                    Unirme
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className='panel'>
        <h3>Muro (mensajes)</h3>

        <form
          onSubmit={enviar}
          style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <input
            className='navBtn'
            style={{ flex: 1 }}
            value={nuevoMsg}
            onChange={(e) => setNuevoMsg(e.target.value)}
            placeholder='Escribe un mensaje...'
          />
          <button className='btn' type='submit'>
            Enviar
          </button>
        </form>

        <ul style={{ marginTop: '12px', paddingLeft: '18px' }}>
          {mensajes.map((m) => (
            <li key={m.id} style={{ marginBottom: '8px' }}>
              <strong>{m.user}:</strong> {m.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Comunidad
