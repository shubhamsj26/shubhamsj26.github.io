const board = document.getElementById("board");
const diceEl = document.getElementById("dice");
const turnEl = document.getElementById("turn");
const rollBtn = document.getElementById("rollBtn");

let cells = [];
let positions = [0, 0]; // Index 0 = Player 1, Index 1 = Player 2
let currentPlayer = 0;

// Create 15x15 board (225 cells)
for (let i = 0; i < 225; i++) {
  const div = document.createElement("div");
  div.classList.add("cell");
  board.appendChild(div);
  cells.push(div);
}

function updateBoard() {
  cells.forEach(cell => {
    cell.className = "cell";
    cell.textContent = "";
  });

  if (positions[0] < 225) {
    cells[positions[0]].classList.add("player1");
    cells[positions[0]].textContent = "1";
  }
  if (positions[1] < 225) {
    cells[positions[1]].classList.add("player2");
    cells[positions[1]].textContent = "2";
  }
}

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceEl.textContent = roll;

  positions[currentPlayer] += roll;

  if (positions[currentPlayer] >= 224) {
    alert(`Player ${currentPlayer + 1} wins! 🎉`);
    positions = [0, 0];
  }

  updateBoard();
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  turnEl.textContent = `Player ${currentPlayer + 1}`;
}

rollBtn.addEventListener("click", rollDice);
updateBoard();
