function checkRes(tableFull) {
  let checker = false;
  let side = 3;
  const table = tableFull.map((elem) => {
    return elem.value;
  });

  // horizontal
  for (let i = 0; i < side * side; i += 3) {
    for (let j = 1; j < side; j++) {
      if (table[i] === table[i + j] && table[i] != " ") {
        checker = true;
      } else {
        checker = false;
        break;
      }
    }
    if (checker === true) {
      return { res: true, winner: table[i] };
    }
  }

  // vertical
  for (let i = 0; i < side; i++) {
    for (let j = side; j < side * side; j += 3) {
      if (table[i] === table[i + j] && table[i] != " ") {
        checker = true;
      } else {
        checker = false;
        break;
      }
    }
    if (checker === true) {
      return { res: true, winner: table[i] };
    }
  }

  // diagonal
  for (let i = 1; i < side; i++) {
    if (table[0] === table[i + side * i] && table[0] != " ") {
      checker = true;
      if (i === side - 1) {
        return { res: true, winner: table[0] };
      }
    } else {
      checker = false;
      break;
    }
  }

  for (let i = 1; i < side; i++) {
    if (
      table[side - 1] === table[(side - 1) * (i + 1)] &&
      table[side - 1] != " "
    ) {
      checker = true;
      if (i === side - 1) {
        return { res: true, winner: table[i] };
      }
    } else {
      checker = false;
      break;
    }
  }

  return { res: false, winner: " " };
}

export default checkRes;
