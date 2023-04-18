//https://react.dev/learn/tutorial-tic-tac-toe#setup-for-the-tutorial
//https://react.dev/learn/thinking-in-react
//https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites
//https://www.electronjs.org/docs/latest/
//https://getbootstrap.com/docs/5.3/getting-started/introduction/


//import React, { Component }  from 'react';
import React, {useState} from 'react';

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [curMove, setCurMove] = useState(0);
  //const currentSquares = history[history.length - 1];
  const currentSquares = history[curMove];

  function handlePlay(nextSquares) {
    //setHistory([...history, nextSquares]);
    const nextHistory = [...history.slice(0, curMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move # ${move}`;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });  

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({xIsNext, squares, onPlay}) {
  //const [squares, setSquares] = useState(Array(9).fill(null));
  //const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }

    const nextSquares = squares.slice();
    //let curClick = nextSquares.filter(j => j !== null).length;
    //if (curClick % 2 === 0) {nextSquares[i] = "X"} 
    if (xIsNext){
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
     //setSquares(nextSquares);
     //setXIsNext(!xIsNext);
     onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function Square({value, onSquareClick}){
  //const [value, setValue] = useState(null);

  /*
  function handleClick(){
    //console.log('clicked!');
    setValue('X');
  }
  */

  return (
    <button 
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
  //onClick={handleClick}
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
