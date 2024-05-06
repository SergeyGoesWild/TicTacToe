import { useState } from "react";
import GameComponent from "./GameComponent.jsx";
import "./App.css";

function App() {
  return (
    <div className="vertical-container">
      <div className="horizontal-container">
        <GameComponent />
      </div>
    </div>
  );
}

export default App;
