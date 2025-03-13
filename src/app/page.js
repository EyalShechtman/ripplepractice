"use client";
import Image from "next/image";
import { useState } from "react";



export default function Home() {

  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null); 
  const [isDraw, setIsDraw] = useState(false);



  const onClickHandler = (index) => {
    if (board[index] !== "" || checkWinner() ) return;
    console.log(index);
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const winner = checkWinner();
    if(winner){
      alert(winner + 'wins');
      return;
    }

    setTurn(turn === 'X' ? 'O' : 'X');
  }

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setTurn('X');
    setWinner(null);
  }

  const checkWinner = () => {
    const winningConditions = [
      [1,2,3],
      [4,5,6],
      [7,8,9],
      [1,4,7],
      [2,5,8],
      [3,6,9],
      [1,5,9],
      [3,5,7]
    ]
    for (let i = 0; i< winningConditions.length; i++) {
      const [a,b,c] = winningConditions[i].map(x => x -1);
      console.log(board[a], board[b], board[c]);

      if (board[a] === board[b] && board[a] === board[c] && board[a] !== "") {
        setWinner(board[a]);
        return board[a];
      }
    }
    return null;
  };


  return (
    <div>
      <h1 style={{justifyContent: 'center', display: 'flex', fontSize: '48px'}}><strong>TicTacToe</strong></h1>

      <div style={{justifyContent: 'center', display: 'flex', fontSize: '24px', margin: 'auto'}}>
        its {turn} turn
      </div>

      <div style={{ justifyContent: "center", display: "flex", fontSize: "24px", margin: "auto" }}>
        {winner ?`🎉 ${winner} wins!` : isDraw ? "It's a draw!" : ""}
      </div>


      <div 
      className="board"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px',
        width: '300px',
        margin: 'auto'
      }}>
        {board.map((cell, index) => (
          <div
          key={index}
          onClick={() => {onClickHandler(index)}}

          style={{
            backgroundColor: 'white',
            height: '100px',
            width: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2rem',
            cursor: 'pointer',
            border: '2px solid black'
          }}>
            {cell}
          </div>
        ))}


      </div>
      <div>
        <button onClick={resetGame} style={{backgroundColor: 'white', margin: 'auto', width: '100%'}}>Reset Game</button>
      </div>

    </div>);
}
