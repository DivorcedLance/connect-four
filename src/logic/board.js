const WINNER_COMBOS = [

  [0, 1, 2, 3],
  [-1, 0, 1, 2],
  [-2, -1, 0, 1],
  [-3, -2, -1, 0],
  [0, 7, 14, 21],
  [-7, 0, 7, 14],
  [-14, -7, 0, 7],
  [-21, -14, -7, 0],
  [0, 8, 16, 24],
  [-8, 0, 8, 16],
  [-16, -8, 0, 8],
  [-24, -16, -8, 0],
  [0, 6, 12, 18],
  [-6, 0, 6, 12],
  [-12, -6, 0, 6],
  [-18, -12, -6, 0],
]

export const checkWinnerFrom = (boardToCheck, targetIndex) => {
  
  const targetTurn = boardToCheck[targetIndex]

  const isWinner = WINNER_COMBOS.some((combo) => {
    return combo.every((index) => {
      return boardToCheck[targetIndex + index] === targetTurn
    })
  })
  if (isWinner) {
    return targetTurn
  }

  // si no hay ganador
  return null
}

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}