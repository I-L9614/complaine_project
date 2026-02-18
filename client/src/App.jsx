import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateComp from './pages/createComp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <CreateComp />
  )
}

export default App
