import './styles.css'
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import api from './services/api'
import React from 'react'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  async function handleSubmit() {
    if (input === '') {
      alert('preencha algum cep')
    }

    try {
      const res = await api.get(`${input}/json`)
      setCep(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <h1>Buscador de Cep</h1>

      <div className="search">
        <input
          type="text"
          placeholder="digite um cep"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={handleSubmit}>
          <FiSearch />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <div className="infos">
          <span>Cep:{cep.cep}</span>
          <span>Cidade:{cep.localidade}</span>
          <span>Uf:{cep.uf}</span>
          <span>bairro:{cep.bairro}</span>
        </div>
      )}
    </div>
  )
}

export default App
