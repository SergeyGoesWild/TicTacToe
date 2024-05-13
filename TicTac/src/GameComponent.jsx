import "./styles/GameComponent.style.css";
import CellComponent from "./CellComponent";
import { useState, useRef } from "react";
import checkRes from "./CheckRes.js";
import data from "./DataMock.js";
import { CSSTransition } from "react-transition-group";

function GameComponent() {
  const [moveCounter, setMoveCounter] = useState(1);
  const [dataState, setDataState] = useState(data);
  const [actElem, setActElem] = useState("❎");
  const [endOfGame, setEndOfGame] = useState(false);
  const [gameResult, setGameResult] = useState("");
  const [restartPressed, setRestartPressed] = useState(false);
  const nodeRef = useRef(null);

  const changeSym = () => {
    if (actElem === "❎") {
      setActElem("🅾️");
    } else {
      setActElem("❎");
    }
  };

  const onClickCell = (key) => {
    let clickCheck = dataState[key].value === " ";
    if (clickCheck) {
      const firstPart = dataState.slice(0, key);
      const secondPart = dataState.slice(key + 1);
      const newTable = [
        ...firstPart,
        { key: key, value: actElem },
        ...secondPart,
      ];
      setDataState(newTable);
      changeSym();
      setMoveCounter((prevValue) => prevValue + 1);
      let { res, winner } = checkRes(newTable);
      if (res || moveCounter + 1 === 10) {
        setEndOfGame(true);
        if (res) {
          setGameResult(`The winner is ${winner}`);
        } else {
          setGameResult("It's a draw");
        }
      }
    }
  };

  const restart = () => {
    setRestartPressed(true);
    setEndOfGame(false);
    setActElem("❎");
    setMoveCounter(1);
    setTimeout(() => {
      setDataState(data);
      setRestartPressed(false);
    }, 500);
  };

  return (
    <div className="game-container">
      <div className="grid-container">
        {dataState.map((elem, index) => (
          <div
            key={index}
            style={{ pointerEvents: endOfGame ? "none" : "auto" }}
          >
            <CellComponent
              elem={elem}
              onClickCell={onClickCell}
              restartPressed={restartPressed}
            />
          </div>
        ))}
      </div>
      <CSSTransition
        in={endOfGame}
        timeout={500}
        classNames="fade"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div className={"result-container"} ref={nodeRef}>
          <h3>{gameResult}</h3>
          <button className="restart-button" onClick={restart}>
            Restart
          </button>
        </div>
      </CSSTransition>
    </div>
  );
}

export default GameComponent;
