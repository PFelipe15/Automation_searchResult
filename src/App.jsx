import "./App.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
function App() {
  const [titles, setTitles] = useState([]);
  const [patch, setPatch] = useState([]);
  const [busca, setBusca] = useState("");
  const [gerarScreen, setGerarScreen] = useState("");
  const [gerarPD, setGerarPD] = useState("");
  async function getResult() {
    const result = await await axios({
      method: "post",
      url: `http://localhost:3000/${busca}`,
      headers: {},
      data: {
        gerarPDF: gerarPD,
        gerarPRINT: gerarScreen,
      },
    });

    setTitles(result.data.pageContent);
    setPatch(result.data.patchs);

    let hidenInformation = document.querySelector(".resultado-container");
    hidenInformation.style.display = "flex"
  }

  return (
    <div className="App">
      <div className="container-pesquisa">
        <h1>Sistema de Pesquisa</h1>
        <div className="inputs-container">
          <input
            type="text"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
            }}
            placeholder={"Digite algo a ser Pesquisado"}
          />

          <input type="button" value="Pesquisar" onClick={getResult}></input>
        </div>
        <div className="gerar-container">
          <label htmlFor="">Gerar PDF?</label>{" "}
          <input
            type="checkbox"
            value={"true"}
            onChange={(e) => {
              setGerarPD(e.target.value);
            }}
          />
          <label htmlFor="">Gerar PRINT DA PESQUISA? </label>{" "}
          <input
            type="checkbox"
            value={"true"}
            onChange={(e) => {
              setGerarScreen(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="resultado-container">
        <h3>Resultado:</h3>
        <li>{titles.title01}</li>
        <li>{titles.title02} </li>
        <label htmlFor="">Link Screnshot</label>
        <input type={"url"} value={patch.patchIMG}></input>
        <label htmlFor="">Link PDF</label>
        <input type={"url"} value={patch.patchPDF}></input>
        <p>Copie os links desejados e cole no seu gerenciador de pesquisa ou explorer folder</p>
      </div>
    </div>
  );
}

export default App;
