//Stores the gameboard as an array inside Gameboard object
let gameBoard = {
  squ1: "",
  squ2: "",
  squ3: "",
  squ4: "",
  squ5: "",
  squ6: "",
  squ7: "",
  squ8: "",
  squ9: ""
};

// Module pattern that creates board by creating & appending buttons (with classes and ids) to parent container,
const createGameBoard = (() => {
  const gameContainer = document.getElementById("gameContainer");
  for (i = 0; i < 9; i++) {
    const squ = document.createElement('button');
    squ.classList.add('squ');
    squ.setAttribute('id', 'squ' + (i+1));
    gameContainer.appendChild(squ);
  }
    // ID's each square
for (i=1; i<10; i++) {
    document.getElementById('squ'[i]);
}; 
}
  )();

//function to add game object to game board
//******* ask for help on this, must be more efficient way
function addToGameBoard() {
  squ1.textContent = gameBoard.squ1;
  squ2.textContent = gameBoard.squ2;
  squ3.textContent = gameBoard.squ3;
  squ4.textContent = gameBoard.squ4;
  squ5.textContent = gameBoard.squ5;
  squ6.textContent = gameBoard.squ6;
  squ7.textContent = gameBoard.squ7;
  squ8.textContent = gameBoard.squ8;
  squ9.textContent = gameBoard.squ9;
};

/*
Possible alternative - did not work
function addToGameBoard() {
  for (i=1; i<10; i++) {
    'squ'[i].textContent = gameBoard.squ+i;
  }; 
};
*/

// factory function to create players
const CreatePlayer = (name, symbol, score) => {
    return {name, symbol, score};
};

// Variables for controlling the modal form
// variable to contain the modal form
var modal = document.getElementById("myForm");
// variable to get the button that closes the modal
var cancelButton = document.getElementById("cancelButton");
// When the user clicks on cancel, close the modal
cancelButton.onclick = function() {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// function to display players on grid
function displayPlayers() {
  const userNameBox = document.getElementById('userNameBox');
    userNameBox.textContent = user.name;
  const userSymbolBox = document.getElementById('userSymbolBox');
    userSymbolBox.textContent = user.symbol;
  const compNameBox = document.getElementById('compNameBox');
    compNameBox.textContent = computer.name;
  const compSymbolBox = document.getElementById('compSymbolBox');
    compSymbolBox.textContent = computer.symbol;
};

//variables to create players
let user = CreatePlayer("", "", "");
let computer = CreatePlayer("", "", "");

//Function to submit data and close modal
function getUserName(form){
  var userName = userForm.userName.value;
  var userSymbol = userForm.symbol.value;
  var computerSymbol;
    if (userName == "") {
    userName = 'User';
    }
    if (userSymbol == "") {
    userSymbol = 'X';
    }
   if (userSymbol == "O") {
   computerSymbol = "X";
   } else { computerSymbol = "O" }
  event.preventDefault();
  modal.style.display = "none";
  user.name = userName;
  user.symbol = userSymbol;
  computer.name = "Computer";
  computer.symbol = computerSymbol;
  displayPlayers();
};

// variable to identify submit button, and event listener to action getting info from form
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener('click', () => {    
  getUserName();
  blankName();
  blankSymbol();  
});

//Function to reset colors after resetting game
//**** ask for help as must be a way of looping this
function resetsquColors(){
  squ1.style.color = "black";
  squ2.style.color = "black";
  squ3.style.color = "black";
  squ4.style.color = "black";
  squ5.style.color = "black";
  squ6.style.color = "black";
  squ7.style.color = "black";
  squ8.style.color = "black";
  squ9.style.color = "black";
};
/* 
*************
Ask for help - same issue as before, have tried writing squ[i] lots of different ways and IDing again
function resetsquColors(){
  for (i=1; i<10; i++) {
    document.getElementById('squ'[i]);
    'squ'[i].style.color = "black";
}  
};
*/

//function to reset the board by setting object key values to "",
//showing these on the squs, and resetting squ colors
function resetBoard() {
  var i;
  for (i in gameBoard) {
    gameBoard[i] = "";
  }
  addToGameBoard();
  resetsquColors();
  messageBoard.textContent = "Press 'start' to play again.";
};

//function to reset the players and show on grid
function resetPlayers() {
  user.name = "";
  computer.name = "";
  user.symbol = "";
  computer.symbol = "";
  displayPlayers();
};

//identifying reset button and adding event listeners to reset board & players
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', () => {    
  resetBoard();
  resetPlayers();    
});

//function for computer play - see if more efficient way of doing this when developing AI
// ********************
computerPlay = () => {
  let randomNumber = Math.random();
    if (randomNumber < 0.11 && gameBoard.squ1 === "") {
      gameBoard.squ1 = computer.symbol;
    } else if (randomNumber < 0.22 && gameBoard.squ2 === "") {
      gameBoard.squ2 = computer.symbol;
    } else if (randomNumber < 0.33 && gameBoard.squ3 === "") {
      gameBoard.squ3 = computer.symbol;
    } else if (randomNumber < 0.44 && gameBoard.squ4 === "") {
      gameBoard.squ4 = computer.symbol;
    } else if (randomNumber < 0.55 && gameBoard.squ5 === "") {
      gameBoard.squ5 = computer.symbol;
    }else if (randomNumber < 0.66 && gameBoard.squ6 === "") {
      gameBoard.squ6 = computer.symbol;
    } else if (randomNumber < 0.77 && gameBoard.squ7 === "") {
      gameBoard.squ7 = computer.symbol;
    } else if (randomNumber < 0.88 && gameBoard.squ8 === "") {
      gameBoard.squ8 = computer.symbol;
    } else if (randomNumber < 0.99 && gameBoard.squ9 === "") {
      gameBoard.squ9 = computer.symbol;

} else {
  return false;
}
      addToGameBoard();
}

/// variable to hold messageBoard
const messageBoard = document.getElementById('messageBoard');

function messageWin(winner) {
       messageBoard.textContent = "the winner is" + " " + winner; 
}

function redSquares(a, b, c) {
  a.style.color = "red";
  b.style.color = "red";
  c.style.color = "red";
}

// function to see who wins - see if more efficient way of doing this
//to array, array combos
function whoWins() {
  var a = gameBoard.squ1; var b = gameBoard.squ2; var c = gameBoard.squ3;
  var d = gameBoard.squ4; var e = gameBoard.squ5; var f = gameBoard.squ6;
  var g = gameBoard.squ7; var h = gameBoard.squ8; var i = gameBoard.squ9;
  if (a !== "" && a === b && a === c) {
      redSquares(squ1, squ2, squ3);
      messageWin(a); 
  } else if (d !== "" && d === e && d === f) {
      redSquares(squ4, squ5, squ6);
      messageWin(d);
  } else if (g !== "" && g === h && g ===i) {
      redSquares(squ7, squ8, squ9);
      messageWin(g);
  } else if (a !== "" && a === d && a === g) {
      redSquares(squ1, squ4, squ7);
      messageWin(a);
  } else if (b !== "" && b === e && b ===h) {
      redSquares(squ2, squ5, squ8);
      messageWin(b);
  } else if (c !== "" && c === f && c === i) {
      redSquares(squ3, squ6, squ9);
      messageWin(c);
  } else if (a !== "" && a === e && a === i) {
      redSquares(squ1, squ5, squ9);
      messageWin(a);
  } else if (c !== "" && c === e && c === g) {
      redSquares(squ3, squ5, squ7);
      messageWin(c);
  } else if (a !== "" && b !== "" && c !== "" && d !== "" && e !== "" && f !== "" && g !== "" &&
  h !== "" && i !== "") {
    messageBoard.textContent = "Oh! It's a tie...";
  } else {
    return false;
  }
}

//function to end the game - see if better way of doing this
function endGame() {
  squ1.removeEventListener('click', squOneClick);
  squ2.removeEventListener('click', squTwoClick);
  squ3.removeEventListener('click', squThreeClick);
  squ4.removeEventListener('click', squFourClick);
  squ5.removeEventListener('click', squFiveClick);
  squ6.removeEventListener('click', squSixClick);
  squ7.removeEventListener('click', squSevenClick);
  squ8.removeEventListener('click', squEightClick);
  squ9.removeEventListener('click', squNineClick);
}

//function to test if user has one, if not play computer,then check if computer has won
function playGame() {
  whoWins();
  if (whoWins() !=false) {
  endGame();
  } else {
    setTimeout(function() {
      computerPlay();
      whoWins()
    }, 500);
  }
  };

//message if click on taken square
let emptysqu = "Please pick an empty square";

// Functions to be activated by event listeners on squares. Adds user input to game board, then activates playGame
//alerts if try to pick a taken square
//feels v inefficient - see next note below
function squOneClick() {  
  if (gameBoard.squ1 === "") {
    gameBoard.squ1 = user.symbol;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squTwoClick() {  
  if (gameBoard.squ2 === "") {
    gameBoard.squ2 = user.symbol;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squThreeClick() {  
  if (gameBoard.squ3 === "") {
    gameBoard.squ3 = user.symbol;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squFourClick() {  
  if (gameBoard.squ4 === "") {
    gameBoard.squ4 = user.symbol;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squFiveClick() {  
  if (gameBoard.squ5 === "") {
    gameBoard.squ5 = user.symbol;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squSixClick() {  
  if (gameBoard.squ6 === "") {
    gameBoard.squ6 = user.symbol;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squSevenClick() {  
  if (gameBoard.squ7 === "") {
    gameBoard.squ7 = user.symbol;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squEightClick() {  
  if (gameBoard.squ8 === "") {
    gameBoard.squ8 = user.symbol;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squNineClick() {  
  if (gameBoard.squ9 === "") {
    gameBoard.squ9 = user.symbol;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

/* functions for event listeners.
Find another way - his feels extremely inefficient, but i couldn't
work out how to have one function that allows for alternative gameBoard.squs.
The below did not work
  squ.addEventListener('click', () => {
  console.log([i + 1]);
}); */
function userPlay() {
messageBoard.textContent = "Go on, click a square!";
squ1.addEventListener('click', squOneClick);
squ2.addEventListener('click', squTwoClick);
squ3.addEventListener('click', squThreeClick);
squ4.addEventListener('click', squFourClick);
squ5.addEventListener('click', squFiveClick);
squ6.addEventListener('click', squSixClick);
squ7.addEventListener('click', squSevenClick);
squ8.addEventListener('click', squEightClick);
squ9.addEventListener('click', squNineClick);

};

//Start button
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', userPlay);

// When the user clicks on the button, open the modal
startButton.onclick = function() {
  modal.style.display = "block";
}

const playAgain = document.getElementById('playAgain');
playAgain.addEventListener('click', () => {    
  resetBoard();
  userPlay();    
});