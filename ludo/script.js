body {
  font-family: sans-serif;
  text-align: center;
  background: #f9f9f9;
  margin: 0;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.dice-container {
  margin-bottom: 15px;
}

#rollBtn {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

#rollBtn:hover {
  background-color: #388e3c;
}

.dice {
  font-size: 60px;
  margin: 10px auto;
  animation: none;
}

.animate {
  animation: rollDice 0.6s ease-in-out;
}

@keyframes rollDice {
  0%   { transform: rotate(0deg); }
  25%  { transform: rotate(90deg); }
  50%  { transform: rotate(180deg); }
  75%  { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
}

.board {
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(15, 1fr);
  gap: 1px;
  width: 90vmin;
  height: 90vmin;
  margin: auto;
  background-color: #000;
}

.cell {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  border: 1px solid #ccc;
  position: relative;
}

.red-home,
.green-home,
.blue-home,
.yellow-home {
  background-color: #f28b82;
}
.green-home { background-color: #81c995; }
.blue-home { background-color: #aecbfa; }
.yellow-home { background-color: #fff475; }

.center {
  background: conic-gradient(
    red 0deg 90deg,
    yellow 90deg 180deg,
    green 180deg 270deg,
    blue 270deg 360deg
  );
}

.token {
  font-size: 18px;
  position: absolute;
}

/* Responsive */
@media (max-width: 600px) {
  .board {
    width: 95vmin;
    height: 95vmin;
  }

  .cell {
    font-size: 0.6rem;
  }

  .dice {
    font-size: 50px;
  }
}
