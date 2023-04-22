//https://react.dev/learn/tutorial-tic-tac-toe#setup-for-the-tutorial
//https://react.dev/learn/thinking-in-react
//https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites
//https://www.electronjs.org/docs/latest/
//https://getbootstrap.com/docs/5.3/getting-started/introduction/


//import React, { Component }  from 'react';
import React, {useState} from 'react';

export default function Game() {
  //const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);  //2-d array
  const [curMove, setCurMove] = useState(0);
  const [sortDesc, setSortDesc] = useState(false);
  const [positions, setPositions] = useState(Array(0));
  const xIsNext = curMove % 2 === 0;
  //const currentSquares = history[history.length - 1];
  const currentSquares = history[curMove];

  function handlePlay(nextSquares, pos) {
    //setHistory([...history, nextSquares]);
    const nextHistory = [...history.slice(0, curMove + 1), nextSquares];
    setHistory(nextHistory);  //2-d array
    setCurMove(nextHistory.length - 1);
    let nextPositions;
    if (curMove > 0){
      nextPositions = [...positions.slice(0, curMove), pos];
    } else {
      nextPositions = [...positions.slice(0, curMove), pos];
    }
    setPositions(nextPositions);  //FIXME: back history
    //setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurMove(nextMove);
    //setXIsNext(nextMove % 2 === 0);
  }

  function handleSort(){
    setSortDesc(!sortDesc);
  }  

  const moves = history.map((squares, move) => {
    let description;
    if (curMove === move){
      description = `You are at move # ${move}`;
      if (move != 0) {
        description += ` ${positions[move-1]}`;
      }
      return (
      <li key={move}>
      {description}
    </li>);
    } 
    
    if (move > 0) {
      description = `Go to move # ${move} ${positions[move-1]}`;
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
        <ol>{sortDesc ? moves : moves.reverse()}</ol>
      </div>
      <div className="sort-info">
        <button onClick={handleSort}>
              Sort by: {sortDesc ? "Descending" : "Asending"}
        </button>
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
    let pos = findRowCol(i);
     //setSquares(nextSquares);
     //setXIsNext(!xIsNext);
     onPlay(nextSquares, pos);

  }

  const winnerLine = calculateWinner(squares);
  let status;
  if (winnerLine) {
    status = 'Winner: ' + squares[winnerLine[0]];
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  let ret_val = [];
  for (let i=0;i<9;i++){
      if (i % 3 === 0){
        ret_val.push(<div className="board-row"></div>);
      }
      if (winnerLine && (i === winnerLine[0] || i === winnerLine[1] || i === winnerLine[2])){
        ret_val.push(<Winner value={squares[i]} onSquareClick={() => handleClick(i)} />);
      }
      else {
        ret_val.push(<Square value={squares[i]} onSquareClick={() => handleClick(i)} />);
      }
  }

  return (
    <div>
      <div className="status">{status}</div>
      {ret_val}
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

function Winner({value, onSquareClick}){
  return (
    <button 
      className="square winner-square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
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
      //return squares[a];
      return [a,b,c];
    }
  }
  return null;
}

function findRowCol(square){
  const board = [
    [0,1,2],
    [3,4,5],
    [6,7,8]
  ];

  for (let i in board){
    if (board[i].indexOf(square) >= 0){
      return `(${i},${board[i].indexOf(square)})`;
    }
  }  
}

