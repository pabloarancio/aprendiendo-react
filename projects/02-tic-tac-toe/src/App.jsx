import { useState } from "react"
import confetti from "canvas-confetti"
import { TURNS, WINNER_COMBOS } from "./constants"
import { WinnerModal } from "./Componentes/WinnerModal.jsx"
import { Square } from "./Componentes/Square"

const checkWinnerFrom = (boardToCheck) => {
  // revisamos combinaciones ganadoras
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] == boardToCheck[b] && 
      boardToCheck[a] == boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  return null
}

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )  
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) // null es que no hay ganador, false es que hay empate

 

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  } 
  
  const checkEndGame =(newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    // no actualizamoes esta posicion si ya tiene algo
    if (board[index] || winner) return
    // actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // revisar ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)  // empate
    }
  }
  

  return (
    <main className="board">
      <h1>Ta te ti</h1>
      <button onClick={resetGame}>Reset</button>
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

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X} 
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O} 
        </Square>
      </section>
     <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}
      
  


export default App
