const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const cellIndex = event.target.getAttribute('data-cell');
  if (boardState[cellIndex] || !gameActive) return;

  boardState[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    gameActive = false;
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    return;
  }

  if (!boardState.includes('')) {
    gameActive = false;
    statusDisplay.textContent = "It's a tie!";
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}

function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.textContent = `Current Player: ${currentPlayer}`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
