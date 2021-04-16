/* Global variables */
const messageBoard = document.getElementById('message-board');
let modal = document.getElementById("game-form");
let mode = "";
let gameBoard = [];

/* Sets up message board & variables containing messages */
let introMessage = "Hey! =] Press 'Start' to begin...";
let startMessage = "Great! Now click on a square to place your mark.";
let playAgainMessage = "Play again, or press 'Start' to change your settings."
function updateMessage(message){
    messageBoard.textContent = message;
};
updateMessage(introMessage);

/* Factory function to create players & player variables */
const CreatePlayer = (name, symbol) => {
    return {name, symbol};
  };
let user = CreatePlayer("", "X");
let ai = CreatePlayer("", "O");

/* Gets user info from form */
function getUserInfo(){
    user.symbol = userForm.symbol.value;
    ai.symbol = (user.symbol === "O") ? "X" : "O";
    user.name = userForm.userName.value;
    ai.name = "AI";
    mode = userForm.difficulty.value;
}

/* Sets up game once user info submitted */
function setUpGame(event){
    event.preventDefault();
    getUserInfo();
    toggleModal();
    displayPlayers();
    updateMessage(startMessage);
    startGame();
};

/* Creates gameboard array */
function createGameBoard(){
    gameBoard = [];
    for(let i = 0; i < 9; i++){
        let str = 'squ' + i;
        gameBoard.push(str);
    }
};

/* Displays modal form for user info */
function toggleModal(){
    (modal.style.display === "none") ? modal.style.display = "block" : modal.style.display = "none";
};

/* IIFE to set up hidden modal */
(function setUpModal(){
    let cancelButton = document.getElementById("cancel-button");
    cancelButton.onclick = () => {
        toggleModal();
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            toggleModal();
        }
    }
    let userForm = document.getElementById("userForm").addEventListener('submit', (event) => {
        setUpGame(event);
    });
})();

/* shows player container and data once modal submitted */
function showPlayersGrid(){
    let playersGrid = document.getElementById("players-grid");
    playersGrid.style.display = "grid";
};
function displayPlayers() {
    const userNameContainer = document.getElementById('user-name').textContent = user.name;
    const userSymbolContainer = document.getElementById('user-symbol').textContent = user.symbol;
    const aiNameContainer = document.getElementById('ai-name').textContent = ai.name;
    const aiSymbolContainer = document.getElementById('ai-symbol').textContent = ai.symbol;
    showPlayersGrid();
};

/* Sets up nav (start, play again) */
(function createNav(){
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', toggleModal);
})();

function triggerPlayAgain(){
    const playAgain = document.getElementById('play-again');
    playAgain.addEventListener('click', () => {    
    resetBoard();
    });
    playAgain.classList.remove("disabled-btn");
};

/* Resets board for play again */
function resetBoard() {
  startGame();
  updateMessage(playAgainMessage);
};

// *** Controls Gameplay ***
//indexes of wins
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
];

/* IIFE to creates board visuals */
(function createGameBoard(){
    const gameContainer = document.getElementById("game-container");
    for (i = 0; i < 9; i++) {
        squ = document.createElement('div');
        squ.classList.add('squ');
        squ.setAttribute('id', 'squ' + i);
        gameContainer.appendChild(squ); 
      }
})();

/* Global variable to hold all dom elements of board */
const squares = document.querySelectorAll('.squ');

/* Controls AI position in 'medium' mode */
function mediumPlay(){
    let rand = Math.floor((Math.random() * 10) + 1);
    let play;
    if(rand <= 5){
        play = easyPlay();
    } else {
        play = bestSpot();
    }
    return play;
};

/* Controls user turn once squ clicked, checks for win and triggers ai turn */
function userTurn(event){
    let i = gameBoard.indexOf(event.target.id);
    gameBoard[i] = user.symbol;
    (event.target).textContent = user.symbol;
    let win;
    win = checkWin(gameBoard, user.symbol);
    let tie = checkTie();
    if(win === null && tie === false){
        if(mode === "easy"){
            setTimeout( () => {
                aiTurn(easyPlay());
            }, 500);
        } else if(mode === "medium"){
            let play = mediumPlay();
            setTimeout( () => {
            aiTurn(play);
            }, 500); 
        } else if(mode === "hard"){
            let play = bestSpot();
            setTimeout( () => {
            aiTurn(play);
            }, 500); 
        }
    }   
    if(win != null & tie === false){
        gameOver(win);
    }
    if(tie === true){
        gameOver("tie");
    }
};

/* Sets up text content, event listeners and colors for game board */
function startGame(){
    for (let i=0; i < squares.length; i++) {
        squares[i].textContent = '';
        squares[i].addEventListener('click', userTurn);
        squares[i].style.color = "rgb(77, 116, 119)";
    }
    createGameBoard();
};

/* Checks for tie after user/ai play */
function checkTie() {
    return (emptySquares().length === 0) ? true : false;
};

/* Checks for win after user/ai play */
function checkWin(board, player){
    let hasWon = null;
    for(let i=0; i < winCombos.length; i++){
            let plays = 0;
        for(let j=0; j < 3; j++){
            if(gameBoard[winCombos[i][j]] === player){
                plays++;
            };
            if(plays === 3){
                hasWon = {
                    index: winCombos[i],
                    player: player
                }
            }
        }
    }
    return hasWon;
};

/* Controls AI tie */
function aiTurn(play){
    gameBoard[gameBoard.indexOf(play)] = ai.symbol;
    let squ = document.getElementById(play);
    squ.textContent = ai.symbol;
    let win = checkWin(gameBoard, ai.symbol);
    if(win != null){
        gameOver(win);
    }
};

/* Determines which board squares are still open */
function emptySquares() {
    let emptys = [];
    for(let i = 0; i < gameBoard.length; i++){
        if(gameBoard[i] !== "X" && gameBoard[i] !== "O"){
            emptys.push(gameBoard[i]);
        }
    }
    return emptys;
};

/* Controls AI position in easy play */
function easyPlay(){
    let emptys = emptySquares();
    let play = emptys[Math.floor(Math.random() * emptys.length)];
    return play;
};

/* Announces winner/tie and removes events */
function gameOver(winner) {
    if(winner !== "tie"){
        for(let index of winner.index){
            let squ = document.getElementById("squ" + index);
            squ.style.color = "#d65238";
        }
        updateMessage(winner.player == user.symbol ? "You win!" : "You Lose.");
    } else {
        updateMessage("It's a tie!!")
    }
    for(let i = 0; i < squares.length; i++){
        squares[i].removeEventListener('click', userTurn);
    }
    triggerPlayAgain();
};

/* calls recursive minimax function and determine most optimal ai move */
function bestSpot() {
    let best = minimax(gameBoard, ai.symbol);
    best = "squ" + best.index;
    return best;
};

/* recursive minimax function and determine most optimal ai move */
function minimax(newBoard, player) {
    let availSpots = emptySquares();
  
    if (checkWin(newBoard, user.symbol)) {
        return {score: -10};
    } else if (checkWin(newBoard, ai.symbol)) {
        return {score: 10};
    } else if (availSpots.length === 0) {
        return {score: 0};
    }
    
    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        let j = newBoard.indexOf(availSpots[i]);
        move.index = j;
        newBoard[j] = player;
        if (player == ai.symbol) {
            let result = minimax(newBoard, user.symbol);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, ai.symbol);
            move.score = result.score;
        }
        newBoard[j] = "squ" + j;
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
};
