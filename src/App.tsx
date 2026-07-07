import './styles/style.css'
import Body from './components/Body'
import Footer from './components/Footer'
import Header from './components/Header'
import { useState } from 'react'

function App() {
  const [mode, setMode] = useState('light')

  return (
    <div className={"app" + (mode === 'dark' ? ' darkmode' : '')}>
      <Header mode={mode} setMode={setMode} />
      <Body />
      <Footer />
    </div>
  )
}

export default App
