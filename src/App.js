import "./styles.css";
import { easy } from "./components/Level.jsx";
import React, { useState, useRef } from "react";
import Dropdown from "./components/Dropdown.jsx";
import Buttons from "./components/Buttons.jsx";
import Board from "./components/Board.jsx";
import Help from "./components/Help.jsx";
import WinMessage from "./components/WinMessage.jsx";
import { boardContextProvider } from "./components/BoardContext.js";

export default function App() {
  const arr = easy.map((val) => {
    return [...val];
  });
  const [board, setBoard] = useState(() => [...arr]);
  // const [board, setBoard] = useState(() => {
  //   const Earray = easy.map((val) => {
  //     return [...val];
  //   });
  //   return Earray;
  // });
  // console.log(board);
  // console.log(easy);
  const [lvl, setLvl] = useState("Easy");
  const [click, setClick] = useState(9);
  // const dummy = useRef(1);
  const level = ["Easy", "Medium", "Hard"];
  const [reset, setReset] = useState(false);
  const [solve, setSolve] = useState(false);
  const [unSolve, setUnSolve] = useState(false);
  const toggleHelpCell = useRef(false);
  const [undo, setUndo] = useState(false);
  const [redo, setRedo] = useState(false);
  const [fill, setFill] = useState(false);
  const snow = useRef(false);
  const [showWinMsg, setShowWinMsg] = useState(false);
  // const boardStatusArr = useRef([]);
  const [blurArr, setBlurArr] = useState([]);
  const fillCellClick = () => setFill(() => !fill);
  const solveClick = () => {
    lvl === null ? alert("Please select a level to solve") : setSolve(true);
    // console.log(solve);
    // // setDummy((dummy) => dummy + 1);
    // dummy.current = dummy.current + 1;
    // console.log(dummy.current);
  };
  const unSolveClick = () => {
    lvl === null
      ? alert("Please solve the puzzle first to unSolve")
      : setUnSolve(true);
    // console.log(solve);
    // // setDummy((dummy) => dummy + 1);
    // dummy.current = dummy.current + 1;
    // console.log(dummy.current);
  };
  const resetClick = () => {
    setReset(() => !reset);
    setSolve(() => false);
    setUnSolve(() => false);
  };

  const fillBlur = () => (snow.current = !snow.current);
  const blurContent = (blur) => {
    // if (blur.length !== 0)
    // if (blur || !blur) {
    //   // console.log(blur);
    //   return;
    // }
    setBlurArr(() => blur);
    // else
    // }
    // }
  };

  const undoClick = () => setUndo(!undo);
  const redoClick = () => setRedo(!redo);

  // const helpCell = () => (toggleHelpCell.current = !toggleHelpCell.current);
  // const boardStatus = (val) => {
  //   boardStatusArr.current = val;
  // };
  function changeBoard(val) {
    if (level.includes(val)) {
      setLvl(() => val);
      setSolve(() => false);
      // } else {
      //   setLvl(() => null);
    }
  }

  return (
    <boardContextProvider.Provider
      value={{
        board,
        setBoard,
        changeBoard,
        blurContent,
        fillBlur,
        setSolve,
        setUnSolve,
        solve,
        unSolve,
        showWinMsg,
        setShowWinMsg,
        resetClick,
        click,
        setClick
      }}
    >
      <div className="App">
        {showWinMsg && <WinMessage />}
        <div className="first-div">
          <div>
            <Board
              changeLevel={lvl}
              reset={reset}
              // solve={solve}
              fill={fill}
              undo={undo}
              redo={redo}
              blurArr={blurArr}
              sno={snow.current}
              toggleHelpCell={toggleHelpCell.current}
              // boardStatus={boardStatus}
            />
          </div>
          <div className="options">
            <div className="drop-flex">
              <Dropdown
                title="Easy"
                arr1={level}
                label="Choose level"
                changeBoard={changeBoard}
              />
              <Help
              // board={board}
              // changeBoard={changeBoard}
              // blurContent={blurContent}
              // fillBlur={fillBlur}
              // helpCell={helpCell}
              // boardStatusArr={boardStatusArr.current}
              />
              <Buttons
                resetClick={resetClick}
                fillCellClick={fillCellClick}
                solveClick={solveClick}
                unSolveClick={unSolveClick}
                solve={solve}
                unSolve={unSolve}
                undoClick={undoClick}
                redoClick={redoClick}
              />
            </div>
          </div>
        </div>
      </div>
    </boardContextProvider.Provider>
  );
}
