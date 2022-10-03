// CONSTANTS //
const PLAYERS = {
  '1': 'X',
  '-1': 'O', 
  'null': ''
};
// 2d array //
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
// THE BOARD //
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
  for (let i = 0; i < WINNING_COMBOS.length; i++) {
    if (Math.abs(board[WINNING_COMBOS[i][0]] + board[WINNING_COMBOS[i][1]] + board[WINNING_COMBOS[i][2]]) === 3) return board[WINNING_COMBOS[i][0]];
  }

  if (board.includes(null)) return null;
  return 'Tie';
}
// reset //
function render() {
  renderBoard();
  renderMessage();

  playAgainBtn.disabled = !winner;
}

function renderBoard() {
  board.forEach(function(sqVal, idx) {
    const squareEl = document.getElementById(`c-${idx}`);
    squareEl.innerHTML = PLAYERS[sqVal];
    
    squareEl.className = !sqVal ? 'avail' : '';
  });
}
// message //
function renderMessage() {
  if (winner === 'Tie') {
    message.innerHTML = 'Tied try harder';
  } else if (winner) {
    message.innerHTML = `Crushing it <span style="color: ${PLAYERS[winner]}">${PLAYERS[winner].toUpperCase()}</span>!`;
  } else {
    message.innerHTML = `<span style="color: ${PLAYERS[turn]}">${PLAYERS[turn].toUpperCase()}</span> Turn`;
  }
}

