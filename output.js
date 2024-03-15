import React, { useState, useEffect } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
const App = () => {
  const [rules, setRules] = useState(true);
  const clearRules = () => {
    setRules(false);
  };
  const generateRandom = () => {
    return Math.floor(Math.random() * 80);
  };
  const [topmargin, setTopmargin] = useState(0);
  const [rightmargin, setRightmargin] = useState(0);
  const [bottommargin, setBottommargin] = useState(0);
  const [leftmargin, setLeftmargin] = useState(48);
  const sufflePosition = () => {
    setTopmargin(generateRandom());
    setRightmargin(generateRandom());
    setBottommargin(generateRandom());
    setLeftmargin(generateRandom());
  };
  const [score, setScore] = useState(0);
  const changeScore = () => {
    setScore(score + 1);
  };
  const playSound = () => {
    const audioElement = document.querySelector("#sound");
    audioElement.play();
  };
  const [timeleft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft > 0) {
            return prevTimeLeft - 1;
          } else {
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);
      const endGame = () => {
        if (timeleft === 0) {
          setGameOver(true);
          setShowPopup(true);
        }
      };
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
  const classificacao = () => {
    if (score <= 10) {
      return /*#__PURE__*/React.createElement("p", null, "N\xEDvel: Mouse de Bolinha");
    } else if (score > 10 & score <= 25) {
      return /*#__PURE__*/React.createElement("p", null, "N\xEDvel: Errei fui muleque");
    } else if (score > 25 & score <= 50) {
      return /*#__PURE__*/React.createElement("p", null, "N\xEDvel: Meu mousepad t\xE1 ruim");
    } else if (score > 50 & score <= 75) {
      return /*#__PURE__*/React.createElement("p", null, "N\xEDvel: Ainda n\xE3o tenho artrite");
    } else if (score > 75) {
      return /*#__PURE__*/React.createElement("p", null, "N\xEDvel: Tentando quebrar o mouse");
    }
  };
  const renderPopup = () => {
    return /*#__PURE__*/React.createElement("div", {
      className: "popup"
    }, /*#__PURE__*/React.createElement("div", {
      className: "popup-content"
    }, /*#__PURE__*/React.createElement("p", null, "Seu score: ", score), classificacao(), /*#__PURE__*/React.createElement("button", {
      onClick: restartGame
    }, "Reiniciar o jogo")));
  };
  const [bground, setBground] = useState("black");
  const changeBackground = () => {
    if (score >= 25) {
      setBground("white");
    }
  };
  const [bttext, setBttext] = useState("❌");
  const changeButtontext = () => {
    if (score >= 50) {
      setBttext("◽");
    }
  };
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
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Click Game"), /*#__PURE__*/React.createElement("h2", null, "Pontua\xE7\xE3o: ", score, " - Tempo Restante: ", timeleft), rules && /*#__PURE__*/React.createElement("div", {
    id: "rules"
  }, /*#__PURE__*/React.createElement("p", null, "Regras:", /*#__PURE__*/React.createElement("br", null), "Clicar no bot\xE3o abaixo inicia o jogo;", /*#__PURE__*/React.createElement("br", null), "Cada clique faz o bot\xE3o mudar de posi\xE7\xE3o, acrescentando +1 \xE0 pontua\xE7\xE3o total do jogador;", /*#__PURE__*/React.createElement("br", null), "Uma vez iniciado o jogo, o jogador tem 60 segundos para marcar a maior pontua\xE7\xE3o poss\xEDvel;", /*#__PURE__*/React.createElement("br", null), "Esgotado o tempo, exibe-se a pontua\xE7\xE3o e a classifica\xE7\xE3o do jogador.", /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("button", {
    id: "game-button",
    style: {
      margin: `${topmargin}% ${rightmargin}% ${bottommargin}% ${leftmargin}%`,
      backgroundColor: `${bground}`
    },
    onClick: startGame
  }, bttext, /*#__PURE__*/React.createElement("audio", {
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    className: "clip",
    id: "sound"
  })), gameOver && showPopup && renderPopup());
};
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#box"));
