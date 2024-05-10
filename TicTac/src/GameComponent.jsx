import { CSSTransition } from "react-transition-group";
import "./styles/GameComponent.style.css";
import CellComponent from "./CellComponent";
import ViewCell from "./ViewCell";
import { useState } from "react";
import checkRes from "./CheckRes.js";
import data from "./DataMock.js";
import { TestFadeOut } from "./TestFadeOut";

let moveCounter = 1;

function GameComponent() {
  const [dataState, setDataState] = useState(data);
  const [actElem, setActElem] = useState("❎");
  const [endOfGame, setEndOfGame] = useState(false);
  const [gameResult, setGameResult] = useState("");
  const [isFadeOut, setIsFadeOut] = useState(false);
  const [counter, setCounter] = useState(1);

  const changeSym = () => {
    if (actElem === "❎") {
      setActElem("🅾️");
    } else {
      setActElem("❎");
    }
  };

  const onClickCell = (key) => {
    let clickCheck = dataState[key].value === " ";

    if (!clickCheck) {
      return;
    }

    const firstPart = dataState.slice(0, key);
    const secondPart = dataState.slice(key + 1);
    const newTable = [
      ...firstPart,
      { key: key, value: actElem },
      ...secondPart,
    ];
    changeSym();

    setCounter((prevCounter) => prevCounter + 1); // update counter
    setCounter(counter + 1); // bad, might not work as expected
    moveCounter += 1;

    let { res, winner } = checkRes(newTable);
    if (res || moveCounter === 10) {
      setEndOfGame(true);
      if (res) {
        setGameResult(`The winner is ${winner}`);
      } else {
        setGameResult("It's a draw");
      }
    }

    setDataState(newTable);
  };

  const restart = () => {
    console.log("------------------");
    setEndOfGame(false);
    setActElem("❎");
    // start animation
    setIsFadeOut(true); // append classes to cells
    setTimeout(() => {
      // reset data
      setDataState(data);
      // remove classes from cells
      setIsFadeOut(false);
    }, 300); // need to explicitly tell time exactly as in css animation
    moveCounter = 1;
  };

  return (
    <div className="game-container">
      <div className="grid-container">
        {dataState.map((elem, index) => (
          <div
            key={index}
            style={{ pointerEvents: endOfGame ? "none" : "auto" }}
          >
            {elem.value === " " ? (
              <ViewCell isFadeOut={isFadeOut}>
                <button onClick={onClickCell}>{elem.value}</button>
              </ViewCell>
            ) : (
              <ViewCell isFadeOut={isFadeOut}>
                <p>{elem.value}</p>
              </ViewCell>
            )}
          </div>
        ))}
      </div>
      <CSSTransition
        in={endOfGame}
        timeout={3000}
        classNames="fade"
        unmountOnExit
      >
        <div className={"result-container"}>
          <h3>{gameResult}</h3>
          <button className="restart-button" onClick={restart}>
            Restart
          </button>
        </div>
      </CSSTransition>
      <TestFadeOut />
    </div>
  );
}

export default GameComponent;
