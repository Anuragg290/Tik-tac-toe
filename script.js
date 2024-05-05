let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning Pattern Array
const winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true; // Player 'X' plays first
let board = Array(9).fill(''); // Initialize the board with empty strings
let isGameOver = false;

// Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
};

// Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide");
  isGameOver = false;
  board.fill(''); // Reset the board
};

// This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter === "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

// Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

// New Game
newgameBtn.addEventListener("click", enableButtons);

// Restart
restartBtn.addEventListener("click", enableButtons);

// Win Logic
const winChecker = () => {
  // Loop through all win patterns
  for (let pattern of winningPattern) {
    const [a, b, c] = pattern;
    if (
      board[a] !== '' &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      winFunction(board[a]);
      isGameOver = true;
      return;
    }
  }

  // Check for a draw
  if (!board.includes('') && !isGameOver) {
    drawFunction();
  }
};

// Display X/O on click
btnRef.forEach((element, index) => {
  element.addEventListener("click", () => {
    if (!isGameOver && board[index] === '') {
      board[index] = xTurn ? 'X' : 'O';
      element.innerText = board[index];
      element.disabled = true;
      xTurn = !xTurn;
      winChecker();
    }
  });
});

// Enable Buttons and disable popup on page load
enableButtons();