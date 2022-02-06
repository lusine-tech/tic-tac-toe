window.addEventListener('DOMContentLoaded', () => {

const displayPlayer = document.querySelector(".display");
const cells = Array.from(document.querySelectorAll(".cell"));
const restartButton = document.querySelector("#restart");
const announcer = document.querySelector(".announcer");

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let currentPlayer = "X";

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

 const playerXWinner = "Player X is the winner";
 const playerOWinner = "Player O is the winner";
 const equal = "equal";

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === "X" ? playerXWinner : playerOWinner);
    gameActive = false;
      return;
    }

    if (!board.includes("")) announce(equal);
  }
  const announce = (type) => {
    switch (type) {
      case playerOWinner:
        announcer.innerHTML = 'Player <span class="playerO">O</span> is the winner';
        break;
      case playerXWinner:
        announcer.innerHTML = 'Player <span class="playerX">X</span> is the winner';
                break;
       case equal:
        announcer.innerHTML = "equal";
       
    }
    announcer.classList.remove("hidden");
  };

  const isValidAction = (cell) => {
    if (cell.innerText === "X" || cell.innerText === "O") {
      return false;
    }

    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const changePlayer = () => {
    displayPlayer.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    displayPlayer.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  const userAction = (cell, index) => {
    if (isValidAction(cell) && gameActive) {
      cell.innerText = currentPlayer;
      cell.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    announcer.classList.add("hidden");

    if (currentPlayer === "O") {
      changePlayer();
    }

    

    cells.forEach((cell) => {
      cell.innerText = "";
      cell.classList.remove("playerX");
      cell.classList.remove("playerO");
    });
  };

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => userAction(cell, index));
  });

  restartButton.addEventListener("click", resetBoard);

})