function Header({ view, setView }) {
  return (
    <header className='header'>
      <div>
        <h1 className='title'>CarbonStep</h1>
        <p className='subtitle'>Prototipo: huella de carbono personal</p>
      </div>

      <div className='nav'>
        <button
          className={'navBtn ' + (view === 'dashboard' ? 'navBtnActive' : '')}
          onClick={() => setView('dashboard')}>
          Dashboard
        </button>

        <button
          className={'navBtn ' + (view === 'calculo' ? 'navBtnActive' : '')}
          onClick={() => setView('calculo')}>
          Cálculo
        </button>

        <button
          className={'navBtn ' + (view === 'retos' ? 'navBtnActive' : '')}
          onClick={() => setView('retos')}>
          Retos
        </button>

        <button
          className={'navBtn ' + (view === 'comunidad' ? 'navBtnActive' : '')}
          onClick={() => setView('comunidad')}>
          Comunidad
        </button>

        <button
          className={'navBtn ' + (view === 'impacto' ? 'navBtnActive' : '')}
          onClick={() => setView('impacto')}>
          Impacto
        </button>
      </div>
    </header>
  )
}

export default Header
