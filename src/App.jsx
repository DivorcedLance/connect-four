import { useState } from 'react';

import { Square } from './components/Square.jsx';
import { WinnerModal } from './components/WinnerModal.jsx';

import { TURNS } from './constants.js';
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { saveGameToStorage, resetGameStorage } from './logic/storage.js'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(42).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem('winner')
    return JSON.parse(winnerFromStorage) ?? null
  })

  const resetGame = () => {
    setBoard(Array(42).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage();
  }

  const updateBoard = (index) => {
    if (winner) return

    const newBoard = [...board];

    let targetIndex = null;
    
    let col = index % 7;
    for (let i = 5; i >= 0; i--) {
      if (!newBoard[col + i * 7]) {
        targetIndex = col + i * 7;
        break;
      }
    }

    if (targetIndex === null) return
    
    newBoard[targetIndex] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard, targetIndex)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(board)) {
      setWinner(false) // empate
    }

    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
      winner: newWinner
    })
  };

  return (
    <main className="board">
      <h1>Connect Four</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square 
                key={index} 
                index={index} 
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
