// Definimos la funcion square para poder dibujar cada cuadrado del tablero.
export const Square = ({children, isSelected, updateBoard, index}) => {
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
