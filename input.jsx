import React, { useState, useEffect } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

const App = () => {
  const [rules, setRules] = useState(true)
    const clearRules = () => {
    setRules(false)}
  
  const generateRandom = () => {
  return Math.floor(Math.random() * 80)}
  
  const [topmargin, setTopmargin] = useState(0)
  const [rightmargin, setRightmargin] = useState(0)
  const [bottommargin, setBottommargin] = useState(0)
  const [leftmargin, setLeftmargin] = useState(48)
  
  const sufflePosition = () => {
    setTopmargin(generateRandom());
    setRightmargin(generateRandom());
    setBottommargin(generateRandom());
    setLeftmargin(generateRandom());
  };
  
  const [score, setScore] = useState(0)
  const changeScore = () => {
    setScore(score + 1)
  }
  
  const playSound = () => {
    const audioElement = document.querySelector("#sound")
    audioElement.play()
  }
  
  const [timeleft, setTimeLeft] = useState(60)
  const [gameStarted, setGameStarted] = useState(false); 
  const [gameOver, setGameOver] = useState(false); 
  const [showPopup, setShowPopup] = useState(false); 

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft > 0) {
            return prevTimeLeft - 1;
          } else {
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);
      
    const endGame = () => {
    if(timeleft === 0){
      setGameOver(true)
      setShowPopup(true)
    }
  }
      
    endGame();
      
      return () => clearInterval(timer);
    }
  }, [gameStarted, timeleft]); 
 
   const restartGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setShowPopup(false);
  };
  
  const classificacao =() => {
    if(score <= 10){
      return(<p>Nível: Mouse de Bolinha</p>)
    } else if(score > 10 & score <= 25){
      return(<p>Nível: Errei fui muleque</p>)
    } else if(score > 25 & score <= 50){
      return(<p>Nível: Meu mousepad tá ruim</p>)
    } else if(score > 50 & score <= 75){
      return(<p>Nível: Ainda não tenho artrite</p>)
    } else if(score > 75) {
      return(<p>Nível: Tentando quebrar o mouse</p>)
    }
  }
  
  const renderPopup = () => {
    return (
      <div className="popup">
        <div className="popup-content">
          <p>Seu score: {score}</p>
          {classificacao()}
          <button onClick={restartGame}>Reiniciar o jogo</button>
        </div>
      </div>
    );
  };
  
  const [bground, setBground] = useState("black")  
  const changeBackground = () => {
    if(score >= 25){
      setBground("white")}
  }
  
  const [bttext, setBttext] = useState("❌")
  const changeButtontext = () => {
    if (score >= 50){
      setBttext("◽")}
  }
 
  const startGame = () => {
  if (gameOver) {
    return;
  }
  clearRules();
  sufflePosition();
  changeScore();
  playSound();
  changeBackground();
  changeButtontext();
  setGameStarted(true); 
};
  
  return(
  <div>
      <h1>Click Game</h1>
      <h2>Pontuação: {score} - Tempo Restante: {timeleft}</h2>
       {rules && (
        <div id="rules">
          <p>Regras:<br/>
            Clicar no botão abaixo inicia o jogo;<br/>
            Cada clique faz o botão mudar de posição, acrescentando +1 à pontuação total do jogador;<br/>
            Uma vez iniciado o jogo, o jogador tem 60 segundos para marcar a maior pontuação possível;<br/>
            Esgotado o tempo, exibe-se a pontuação e a classificação do jogador.<br/>  
          </p>
        </div>
      )}
      <button id="game-button" 
        style={{
        margin: `${topmargin}% ${rightmargin}% ${bottommargin}% ${leftmargin}%`,
        backgroundColor: `${bground}`}} 
        onClick={startGame}>
        {bttext}<audio src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" className="clip" id="sound"></audio>
      </button>
       {gameOver && showPopup && renderPopup()}
  </div>
)}

ReactDOM.render(<App/>, document.querySelector("#box"))