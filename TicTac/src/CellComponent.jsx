import { useState } from "react";
import "./styles/CellComponent.style.css";

function CellComponent({ elem, onClickCell }) {
  return (
    <div
      className="cell"
      onClick={() => {
        onClickCell(elem.key);
      }}
    >
      <p>{elem.value}</p>
    </div>
  );
}

export default CellComponent;
