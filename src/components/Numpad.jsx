import React, { useState } from "react";
import "../styles.css";
import { useBoardContext } from "./BoardContext.js";

function Numpad({ changeNum, displayNum, hideNum, currentCell }) {
  // const [isClick, set]
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "Erase"];
  const { click, setClick } = useBoardContext();
  const [numArray] = useState(numbers);
  const [cell, setCell] = useState([]);
  // const [click, setClick] = useState(9);

  function handleClick(val) {
    // console.log(val);
    setClick(numbers.indexOf(val));
    val = val === "Erase" ? "" : val;
    changeNum(val);
    setCell(() => currentCell);
    // console.log("hello");
  }

  return (
    <>
      {/* <p>Show Numpad</p> */}
      <div className="Numpad">
        {numArray.map((val, i) => {
          return (
            <div
              className={`Numpad-btn ${click === i && "apply-green"}`}
              key={i}
              onClick={() => handleClick(val)}
              onMouseOver={() => displayNum(val)}
              onMouseOut={() => {
                // console.log(board[currentCell[0]][currentCell[1]]);
                if (
                  click === i &&
                  cell === currentCell &&
                  numbers[i] !== "Erase"
                  // [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(
                  //   board[currentCell[0]][currentCell[1]]
                  // )
                )
                  return;
                // if (true) console.log(solve);
                hideNum();
              }}
            >
              {val}
            </div>
          );
        })}
        {/* <div className="Numpad-btn" onClick={()=>handleClick("")}>Erase</div> */}
      </div>
    </>
  );
}

export default Numpad;
