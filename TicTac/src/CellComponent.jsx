import { useState, useRef, useEffect } from "react";
import "./styles/CellComponent.style.css";
import { CSSTransition } from "react-transition-group";

function CellComponent({ elem, onClickCell, restartPressed }) {
  const [fadeAnim, setFadeAnim] = useState(false);
  const nodeRef = useRef(null);
  useEffect(() => {
    if (restartPressed) {
      setFadeAnim(false);
    }
  }, [restartPressed]);

  return (
    <div
      className="cell"
      onClick={() => {
        onClickCell(elem.key);
        setFadeAnim(true);
      }}
    >
      <CSSTransition
        in={fadeAnim}
        timeout={500}
        classNames="fade"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <p ref={nodeRef}>{elem.value}</p>
      </CSSTransition>
    </div>
  );
}

export default CellComponent;
