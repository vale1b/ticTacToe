import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}

// Definimos la funcion square para poder dibujar cada cuadrado del tablero.
const Square = ({children, isSelected, updateBoard, index}) => {
  // Hacemos una clase condicional, se agregara la is-selected solo si isSelected es correcto.
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

// Creamos un array con todas las combinaciones ganadoras.
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// Creamos el componente principal que renderizara nuestro tablero.
function App() {

  // Usamos el hook useState para poder actualizar el tablero, el hook recibe como parametro un array de 9 posiciones con valores nulos en sus posiciones.
  const [board, setBoard] = useState(Array(9).fill(null))

  // Usamos el hook useState para poder cambiar el turno del jugador, el hook recibe como paramentro el valor inicial que seria la letra X.
  const [turn, setTurn] = useState(TURNS.X)

  // Null es que no hay ganador, flase es que hay un empate y true es que algun jugador a ganado el juego.
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {

    //Revisamos todas las combinaciones ganadoras para ver si X u O gano.
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && // a => x u o
        boardToCheck[a] === boardToCheck[b] && // si B es igual a A 
        boardToCheck[a] === boardToCheck[c] // si C es igual a A quiere decir que tenemos un tres en raya.
      ) {
        return boardToCheck[a] // Esto indicara quien ha ganado el juego.
      }
    }

    // Si no hay ganador.
    return null
  }

  // Reseteamos el juego a su estado inicial.
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {

    // Revisamos si hay empate, si no hay mas espacios vacios en el tablero.
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    // No actualizar la posicion si ya tiene algo o cuando haya un ganador.
    if (board[index] || winner) return

    // Actualizamos el tablero para poder renderizar la X o la O dependiendo del turno.
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // newTurn sirve para cambiar el turno del jugador, si el turno esta en la X el proximo ser la O.
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Revisar si hay ganador.
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // Empate
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
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
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false
                    ? 'Empate'
                    : 'Gano:'
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }

    </main>
  )
}

export default App
