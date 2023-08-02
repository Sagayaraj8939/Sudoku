import React, { useState, useRef, useEffect } from "react";
import "../styles.css";
import { useBoardContext } from "./BoardContext.js";

function WinMessage() {
  const { setShowWinMsg, resetClick } = useBoardContext();

  return (
    <>
      <div className="winMessage">
        <div className="winDiv">
          <div>
            Congratulations!
            <br />
            You <span>completed</span> Sudoku.
            <br />
            <button
              className="reset-btn"
              onClick={() => {
                resetClick();
                setShowWinMsg(false);
              }}
            >
              Play again
            </button>
            <button className="reset-btn" onClick={() => setShowWinMsg(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WinMessage;
