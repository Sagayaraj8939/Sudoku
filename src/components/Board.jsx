import React, { useEffect, useState, useRef } from "react";
import { rows, cols, box } from "./RowsColsBox";
import {
  easy,
  medium,
  hard,
  easySolved,
  hardSolved,
  mediumSolved
} from "./Level";
import { useBoardContext } from "./BoardContext.js";
import Numpad from "./Numpad";
import "../styles.css";

function Board({
  changeLevel,
  reset,
  fill,
  undo,
  redo,
  blurArr,
  boardStatus,
  sno,
  toggleHelpCell
}) {
  const undoArr = useRef([]);
  const redoArr = useRef([]);
  const oldNum = useRef();
  const level = useRef(changeLevel);
  const duplicateCells = useRef([]);
  const Message = useRef(false);
  const duplicateNums = useRef([]);
  const [lvarr, setLvarr] = useState(
    Array.from({ length: 9 }, (v) => Array.from({ length: 9 }, (v) => ""))
  );
  const {
    board,
    setBoard,
    setSolve,
    solve,
    unSolve,
    setUnSolve,
    setShowWinMsg,
    setClick
  } = useBoardContext();
  // const arr = Array.from({ length: 9 }, (v) =>
  //   Array.from({ length: 9 }, (v) => "")
  // );
  // const [board, setBoard] = useState(() => {
  //   const Earray = arr.map((val) => {
  //     return [...val];
  //   });
  //   return Earray;
  // });

  const [num, setNum] = useState();
  // const [blur, setBlur] = useState(blurArr);
  const blur = useRef([]);
  const [cell, setCell] = useState(null);
  const [outerCell, setOuterCell] = useState(null);
  const fillPoint = useRef([]);
  const fillCell = useRef(0);
  const solvedArray = useRef([]);
  const unSolvedArray = useRef([]);
  // const boardStatusArr = useRef([]);

  // useEffect(() => {
  // }, [toggleHelpCell, boardStatus]);

  // useEffect(() => {
  //   // boardStatusArr.current = board.map((val) => [...val]);
  //   boardStatus(board);
  //   // console.log(board);
  // }, [board, boardStatus]);

  useEffect(() => {
    // if (changeLevel !== null) {
    if (changeLevel === "Easy") {
      setLvarr(() => easy);
      solvedArray.current = easySolved.map((val) => {
        return [...val];
      });
    } else if (changeLevel === "Medium") {
      setLvarr(() => medium);
      solvedArray.current = mediumSolved.map((val) => {
        return [...val];
      });
    } else if (changeLevel === "Hard") {
      setLvarr(() => hard);
      solvedArray.current = hardSolved.map((val) => {
        return [...val];
      });
    }
    setClick(() => 9);
    unSolvedArray.current = lvarr.map((val) => [...val]);
    setUnSolve(() => false);
    if (changeLevel !== null) level.current = changeLevel.toLowerCase();
    setCell(null);
    fillCell.current = 0;
    undoArr.current = [];
    redoArr.current = [];
    setBoard(() => {
      const Earray = lvarr.map((val) => {
        return [...val];
      });
      return Earray;
    });
  }, [changeLevel, lvarr, reset]);

  useEffect(() => {
    if (fillPoint.current.length > 0) {
      oldNum.current = board[fillPoint.current[0]][fillPoint.current[1]];
      // console.log(oldNum);
      //     setNum(() => oldNum);
      //   }
    }
    if (solve) {
      setClick(() => 9);
      setNum(() => fillCell.current);
      if (board.some((val) => val.some((val1) => val1 === ""))) {
        // setSolve(() => false);
        unSolvedArray.current = board.map((val) => [...val]);
      }
      setBoard(() => {
        return solvedArray.current.map((val) => {
          return [...val];
        });
      });
      // console.log(solve);
      // } else if (!solve) {
      setUnSolve(() => false);
    }
    // else {
    //  else setUnSolve(() => true);
  }, [solve]);

  useEffect(() => {
    if (unSolve) {
      setClick(() => 9);
      if (unSolvedArray.current.length > 0) {
        // const oldNum = board[fillPoint.current[0]][fillPoint.current[1]];
        // console.log(unSolve);
        // console.log(oldNum);
        // console.log(num);
        setNum(() => oldNum.current);
        setBoard(() => {
          return unSolvedArray.current.map((val) => {
            return [...val];
          });
        });
      }
      setSolve(() => false);
    }
  }, [unSolve]);

  // console.log(solve);
  // if (board.some((val) => val.some((val1) => val1 === ""))) {
  //   setSolve(() => false);
  // } else {
  useEffect(() => {
    if (solvedArray.current.length > 0) {
      let i = 0;
      for (; i < 9; i++) {
        let j = 0;
        for (; j < 9; j++) {
          if (board[i][j] !== solvedArray.current[i][j]) break;
        }
        if (j !== 9) break;
      }
      if (i !== 9) setSolve(() => false);
      else {
        setSolve(() => true);
        // setUnSolve(() => false);
      }
      if (!board.some((val) => val.some((val1) => val1 === ""))) {
        if (solvedArray.current.length > 0) {
          let i = 0;
          for (; i < 9; i++) {
            let j = 0;
            for (; j < 9; j++) {
              if (board[i][j] !== solvedArray.current[i][j]) break;
            }
            if (j !== 9) break;
          }
          if (i === 9) setShowWinMsg(() => true);
          // else {
          //   setShowWinMsg(() => true);
          //   // setUnSolve(() => false);
          // }
        }
      }
    }
    // console.log(solve);
  }, [board]);
  // console.log(solve);
  // }

  useEffect(() => {
    const undoBox = undoArr.current.pop();
    setNum(() => "");
    setClick(() => 9);
    if (undoBox !== undefined) {
      redoArr.current.push(undoBox);
      setBoard((board) => {
        const board1 = board.map((val) => {
          return [...val];
        });
        board1[undoBox[0]][undoBox[1]] = "";
        // undoArr.current.forEach((val) => {
        //   board1[val[0]][val[1]] = val[2];
        // });
        return board1;
      });
      // } else {
      //   console.log(undoBox);
    }
    // console.log(undoArr.current);
    // console.log(redoArr.current);
  }, [undo]);

  useEffect(() => {
    const redoBox = redoArr.current.pop();
    setClick(() => 9);
    if (redoBox !== undefined) {
      undoArr.current.push(redoBox);
      setBoard((board) => {
        const board1 = board.map((val) => {
          return [...val];
        });
        board1[redoBox[0]][redoBox[1]] = redoBox[2];
        return board1;
      });
    }
    // console.log(undoArr.current);
    // console.log(redoArr.current);
  }, [redo]);

  function selectCell() {
    alert(`Please Select a cell to Proceed`);
  }

  function changeNum(val) {
    if (cell === null) return selectCell();
    setBoard((board) => {
      const board1 = [...board];
      board1[outerCell][cell] = val;
      return board1;
    });
    // if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(val)) setNum(() => val);
    // else
    setNum(() => val);
    undoArr.current.push([outerCell, cell, val]);
    if (!board.some((val) => val.some((val1) => val1 === ""))) {
      if (solvedArray.current.length > 0) {
        let i = 0;
        for (; i < 9; i++) {
          let j = 0;
          for (; j < 9; j++) {
            if (board[i][j] !== solvedArray.current[i][j]) break;
          }
          if (j !== 9) break;
        }
        if (i === 9) setShowWinMsg(() => true);
        // else {
        //   setShowWinMsg(() => true);
        //   // setUnSolve(() => false);
        // }
      }
    }
    // console.log(undoArr.current);
  }
  function displayNum(val) {
    if (cell === null) return;
    else {
      setBoard((board) => {
        const board1 = [...board];
        board1[outerCell][cell] = val === "Erase" ? "🚫" : val;
        return board1;
      });
    }
  }
  function hideNum() {
    if (cell === null) return;
    setBoard((board) => {
      const board1 = [...board];
      // if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(num))
      // if (!solve)
      board1[outerCell][cell] = num;
      // else board1[outerCell][cell] = solvedArray.current[outerCell][cell];
      // console.log(solve);
      // console.log(num);
      // console.log(board1[outerCell][cell]);
      // else board1[outerCell][cell] = "";
      return board1;
    });
  }

  function highLight(i, ind) {
    setCell(() => i);
    setOuterCell(() => ind);
    fillPoint.current = [ind, i];
    setNum(() => board[ind][i]);
    let fb = Array.from({ length: 9 }, (v) =>
      Array.from({ length: 9 }, (v) => "")
    );
    if (changeLevel === "Easy") {
      fb = easySolved.map((val) => {
        return [...val];
      });
    } else if (changeLevel === "Medium") {
      fb = mediumSolved.map((val) => {
        return [...val];
      });
    } else if (changeLevel === "Hard") {
      fb = hardSolved.map((val) => {
        return [...val];
      });
    }

    const k =
      changeLevel === null ? "Please select a level and cell" : fb[ind][i];
    fillCell.current = k;
    // if (solve) setNum(() => k);
  }

  function checkMatch(out, inn) {
    if (blurArr.length > 0) {
      for (let i = 0; i < 9; i++) {
        if (blurArr[i][0] === out && blurArr[i][1] === inn) return true;
      }
      return false;
    }
    return false;
  }

  useEffect(() => {
    // if(cell === null) alert("Hi")

    if (fillPoint.current.length > 0 && fillCell.current > 0) {
      setBoard((board) => {
        const board1 = board.map((val) => {
          return [...val];
        });
        board1[fillPoint.current[0]][fillPoint.current[1]] = fillCell.current;
        return board1;
      });
      setNum(() => fillCell.current);
      undoArr.current.push([
        fillPoint.current[0],
        fillPoint.current[1],
        fillCell.current
      ]);

      // console.log(undoArr.current);
    } else if (fillCell.current !== 0) alert(fillCell.current);

    // if (fillPoint.current[0] === undefined ) alert("Please select a cell");
    // console.log(fillPoint.current);
  }, [fill]);

  useEffect(() => {
    if (blurArr.length > 0) {
      blur.current = blurArr.map((val) => {
        return [...val];
      });
      // console.log(blur.current);
    }
  }, [blurArr]);
  useEffect(() => {
    // if (sno) {
    let lev, init;
    // console.log("hello");
    if (level.current === "easy") {
      lev = easySolved.map((val) => [...val]);
      init = easy.map((val) => [...val]);
    } else if (level.current === "hard") {
      lev = hardSolved.map((val) => [...val]);
      init = hard.map((val) => [...val]);
    } else if (level.current === "medium") {
      lev = mediumSolved.map((val) => [...val]);
      init = medium.map((val) => [...val]);
    }
    if (blur.current.length > 0) {
      setBoard((board) => {
        let board1 = board.map((val) => [...val]);
        let board2 = board.map((val) => [...val]);
        // const lev = `${level.current}Solved`;
        let i = 0;
        for (; i < 9; i++) {
          const a = blur.current[i][0];
          const b = blur.current[i][1];
          // if(board1.some(val => val))
          if (board1[a][b] === "") break;
        }
        if (i === 9) {
          for (let j = 0; j < 9; j++) {
            const a = blur.current[j][0];
            const b = blur.current[j][1];
            // if(board1.some(val => val))
            board1[a][b] = init[a][b];
          }
          return board1;
        } else {
          for (let j = 0; j < 9; j++) {
            const a = blur.current[j][0];
            const b = blur.current[j][1];
            // if(board1.some(val => val))
            if (lev !== undefined) board2[a][b] = lev[a][b];
          }
          return board2;
        }
      });
    }
    // console.log(sno);
    // } else if (sno === false) {
    // if (blur.current.length > 0) {
    //   setBoard((board) => {
    //     let board1 = board.map((val) => [...val]);
    //     // const lev = `${level.current}Solved`;
    //     for (let i = 0; i < 9; i++) {
    //       const a = blur.current[i][0];
    //       const b = blur.current[i][1];
    //       if (
    //         (easy[a][b] === "" && level.current === "easy") ||
    //         (medium[a][b] === "" && level.current === "medium") ||
    //         (hard[a][b] === "" && level.current === "hard")
    //       )
    //         board1[a][b] = "";
    //     }
    //     return board1;
    //   });
    // console.log(sno);
    // }
  }, [sno]);
  // console.log(fillPoint.current);

  const checkDuplicate = (ind, i, val) => {
    if (val === lvarr[ind][i]) return false;
    if (duplicateNums.current.includes(val)) {
      // Message.current = "Please check the numbers in RED color for Duplicates";
      return true;
    }
    return false;
    // for(let i=0; i<9; i++){
    // }
    // console.log("hello");
  };
  // console.log("hello");
  let rowArray = [[], [], [], [], [], [], [], [], []];
  let columnArray = [[], [], [], [], [], [], [], [], []];
  let boxArray = [[], [], [], [], [], [], [], [], []];
  for (let i = 0; i < 9; i++) {
    rows[i].forEach((val) => {
      rowArray[i].push(board[val[0]][val[1]]);
    });
    cols[i].forEach((val) => {
      columnArray[i].push(board[val[0]][val[1]]);
    });
    box[i].forEach((val) => {
      boxArray[i].push(board[val[0]][val[1]]);
    });
  }
  let rowArrayD = [];
  let columnArrayD = [];
  let boxArrayD = [];

  for (let i = 0; i < 9; i++) {
    rowArrayD.push(
      rowArray[i].filter(
        (val, index, arr) => arr.indexOf(val) !== index && val !== ""
      )
    );
    columnArrayD.push(
      columnArray[i].filter(
        (val, index, arr) => arr.indexOf(val) !== index && val !== ""
      )
    );
    boxArrayD.push(
      boxArray[i].filter(
        (val, index, arr) => arr.indexOf(val) !== index && val !== ""
      )
    );
  }
  duplicateCells.current = [];
  duplicateNums.current = [];

  for (let i = 0; i < 9; i++) {
    if (rowArrayD[i].length > 0) {
      duplicateCells.current.push(...rows[i]);
      duplicateNums.current.push(...rowArrayD[i]);
    }
    if (boxArrayD[i].length > 0) {
      duplicateCells.current.push(...box[i]);
      duplicateNums.current.push(...boxArrayD[i]);
    }
    if (columnArrayD[i].length > 0) {
      duplicateCells.current.push(...cols[i]);
      duplicateNums.current.push(...columnArrayD[i]);
    }

    duplicateCells.current = duplicateCells.current.filter(
      (item, index, arr1) => {
        return (
          index ===
          arr1.findIndex((item1) => {
            return JSON.stringify(item1) === JSON.stringify(item);
          })
        );
      }
    );
    duplicateNums.current = duplicateNums.current.filter(
      (val, index, arr) => arr.indexOf(val) === index && val !== ""
    );
  }
  if (duplicateNums.current.length === 0) Message.current = false;
  else Message.current = true;

  useEffect(() => {
    // console.log(board);
  }, [board]);

  const errorColor = (out, inn) => {
    let checkArr = duplicateCells.current.map((val) => JSON.stringify(val));
    let c = "[" + out + "," + inn + "]";
    if (checkArr.includes(c)) return true;
    return false;
  };

  return (
    <>
      {/* <p> rendered {count.current}</p> */}
      <div className="Board-first-div">
        <div className="sudoku">
          <h1>SUDOKU</h1>
          {Message.current && (
            <p className="errorMessage">
              Please check the numbers in{" "}
              <span style={{ color: "red" }}>RED</span> color for Duplicates
            </p>
          )}
        </div>
        <div className={`outer-box ${Message.current && "outer-box-down"}`}>
          {board.map((val, ind) => {
            return (
              <div key={ind} className="tiles">
                {val.map((valu, i) => {
                  return (
                    <div
                      key={i}
                      className={`inner-tiles ${
                        i === cell && ind === outerCell && "glow1"
                      }
                      ${!(valu <= 9) && "smallText"}
                      ${checkMatch(ind, i) && "blurContents"} ${
                        valu === lvarr[ind][i] &&
                        lvarr[ind][i] !== "" &&
                        "disabled"
                      }
                      ${
                        errorColor(ind, i) &&
                        checkDuplicate(ind, i, valu) &&
                        board[ind][i] !== solvedArray.current[ind][i] &&
                        "duplicateNum"
                      }`}
                      onClick={() => highLight(i, ind)}
                      // {`${valu === easy[ind][i] && valu !== "" && "disabled"}`}
                    >
                      <div
                        className={`${
                          i === cell && ind === outerCell && "glow"
                        }`}
                      ></div>
                      <div
                        className={`${errorColor(ind, i) && "errorColor"}`}
                      ></div>
                      {valu}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <Numpad
          changeNum={changeNum}
          displayNum={displayNum}
          hideNum={hideNum}
          currentCell={fillPoint.current}
        />
      </div>
    </>
  );
}

export default Board;
