const rows = [[], [], [], [], [], [], [], [], []];
for (let i = 0; i < 9; i++) {
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
      rows[i].push([oc, ic]);
    }
  }
}

// console.log(rows);
const cols = [[], [], [], [], [], [], [], [], []];
for (let i = 0; i < 9; i++) {
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
      cols[i].push([oc, ic]);
    }
  }
}

const box = [[], [], [], [], [], [], [], [], []];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    box[i].push([i, j]);
  }
}

export { rows, cols, box };
