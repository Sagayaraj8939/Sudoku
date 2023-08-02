import { createContext, useContext } from "react";

// const arr = Array.from({ length: 9 }, (v) =>
// Array.from({ length: 9 }, (v) => "")
// );
// const [board, setBoard] = useState(() => {
// const Earray = arr.map((val) => {
//   return [...val];
// });
// return Earray;
// });

export const boardContextProvider = createContext({});
export const useBoardContext = () => useContext(boardContextProvider);
export const helpContextProvider = createContext({});
export const useHelpContext = () => useContext(helpContextProvider);
