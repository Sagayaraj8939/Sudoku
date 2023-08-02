import React, { useState } from "react";
import "../styles.css";

export default function Buttons({
  resetClick,
  fillCellClick,
  solveClick,
  unSolveClick,
  solve,
  unSolve,
  undoClick,
  redoClick
}) {
  return (
    <>
      <button className="reset-btn" onClick={resetClick}>
        Reset
      </button>
      <button className="reset-btn" onClick={fillCellClick}>
        Fill selected cell
      </button>
      <div className="undoRedo">
        <button
          className={`reset-btn ${solve && "solved apply-green"}`}
          // onMouseOver={}
          onClick={
            solveClick
            // console.log(solve)
          }
        >
          {`Solve${solve ? "d" : ""}`}
        </button>
        <button
          className={`reset-btn ${unSolve && false && "solved apply-green"}`}
          // onMouseOver={}
          onClick={
            unSolveClick
            // console.log(solve)
          }
          // style={{textAlign : "center"}}
        >
          {/* {`Unsolve${unSolve ? "d" : ""}`} */}
          Unsolve
        </button>
      </div>
      <div className="undoRedo">
        <button className="reset-btn" onClick={undoClick}>
          <i className="fa-solid fa-rotate-left"></i>undo
        </button>
        <button className="reset-btn" onClick={redoClick}>
          Redo
          <i className="fa-solid fa-rotate-right"></i>
        </button>
      </div>
    </>
  );
}
