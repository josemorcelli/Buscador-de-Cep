import React, { useState } from 'react';
import {FiSearch} from "react-icons/fi"
import "./styled.css";
import api from './components/api'


function App() {

  const [input,setInput] = useState("")
  const [cep,setCep] = useState({})

  async function handleSearch(){
    
    if( input === ""){
    alert("Preencha algum CEP!")
    return;
  }

  try{
    const response = await api.get(`${input}/json`)
    setCep(response.data)
    setInput("")
    //console.log(response.data);

  }catch{
    alert("Ops não encontramos esse CEP!")
    setInput("")

  }
    //alert("Clicou " + input)
  }

  return (
      
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
      <input 
      type="text"
      placeholder="Digite seu cep"
      value={input}
      onChange={(event) => setInput(event.target.value) }>
      </input>

      <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="white"/>
      </button>
      </div>


    {Object.keys(cep).length > 0 && (
      <main className="main">
      <h2>CEP: {cep.cep}</h2>

      <span>Rua: {cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>Bairro: {cep.bairro}</span>
      <span>Cidade/Estado: {cep.localidade} - {cep.uf}</span>
      <span>DDD: {cep.ddd}</span>
    </main>
    )}

    <footer className="footer">
      <p> Copyright © - José Morcelli 2022</p>
    </footer>
    
    </div>

  );
}

export default App;