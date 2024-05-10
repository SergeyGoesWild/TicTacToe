import { useState } from "react";
import "./styles/CellComponent.style.css";

function ViewCell({ isFadeOut, children }) {
  return (
    <div className={`cell ${isFadeOut ? "fade-out" : ""}`}>{children}</div>
  );
}

export default ViewCell;
