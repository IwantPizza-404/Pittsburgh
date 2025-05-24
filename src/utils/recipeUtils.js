export const mapDifficulty = (difficulty) => {
  const map = {
    'Easy': 'Легко',
    'Medium': 'Средняя',
    'Hard': 'Сложно'
  }
  return map[difficulty] || difficulty
} 