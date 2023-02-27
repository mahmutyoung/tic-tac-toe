import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <div className="square">
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    </div>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(initialSquares);
  const [itemValue, setItemValue] = useState("X");
  const [xIsNext, setNext] = useState(false);

  const winner = calculateWinner(squares);
  const handleClick = (itemId) => {
    if (winner || squares[itemId].value !== null) {
      return;
    }
    if (xIsNext) {
      setItemValue(() => "X");
    } else {
      setItemValue(() => "O");
    }
    const nextSquares = squares.slice();
    nextSquares[itemId].value = itemValue;
    setSquares(nextSquares);
    setNext((previous) => !previous);
  };
  const squareList = squares.map((item) => (
    <Square
      key={item.id}
      value={item.value}
      onSquareClick={() => handleClick(item.id)}
    />
  ));

  return (
    <>
      <h1>
        {winner === null
          ? xIsNext
            ? "Next Player: O"
            : "Next Player: X"
          : `${winner} is winner`}
      </h1>
      <div className="board-row">{squareList}</div>
    </>
  );
}

const initialSquares = [];
for (let i = 0; i < 9; i++) {
  initialSquares.push({ id: i, value: null });
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a].value &&
      squares[a].value === squares[b].value &&
      squares[a].value === squares[c].value
    ) {
      return squares[a].value;
    }
  }
  return null;
}
