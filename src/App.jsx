import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import confetti from 'canvas-confetti' // Importamos la animacion de tirar confetti en caso de que haya un ganador.

import { Square } from './components/Square.jsx' // Importamos el componente Square que renderizara nuestro tablero.
import { TURNS } from './constants.js' // Importamos las constantes de los turnos y de la combinaciones ganadoras.
import { checkWinnerFrom, checkEndGame } from './logic/board.js' // Importamos la logica del juego.
import { Winner } from './components/Winner.jsx'

// Creamos el componente principal que renderizara nuestro tablero.
function App() {

  // Usamos el hook useState para poder actualizar el tablero, el hook recibe como parametro un array de 9 posiciones con valores nulos en sus posiciones.
  // Utilizamos localStorage para guardar la partida.
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  // Usamos el hook useState para poder cambiar el turno del jugador, el hook recibe como paramentro el valor inicial que seria la letra X.
  // Utilizamos localStorage para guardar el turno del jugador.
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // Null es que no hay ganador, flase es que hay un empate y true es que algun jugador a ganado el juego.
  const [winner, setWinner] = useState(null)

  // Reseteamos el juego a su estado inicial.
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
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

    // Guardar aqui partida.
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', turn)

    // Revisar si hay ganador.
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti()
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
      
      <Winner resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
