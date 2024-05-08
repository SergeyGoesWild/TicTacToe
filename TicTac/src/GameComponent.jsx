import "./styles/GameComponent.style.css";
import CellComponent from "./CellComponent";
import { useState } from "react";
import checkRes from "./CheckRes.js";
import data from "./DataMock.js";

let moveCounter = 1;

function GameComponent() {
  const [dataState, setDataState] = useState(data);
  const [actElem, setActElem] = useState("❎");
  const [endOfGame, setEndOfGame] = useState(false);
  const [gameResult, setGameResult] = useState("");

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
      moveCounter += 1;
      let { res, winner } = checkRes(newTable);
      if (res || moveCounter === 10) {
        setEndOfGame(true);
        if (res) {
          setGameResult(`Congrats, the winner is ${winner}`);
        } else {
          setGameResult("It's a draw");
        }
      }
    }
  };

  const restart = () => {
    console.log("------------------");
    setEndOfGame(false);
    setDataState(data);
    setActElem("❎");
    moveCounter = 1;
  };

  return (
    <div className="vertical-container">
      <div className="grid-container">
        {dataState.map((elem, index) => (
          <div
            key={index}
            style={{ pointerEvents: endOfGame ? "none" : "auto" }}
          >
            <CellComponent elem={elem} onClickCell={onClickCell} />
          </div>
        ))}
      </div>
      {endOfGame && (
        <>
          <p>{gameResult}</p>
          <button onClick={restart}>Restart</button>
        </>
      )}
    </div>
  );
}

export default GameComponent;
