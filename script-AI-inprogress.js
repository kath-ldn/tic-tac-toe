// Stores the gameboard as an array
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let AI = "O";
let human = "X";

// Module pattern that creates board by creating & appending buttons (with classes and ids) to parent container
const createGameBoard = (() => {
  const gameContainer = document.getElementById("gameContainer");
    for (i = 0; i < gameBoard.length; i++) {
        const squ = document.createElement('button');
        squ.classList.add('squ');
        squ.setAttribute('id', 'squ' + i);
        gameContainer.appendChild(squ);
    }
  for (i = 0; i < gameBoard.length; i++) {
    document.getElementById('squ' + i);
  }
}
  )();

//function to add contents of gameBoard array to game board
function addToGameBoard() {
    squ0.textContent = gameBoard[0];    
    squ1.textContent = gameBoard[1];
    squ2.textContent = gameBoard[2];
    squ3.textContent = gameBoard[3];
    squ4.textContent = gameBoard[4];
    squ5.textContent = gameBoard[5];
    squ6.textContent = gameBoard[6];
    squ7.textContent = gameBoard[7];
    squ8.textContent = gameBoard[8];
};
addToGameBoard();

// factory function to create players
const CreatePlayer = (name, symbol) => {
    return {name, symbol};
};

//variables to create players
let user = CreatePlayer("Test", "X");
let computer = CreatePlayer("AI", "O");

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
displayPlayers();

//function to highlight winning squares [ NOT CURRENTLY INVOKED ANYWHERE - TO AMEND]
function redSquares(a, b, c) {
    a.style.color = "red";
    b.style.color = "red";
    c.style.color = "red";
  }

//function to end the game - see if better way of doing this [ NOT CURRENTLY INVOKED ANYWHERE - TO AMEND]
function endGame() {
    squ0.removeEventListener('click', squOneClick);
    squ1.removeEventListener('click', squTwoClick);
    squ2.removeEventListener('click', squThreeClick);
    squ3.removeEventListener('click', squFourClick);
    squ4.removeEventListener('click', squFiveClick);
    squ5.removeEventListener('click', squSixClick);
    squ6.removeEventListener('click', squSevenClick);
    squ7.removeEventListener('click', squEightClick);
    squ8.removeEventListener('click', squNineClick);
  }

//functions to assess winning combos
function equals3(a, b, c) {
    return a === b && b === c && a !== "";
}

function checkWinner(){
    let winner = null;

    if (equals3(gameBoard[0], gameBoard[1], gameBoard[2])) {
        winner = gameBoard[0];
    };
    if (equals3(gameBoard[3], gameBoard[4], gameBoard[5])) {
        winner = gameBoard[3];
    };
    if (equals3(gameBoard[6], gameBoard[7], gameBoard[8])) {
        winner = gameBoard[6];
    };
    if (equals3(gameBoard[0], gameBoard[3], gameBoard[6])) {
        winner = gameBoard[0];
    };
    if (equals3(gameBoard[1], gameBoard[4], gameBoard[7])) {
        winner = gameBoard[1];
    };
    if (equals3(gameBoard[2], gameBoard[5], gameBoard[8])) {
        winner = gameBoard[0];
    };
    if (equals3(gameBoard[0], gameBoard[4], gameBoard[8])) {
        winner = gameBoard[0];
    };
    if (equals3(gameBoard[2], gameBoard[4], gameBoard[6])) {
        winner = gameBoard[2];
    };

    let openSpots = 0;
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === "") {
            openSpots = openSpots + 1;
        };
    };

    if (winner === null && openSpots === 0) {
        return 'tie';
    } else {
        return winner;
    };
};

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

//function to create impossible-to-beat AI using minimax algorithm
function bestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === "") {
        gameBoard[i] = AI;
        let score = minimax(gameBoard, 0, false);
        gameBoard[i] = "";
        if (score > bestScore) {
        bestScore = score;
        move = i;
        }
      }    
    }
    gameBoard[move] = AI;
};

//minimax function
function minimax(gameBoard, depth, isMaximizing){
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === "") {
        gameBoard[i] = AI;
        let score = minimax(gameBoard, depth + 1, false);
        gameBoard[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === "") {
        gameBoard[i] = human;
        let score = minimax(gameBoard, depth + 1, true);
        gameBoard[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

/// variable to hold messageBoard
const messageBoard = document.getElementById('messageBoard');
//function to create winner message
function messageWin(winner) {
       messageBoard.textContent = "the winner is" + " " + winner; 
}
//function to display winner message and end game
function displayWinner() {
    let winner = checkWinner();
if (winner!= null) {
    messageWin(winner);
    endGame();
  }
};

function AIMove() {
    bestMove();
    addToGameBoard();
};

//function to test if user has one, if not play computer,then check if computer has won
function playGame() {
    let winner = checkWinner();
  if (winner != null) {
    displayWinner();
  } else {
    setTimeout(function() {
      AIMove();
      displayWinner();
    }, 500);
  }
  };

//message if click on taken
let emptysqu = "Please pick an empty square";

// Functions to be activated by event listeners on squares. Adds user input to game board, then activates playGame
//alerts if try to pick a taken
//feels v inefficient - see if can cut down
function squOneClick() {  
  if (gameBoard[0] === "") {
    gameBoard[0] = human;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squTwoClick() {  
  if (gameBoard[1] === "") {
    gameBoard[1] = human;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squThreeClick() {  
  if (gameBoard[2] === "") {
    gameBoard[2] = human;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squFourClick() {  
  if (gameBoard[3] === "") {
    gameBoard[3] = human;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squFiveClick() {  
  if (gameBoard[4] === "") {
    gameBoard[4] = human;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squSixClick() {  
  if (gameBoard[5] === "") {
    gameBoard[5] = human;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squSevenClick() {  
  if (gameBoard[6] === "") {
    gameBoard[6] = human;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squEightClick() {  
  if (gameBoard[7] === "") {
    gameBoard[7] = human;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

function squNineClick() {  
  if (gameBoard[8] === "") {
    gameBoard[8] = human;
    addToGameBoard();
    playGame();
} else {
    alert(emptysqu);
}
};

// functions for event listeners when user clicks
// find a way of looping - this feels extremely inefficient
squ0.addEventListener('click', squOneClick);
squ1.addEventListener('click', squTwoClick);
squ2.addEventListener('click', squThreeClick);
squ3.addEventListener('click', squFourClick);
squ4.addEventListener('click', squFiveClick);
squ5.addEventListener('click', squSixClick);
squ6.addEventListener('click', squSevenClick);
squ7.addEventListener('click', squEightClick);
squ8.addEventListener('click', squNineClick);