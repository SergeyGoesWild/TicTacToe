import React, { useState } from "react";
import "./TestDafeOut.style.css";

export const TestFadeOut = () => {
  const [isFadeOut, setIsFadeOut] = useState(false);
  return (
    <div>
      TestFadeOut
      <button onClick={() => setIsFadeOut((prev) => !prev)}>
        Click to fade
      </button>
      <div
        className={isFadeOut ? "fade-out" : ""}
        style={{ width: "100px", height: 100, backgroundColor: "red" }}
      ></div>
    </div>
  );
};
