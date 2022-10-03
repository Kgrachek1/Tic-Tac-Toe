c// Const //
const PLAYERS = {
  '-1': 'red',
  '1': 'cyan',
  'null': 'white'
};


const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board, turn, winner;
const message = document.querySelector('h2');
const playAgainBtn = document.querySelector('button');
document.getElementById('board').addEventListener('click', handleMove);
playAgainBtn.addEventListener('click', initialize);

initialize();

function initialize() {
   board = new Array(9).fill(null);
  turn = 1;
  winner = null;
  render();
}

function handleMove(evt) {
  const idx = parseInt(evt.target.id.replace('c-', ''));
  if (
    isNaN(idx) ||
    board[idx] ||
    winner
  ) return;
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function getWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
  }

  if (board.includes(null)) return null;
  return 'T';
}

function render() {
  renderBoard();
  renderMessage();

  playAgainBtn.disabled = !winner;
}

function renderBoard() {
  board.forEach(function(sqVal, idx) {
    const squareEl = document.getElementById(`c-${idx}`);
    squareEl.style.backgroundColor = PLAYERS[sqVal];
    
    squareEl.className = !sqVal ? 'avail' : '';
  });
}

function renderMessage() {
  if (winner === 'T') {
    message.innerHTML = 'Tied try harder';
  } else if (winner) {
    message.innerHTML = `Killing it <span style="color: ${PLAYERS[winner]}">${PLAYERS[winner].toUpperCase()}</span>!`;
  } else {
    message.innerHTML = `<span style="color: ${PLAYERS[turn]}">${PLAYERS[turn].toUpperCase()}</span> Turn`;
  }
}
