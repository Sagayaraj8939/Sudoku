import { useState, useRef, useEffect } from "react";
import "../styles.css";
import { useBoardContext, useHelpContext } from "./BoardContext.js";

function Dropdown({ title, label, arr1, numArr }) {
  const [text, setText] = useState(title);
  const level = ["Easy", "Medium", "Hard"];
  const { board, changeBoard, blurContent, fillBlur } = useBoardContext();
  let { arr } = useHelpContext();
  const boxNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (title === "Easy") arr = arr1.map((val) => val);
  // const [textArray, setTextArray] = useState(arr);
  // const [blurClick, setBlurClick] = useState(false);
  // const [fillContent, setFillContent] = useState(false);
  // const blurArrRow = useRef([]);
  // const blurArrCol = useRef([]);
  // const blurArrBox = useRef([]);
  const blurArr = useRef([]);
  const [lvlSelect, setLvlSelect] = useState(0);
  // const [numArr, setNumArr] = useState([]);
  const [chosen, setChosen] = useState(false);
  // setTextArray(level);

  // function handleClick() {
  //   setChosen(!chosen);
  //   // setText("choose level");
  // }
  // useEffect(() => {
  //   console.log(numArr);
  // }, [numArr]);

  // useEffect(() => {
  //   console.log(numArr);
  // }, [board]);
  // console.log("hello");

  function blurCells(i) {
    if (label !== "Choose level") {
      if (i === "No") {
        blurContent([]);
        // blurContent("no");
        // console.log("no");
        return;
      } else if (label === "Fill column") {
        blurArr.current = [];
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
            blurArr.current.push([oc, ic]);
          }
        }
      } else if (label === "Fill row") {
        blurArr.current = [];
        let oc = i < 3 ? 0 : i < 6 ? 3 : i < 9 ? 6 : null;
        for (let j = 0; j < 3; oc++, j++) {
          let ic = [0, 3, 6].includes(i)
            ? 0
            : [1, 4, 7].includes(i)
            ? 3
            : [2, 5, 8].includes(i)
            ? 6
            : null;
          for (let k = 0; k < 3; ic++, k++) {
            blurArr.current.push([oc, ic]);
          }
        }
      } else if (label === "Fill box") {
        blurArr.current = [];
        for (let j = 0; j < 9; j++) {
          blurArr.current.push([i, j]);
        }
      }
      blurContent(blurArr.current);
    }
  }
  function handleLevel(i, val) {
    if (!boxNumber.includes(val)) setText(() => val);
    // console.log(textArray[i]);
    if (level.includes(val)) setLvlSelect(() => i);
    else if (val > 0 && val < 10) {
      // setFillContent(() => !fillContent);
      // blurCells(i, fillContent);
      // if (title === "choose box") {
      //   setNumArr(() => fillNEmpty.current.box.map((val) => val));
      //   // blurContent(false);
      // } else if (title === "choose row") {
      //   setNumArr(() => fillNEmpty.current.row.map((val) => val));
      //   // blurContent(true);
      // } else if (title === "choose column") {
      //   setNumArr(() => fillNEmpty.current.column.map((val) => val));
      // }
      // console.log(blurClick);
      // setBlurClick(() => !blurClick);
      fillBlur();
      // console.log(blurClick);
      // blurContent(true);
      blurCells("No");
    }
    changeBoard(val);
    // console.log(textArray[i]);
    // setChosen(!chosen);
  }

  // function chooseOne(){
  //   setText("choo se one");
  // }

  return (
    <>
      <div className="dropdown-box">
        <p>
          <strong>{label} :</strong>
        </p>
        <div
          className="dropdown"
          // onMouseOver={() =>
          //   // if (click)
          //   setChosen(true)
          // }
          // onMouseOut={() => {
          //   if (click) {
          //     return setChosen(true);
          //   } else {
          //     return setChosen(false);
          //   }
          // }}
          // if(click){
          //   setChosen(true)
          // }
          // else {
          // setChosen(!chosen)}}}
        >
          {/* <p>hello</p> */}
          <div
            className={`dropdown-button ${chosen && "apply-green"}`}
            onClick={() => setChosen(!chosen)}
          >
            {text}
            <i
              className={`fa-solid fa-circle-chevron-${chosen ? "up" : "down"}`}
            ></i>
          </div>
          {chosen && (
            <div
              className={`${
                title === "Easy" ? "dropdown-content-flex" : "dropdown-content"
              }`}
            >
              {arr.map((val, i) => {
                return (
                  <div
                    key={i}
                    className={`dropdown-item ${
                      lvlSelect === i && level.includes(val) && "apply-brown"
                    } ${
                      numArr !== undefined &&
                      numArr.includes(i) &&
                      "apply-brown"
                    }`}
                    onClick={() => {
                      handleLevel(i, val);
                    }}
                    onMouseOver={() => blurCells(i)}
                    onMouseOut={() => blurCells("No")}
                  >
                    {val}
                  </div>
                );
              })}
              {/* <div className="dropdown-item">
       Vue 
       </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dropdown;
