/* SCRIPT TO CONTROL THE MODAL */
// Get the modal
var modal = document.getElementById("myForm");

// Get the <span> element that closes the modal
var cancelButton = document.getElementById("cancelButton");

// When the user clicks on <span> (x), close the modal
cancelButton.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//submit data and close modal
function getUserInfo(form){
  var humanName = userForm.userName.value;
  var humanSymbol = userForm.symbol.value;
  var aiSymbol;
   if (humanSymbol == "O") {
    aiSymbol = "X";
   } else { aiSymbol = "O" }
  event.preventDefault();
  modal.style.display = "none";
  human.name = humanName;
  human.symbol = humanSymbol;
  ai.name = "AI";
  ai.symbol = aiSymbol;
  displayPlayers();
  return mode = userForm.difficulty.value;
};

// get modal submit button
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener('click', getUserInfo);

/* SCRIPT TO SET UP & DISPLAY PLAYERS */
// factory function to create players
const CreatePlayer = (name, symbol) => {
  return {name, symbol};
};

let human = CreatePlayer("", "X");
let ai = CreatePlayer("", "O");

// function to display players on grid
function displayPlayers() {
  const humanNameBox = document.getElementById('userNameBox').textContent = human.name;
      const humanSymbolBox = document.getElementById('userSymbolBox').textContent = human.symbol;
          const aiNameBox = document.getElementById('compNameBox').textContent = ai.name;
              const aiSymbolBox = document.getElementById('compSymbolBox').textContent = ai.symbol;
};

/* SCRIPT TO CONTROL STARTING AND RESETTING*/
//Start button
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);
startButton.onclick = function() {
  modal.style.display = "block";
}

const playAgain = document.getElementById('playAgain');
playAgain.addEventListener('click', () => {    
  resetBoard();
});

function resetBoard() {
  startGame();
  messageBoard.textContent = "Click a square to begin";
};

function resetPlayers() {
  human.name = "";
  ai.name = "";
  human.symbol = "";
  ai.symbol = "";
  displayPlayers();
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', () => {    
  resetBoard();
  resetPlayers();  
  messageBoard.textContent = "Press 'Start' to begin";  
});

// *** SCRIPT TO CONTROL GAMEPLAY ***
let mode;

let origBoard;
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

/// variable to hold messageBoard
const messageBoard = document.getElementById('messageBoard');
messageBoard.textContent = "Press 'Start' To Begin";  
//function to create winner message
function messageWin(message) {
       messageBoard.textContent = message; 
       //could add a display-block here
}

// Module pattern that creates board by creating & appending buttons (with classes and ids) to parent container
const createGameBoard = (() => {
  const gameContainer = document.getElementById("gameContainer");
      for (i = 0; i < 9; i++) {
        squ = document.createElement('div');
          squ.classList.add('squ');
            squ.setAttribute('id', i);
                gameContainer.appendChild(squ); 
      }
}
)();

const squares = document.querySelectorAll('.squ');

function startGame(){
  //document.querySelector(".endgame").style.display = "none";
  origBoard = Array.from(Array(9).keys());
  for (let i=0; i < squares.length; i++) {
    squares[i].textContent = '';
    squares[i].style.color = "black";
    squares[i].addEventListener('click', turnClick, false);
  }
}

function turnClick(square) {
  if (typeof origBoard[square.target.id] == 'number') {
    turn(square.target.id, human.symbol)
    if (!checkWin(origBoard, human.symbol) && !checkTie()) {
        if (mode == "hard") {
          setTimeout(function() { 
          turn(bestSpot(), ai.symbol)
        }, 500);
        } else {
          setTimeout(function() { 
          turn(easySpot(), ai.symbol)
        }, 500);
}
  }
}
}

//
// TO ADD function for computer 'easy' (random) play
//function for computer play
function easySpot() {
  let randomNumber = Math.random();
    if (randomNumber < 0.11 && origBoard[0] != 'O' && origBoard[0] != 'X') {
      return 0;
    } if (randomNumber < 0.22 && origBoard[1] != 'O' && origBoard[1] != 'X') {
      return 1;
    } if (randomNumber < 0.33 && origBoard[2] != 'O' && origBoard[2] != 'X') {
      return 2;
    } if (randomNumber < 0.44 && origBoard[3] != 'O' && origBoard[3] != 'X') {
      return 3;
    } if (randomNumber < 0.55 && origBoard[4] != 'O' && origBoard[4] != 'X') {
      return 4;
    } if (randomNumber < 0.66 && origBoard[5] != 'O' && origBoard[5] != 'X') {
      return 5;
    } if (randomNumber < 0.77 && origBoard[6] != 'O' && origBoard[6] != 'X') {
      return 6;
    } if (randomNumber < 0.88 && origBoard[7] != 'O' && origBoard[7] != 'X') {
      return 7;
    } if (randomNumber < 0.99 && origBoard[8] != 'O' && origBoard[8] != 'X') {
      return 8;
    } else {
      let availSpots = emptySquares();
      console.log(availSpots);
      return availSpots[0];
      }
}

function turn(squareID, player) {
    origBoard[squareID] = player;
    document.getElementById(squareID).textContent = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
}

//once have it working - see if can edit this to check understanding
function checkWin(board, player) {
  let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.color =
      gameWon.player == human.symbol ? "blue" : "red";
  }
  for (let i = 0; i < squares.length; i++) {
    squares[i].removeEventListener('click', turnClick, false);
  }
  messageWin(gameWon.player == human.symbol ? "You win!" : "You Lose.");
}

//look into the below - not sure I totally understand how this works
function emptySquares() {
  return origBoard.filter(s => typeof s == "number");
}

function bestSpot() {
  return minimax(origBoard, ai.symbol).index;
}

function checkTie() {
  if (emptySquares().length == 0) {
    for (let i = 0; i < squares.length; i++) {
      //squares[i].style.backgroundColor = "green";
      squares[i].removeEventListener("click", turnClick, false);
    }
    messageWin("Tie Game!")
    return true;
  }
  return false;
}

function minimax(newBoard, player) {
  let availSpots = emptySquares();

  if (checkWin(newBoard, human.symbol)) {
    return {score: -10};
  } else if (checkWin(newBoard, ai.symbol)) {
    return {score: 10};
  } else if (availSpots.length === 0) {
    return {score: 0};
  }
 
  let moves = [];
  for (let i = 0; i <availSpots.length; i++) {
    let move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == ai.symbol) {
        let result = minimax(newBoard, human.symbol);
        move.score = result.score;
    } else {
        let result = minimax(newBoard, ai.symbol);
        move.score = result.score
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  let bestMove;
  if(player === ai.symbol) {
    let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
  } else {
    let bestScore = 10000;
    for(let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}