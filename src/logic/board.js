import { WINNER_COMBOS } from '../constants.js' // Importamos la constante de todas combinaciones ganadoras.

export const checkWinnerFrom = (boardToCheck) => {

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


export const checkEndGame = (newBoard) => {

    // Revisamos si hay empate, si no hay mas espacios vacios en el tablero.
    return newBoard.every((square) => square !== null)
  }