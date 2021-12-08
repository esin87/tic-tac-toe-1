/*----- constants -----*/
// Conventional case for constants is screaming snake case
const PLAYERS = {
	playerOne: 'red',
	playerTwo: 'blue',
};

// // if all of the elements in any one of the sub arrays are the same, someone won!
// 0 - 9 represent the different ids of the boxes, and the indices we'll check in moves
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

/*----- app's state (variables) -----*/
// variables that are subject to change depending on user interaction
let currentPlayer;
let winState;
let moves;

/*----- cached element references -----*/
const gameBoard = document.querySelector('#grid');
const resetBtn = document.querySelector('button');
const currentPlayerEl = document.querySelector('h2');

/*----- event listeners -----*/
gameBoard.addEventListener('click', handleClick);
resetBtn.addEventListener('click', init);

/*----- functions -----*/
function init() {
	// Initializes state variables at their starting value
	// Also attached to reset button
	currentPlayer = PLAYERS.playerOne;
	winState = false;
	// populate moves as an array with nine null values, representing empty squares on the game grid
	moves = new Array(9).fill(null);
	render();
}

// Initialize the game by calling the init function
init();

//special job is to update the HTML
function render() {
	//hide the reset button by default
	resetBtn.style.display = 'none';
	// HTML is determined by the data in our application
	// logic flows from our representation of our data model into the view
	moves.forEach((element, idx) => {
		document.getElementById(`${idx}`).style.backgroundColor = element;
	});
	// update message depending on win, tie, or continued game play
	// if there is a winner
	if (winState) {
		// display winner
		currentPlayerEl.innerText = `Player ${
			winState === 'red' ? 'One' : 'Two'
		} wins!`;
		// show the reset button
		resetBtn.style.display = 'block';
		// if there is a tie
	} else if (!moves.includes(null)) {
		currentPlayerEl.innerText = "It's a tie!";
		resetBtn.style.display = 'block';
	} else {
		currentPlayerEl.innerText =
			currentPlayer === 'red' ? "Player One's Turn" : "Player Two's Turn";
	}
}

function handleClick(event) {
	// don't register click if move is filled
	if (moves[event.target.id]) return;
	// or if win state is true
	if (winState) return;
	// else assign the player's color to that grid square in the moves array
	moves[event.target.id] = currentPlayer;
	console.log(moves);
	// updateGameBoard(event);
	// check if there is a winner
	checkWinner();
	// switch turn
	switchCurrentPlayer();
	// render
	render();
}

function switchCurrentPlayer() {
	// toggles between players
	if (currentPlayer === PLAYERS.playerOne) {
		currentPlayer = PLAYERS.playerTwo;
	} else {
		currentPlayer = PLAYERS.playerOne;
	}
}

function checkWinner() {
	for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
		const sequenceStr =
			'' +
			moves[WINNING_COMBINATIONS[i][0]] +
			moves[WINNING_COMBINATIONS[i][1]] +
			moves[WINNING_COMBINATIONS[i][2]];
		if (!sequenceStr.includes('null')) {
			if (sequenceStr === 'redredred' || sequenceStr === 'blueblueblue') {
				winState = moves[WINNING_COMBINATIONS[i][0]];
				return true;
			}
		}
	}

	return false;
}
