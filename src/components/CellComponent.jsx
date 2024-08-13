import { useState, useRef, useEffect } from "react";
import "../styles/CellComponent.style.css";
import { CSSTransition } from "react-transition-group";

function CellComponent({ elem, onClickCell, restartPressed, endOfGame }) {
  const [tapped, setTapped] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={hovered ? "cell-hover" : tapped ? "cell-tapped" : "cell"}
      onClick={
        elem.value === " "
          ? () => {
              onClickCell(elem.key);
            }
          : null
      }
      onTouchStart={elem.value === " " ? () => setTapped(true) : null}
      onTouchEnd={() => setTapped(false)}
      onMouseEnter={elem.value === " " ? () => setHovered(true) : null}
      onMouseLeave={() => setHovered(false)}
    >
      <p
        className={
          restartPressed ? "fade-out" : elem.value != " " ? "fade-in" : null
        }
      >
        {elem.value}
      </p>
      {/* <p className={restartPressed ? "fade-out" : null}>A</p> */}
      {/* </CSSTransition> */}
    </div>
  );
}

export default CellComponent;
