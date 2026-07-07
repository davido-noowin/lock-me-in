import './styles/style.css'
import Body from './components/Body'
import Footer from './components/Footer'
import Header from './components/Header'
import { useEffect, useState } from 'react'

function App() {
  const [mode, setMode] = useState('light')

  useEffect(() => {
    const fontUrl = chrome.runtime.getURL('fonts/EncodeSansExpanded-Regular.ttf');
    const fontStyle = document.createElement('style');
    fontStyle.textContent = `
      @font-face {
        font-family: 'Encode Sans Expanded';
        src: url('${fontUrl}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    document.head.appendChild(fontStyle);
  }, [])
  

  return (
    <div style={{ fontFamily: 'Encode Sans Expanded' }} className={"app" + (mode === 'dark' ? ' darkmode' : '')}>
      <Header mode={mode} setMode={setMode} />
      <Body />
      <Footer />
    </div>
  )
}

export default App
