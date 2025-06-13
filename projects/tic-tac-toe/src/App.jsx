import { useState } from 'react'
import confetti from 'canvas-confetti'


const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}


const TURNS = {
  X: 'X',
  O: 'O',
}

const WINNER = {
  noWinner: null,
  draw: false,
  winner: 'x' || 'o',
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    )
      return boardToCheck[a]
  }

  return null
}

const checkEndGame = (boardToCheck) => {
  return boardToCheck.every((square) => square !== null)
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(WINNER.noWinner)

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(WINNER.draw)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(WINNER.noWinner)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
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

      {
        winner != WINNER.noWinner &&
        <div className='winner'>
          <div className='text'>
            <h2>
              {
                winner === WINNER.draw ? 'Draw' : `Winner:`
              }
            </h2>

            <header className='win'>
              {
                winner && <Square>{winner}</Square>
              }
            </header>

            <footer>
              <button onClick={resetGame}>Reset Game</button>
            </footer>
          </div>
        </div>
      }

      <button onClick={resetGame}>Reset Game</button>
    </main>
  )
}

export default App
