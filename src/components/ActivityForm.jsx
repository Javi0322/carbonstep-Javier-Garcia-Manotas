import { useMemo, useState } from 'react'
import { emissionFactors } from '../data/emissionFactors'

function hoyISO() {
  return new Date().toISOString().slice(0, 10)
}

function ActivityForm({ onAdd }) {
  const [categoria, setCategoria] = useState('transporte')
  const [tipo, setTipo] = useState('coche_gasolina')
  const [cantidad, setCantidad] = useState('')
  const [fecha, setFecha] = useState(hoyISO())

  const tiposDisponibles = useMemo(() => {
    return emissionFactors[categoria] || {}
  }, [categoria])

  const tipoKeys = Object.keys(tiposDisponibles)

  const cambiarCategoria = (value) => {
    setCategoria(value)
    const firstKey = Object.keys(emissionFactors[value] || {})[0]
    setTipo(firstKey || '')
    setCantidad('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!categoria || !tipo) return

    onAdd({
      id: Date.now(),
      categoria,
      tipo,
      cantidad: Number(cantidad),
      fecha
    })

    setCantidad('')
  }

  const infoTipo = tiposDisponibles[tipo]
  if (!infoTipo) {
    return (
      <div className='panel'>
        <h2>Añadir actividad</h2>
        <p>No se pudieron cargar los tipos de actividad.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='panel'>
      <h2>Añadir actividad</h2>

      <div style={{ display: 'grid', gap: '10px', marginTop: '10px' }}>
        <label>
          Fecha:
          <input
            className='inputField'
            type='date'
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </label>

        <label>
          Categoría:
          <select
            className='inputField'
            value={categoria}
            onChange={(e) => cambiarCategoria(e.target.value)}>
            <option value='transporte'>Transporte</option>
            <option value='alimentacion'>Alimentación</option>
            <option value='hogar'>Hogar</option>
            <option value='consumo'>Consumo</option>
            <option value='ocio'>Ocio</option>
          </select>
        </label>

        <label>
          Tipo:
          <select
            className='inputField'
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}>
            {tipoKeys.map((k) => (
              <option key={k} value={k}>
                {tiposDisponibles[k].label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Cantidad ({infoTipo.unit}):
          <input
            className='inputField'
            type='number'
            step='0.01'
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder={`Introduce ${infoTipo.unit}...`}
            required
          />
        </label>

        <button className='btn' type='submit'>
          Calcular y añadir
        </button>
      </div>
    </form>
  )
}

export default ActivityForm
