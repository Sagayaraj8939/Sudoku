import React, { useEffect, useState, useRef } from "react";
import "../styles.css";
import Dropdown from "./Dropdown";
import { useBoardContext } from "./BoardContext.js";
import { helpContextProvider } from "./BoardContext.js";

const Help = () =>
  // changeBoard
  // blurContent,
  // fillBlur
  // helpCell,
  // boardStatusArr
  {
    const fillNEmpty = useRef({
      box: [],
      column: [],
      row: []
    });
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const { board } = useBoardContext();
    // const level = ["Easy", "Medium", "Hard"];
    // const boardStatus = useRef()
    const [choosen, setChoosen] = useState(false);
    // useEffect(() => {
    // return () => console.log("hello");
    // console.log(boardStatusArr);

    for (let i = 0; i < 9; i++) {
      let j;

      for (j = 0; j < 9; j++) {
        if (board[i][j] === "") break;
      }
      if (j === 9) {
        if (!fillNEmpty.current.box.includes(i)) fillNEmpty.current.box.push(i);
      } else {
        if (fillNEmpty.current.box.includes(i))
          fillNEmpty.current.box = fillNEmpty.current.box.filter(
            (x) => x !== i
          );
      }

      let oc = i < 3 ? 0 : i < 6 ? 1 : i < 9 ? 2 : null;
      for (; oc < 9; oc += 3) {
        let ic = [0, 3, 6].includes(i)
          ? 0
          : [1, 4, 7].includes(i)
          ? 1
          : [2, 5, 8].includes(i)
          ? 2
          : null;
        for (; ic < 9; ic += 3) {
          if (board[oc][ic] === "") break;
        }
        if (ic < 9) break;
      }
      if (oc < 9) {
        if (fillNEmpty.current.column.includes(i))
          fillNEmpty.current.column = fillNEmpty.current.column.filter(
            (x) => x !== i
          );
      } else {
        if (!fillNEmpty.current.column.includes(i))
          fillNEmpty.current.column.push(i);
      }
      oc = i < 3 ? 0 : i < 6 ? 3 : i < 9 ? 6 : null;
      j = 0;
      for (; j < 3; oc++, j++) {
        let ic = [0, 3, 6].includes(i)
          ? 0
          : [1, 4, 7].includes(i)
          ? 3
          : [2, 5, 8].includes(i)
          ? 6
          : null;
        let k = 0;
        for (; k < 3; ic++, k++) {
          if (board[oc][ic] === "") break;
        }
        if (k < 3) break;
      }
      if (j < 3) {
        if (fillNEmpty.current.row.includes(i))
          fillNEmpty.current.row = fillNEmpty.current.row.filter(
            (x) => x !== i
          );
      } else {
        if (!fillNEmpty.current.row.includes(i)) fillNEmpty.current.row.push(i);
      }
    }
    // console.log(fillNEmpty.current);
    // }, [board]);
    // const [click, setClick] = useState(false);

    return (
      <>
        <div
          className="help-box dropdown"
          // onMouseOver={() =>
          //   // if (click)
          //   setChoosen(true)
          // }
          // onMouseOut={() => {
          //   if (click) {
          //     return setChoosen(true);
          //   } else {
          //     return setChoosen(false);
          //   }
          // }}
          // onClick={() => setChoosen(!choosen)}
        >
          <div
            className={`dropdown-button ${choosen && "apply-green"}`}
            onClick={() => {
              setChoosen(!choosen);
              // console.log(fillNEmpty.current);
              // helpCell();
            }}
          >
            Help
            <i
              className={`fa-solid fa-circle-chevron-${
                choosen ? "up" : "down"
              }`}
            ></i>
          </div>
          {choosen && (
            <div className="help-box-content">
              <helpContextProvider.Provider value={{ arr }}>
                <Dropdown
                  title="choose box"
                  numArr={fillNEmpty.current.box}
                  // arr={boxNumber}
                  label="Fill box"
                  // changeBoard={changeBoard}
                  // blurContent={blurContent}
                  // fillBlur={fillBlur}
                  // className="help-box-items"
                />
                <Dropdown
                  title="choose row"
                  numArr={fillNEmpty.current.row}
                  // arr={boxNumber}
                  label="Fill row"
                  // changeBoard={changeBoard}
                  // blurContent={blurContent}
                  // fillBlur={fillBlur}
                  // className="help-box-items"
                />
                <Dropdown
                  title="choose column"
                  numArr={fillNEmpty.current.column}
                  // arr={boxNumber}
                  label="Fill column"
                  // changeBoard={changeBoard}
                  // blurContent={blurContent}
                  // fillBlur={fillBlur}
                  // className="help-box-items"
                />
              </helpContextProvider.Provider>
            </div>
          )}
        </div>
      </>
    );
  };
export default Help;
