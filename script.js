const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const newGameButton = document.getElementById('newGameButton');
const winningScreen = document.getElementById('winningScreen');
const winningMessage = document.getElementById('winningMessage');

let currentPlayer = 'X';

startGame();

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove('X', 'O');
    cell.textContent = ''; // Clearing text content
    cell.removeAttribute('data-player'); // Clear data-player attribute
    cell.removeEventListener('click', handleCellClick);
    cell.addEventListener('click', handleCellClick, { once: true });
  });
  winningScreen.classList.add('hidden');
}

function handleCellClick(event) {
  const cell = event.target;
  placeMark(cell, currentPlayer);
  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessage.textContent = 'Draw!';
    winningScreen.style.background = 'linear-gradient(135deg, #555 0%, #999 100%)'; // Grey for draw
  } else {
    winningMessage.textContent = `${currentPlayer} Wins!`;
    winningScreen.style.background = currentPlayer === 'X' ? 
      'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)' : // Green gradient for X
      'linear-gradient(135deg, #f44336 0%, #ff9068 100%)';  // Red gradient for O
  }
  winningScreen.classList.remove('hidden');
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.setAttribute('data-player', currentClass); // Set X or O as per current player
  cell.textContent = currentClass; // Display X or O
}

function swapTurns() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(currentPlayer) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent);
}

newGameButton.addEventListener('click', startGame);
