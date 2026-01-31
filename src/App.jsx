import { useState } from 'react'
import './App.css'

import Header from './components/Header'

import Dashboard from './views/Dashboard'
import Calculo from './views/Calculo'
import Retos from './views/Retos'
import Comunidad from './views/Comunidad'
import Impacto from './views/Impacto'

function App() {
  const [view, setView] = useState('dashboard')

  // Estado global
  const [activities, setActivities] = useState([])

  // Gamificación (simple)
  const [puntos, setPuntos] = useState(0)
  const [retosHechos, setRetosHechos] = useState([]) // ids

  let content = <Dashboard activities={activities} />

  if (view === 'calculo')
    content = <Calculo activities={activities} setActivities={setActivities} />
  if (view === 'retos')
    content = (
      <Retos
        puntos={puntos}
        setPuntos={setPuntos}
        retosHechos={retosHechos}
        setRetosHechos={setRetosHechos}
      />
    )
  if (view === 'comunidad') content = <Comunidad />
  if (view === 'impacto') content = <Impacto activities={activities} />

  return (
    <div className='page'>
      <div className='container'>
        <Header view={view} setView={setView} />
        {content}
      </div>
    </div>
  )
}

export default App
