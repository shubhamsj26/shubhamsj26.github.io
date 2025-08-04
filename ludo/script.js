let currentPlayer = "Red";
let diceValue = 0;
let redPosition = 0;
let bluePosition = 0;

const rollDiceBtn = document.getElementById("rollDiceBtn");
const diceValueSpan = document.getElementById("diceValue");
const currentPlayerSpan = document.getElementById("currentPlayer");
const diceEl = document.getElementById("dice");

rollDiceBtn.addEventListener("click", () => {
  diceEl.classList.add("rolling");
  setTimeout(() => {
    diceValue = Math.floor(Math.random() * 6) + 1;
    diceValueSpan.textContent = diceValue;
    diceEl.textContent = getDiceFace(diceValue);

    moveToken(currentPlayer, diceValue);

    currentPlayer = currentPlayer === "Red" ? "Blue" : "Red";
    currentPlayerSpan.textContent = currentPlayer;

    diceEl.classList.remove("rolling");
  }, 300);
});

function getDiceFace(value) {
  const diceFaces = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  return diceFaces[value];
}

function moveToken(player, value) {
  let pos, newPos;

  if (player === "Red") {
    pos = redPosition;
    newPos = Math.min(pos + value, 3);
    redPosition = newPos;
  } else {
    pos = bluePosition;
    newPos = Math.min(pos + value, 6);
    bluePosition = newPos;
  }

  resetBoard();

  if (player === "Red" && redPosition < 4) {
    document.getElementById("cell" + (redPosition + 1)).textContent = "🔴";
  } else if (player === "Red") {
    document.getElementById("finish-red").textContent = "🔴🏁";
    alert("Red wins!");
    rollDiceBtn.disabled = true;
  }

  if (player === "Blue" && bluePosition > 3 && bluePosition < 7) {
    document.getElementById("cell" + (bluePosition + 1)).textContent = "🔵";
  } else if (player === "Blue" && bluePosition >= 6) {
    document.getElementById("finish-blue").textContent = "🔵🏁";
    alert("Blue wins!");
    rollDiceBtn.disabled = true;
  }
}

function resetBoard() {
  for (let i = 1; i <= 6; i++) {
    const cell = document.getElementById("cell" + i);
    if (cell) cell.textContent = "";
  }
}
