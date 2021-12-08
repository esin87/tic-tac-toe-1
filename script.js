/*----- constants -----*/
// Conventional case for constants is screaming snake case
const PLAYERS = {
	playerOne: 'red',
	playerTwo: 'blue',
};

// // if all of the elements in any one of the sub arrays are the same, someone won!
// 0 - 9 represent the different indexes in moves
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
// variables that are subject to change depending on user input
let currentPlayer;
let winState;
let moves;

/*----- cached element references -----*/
const gameBoard = document.querySelector('#grid');
const resetBtn = document.querySelector('button');
const messageEl = document.querySelector('h2');

/*----- event listeners -----*/
gameBoard.addEventListener('click', handleClick);
resetBtn.addEventListener('click', init);

/*----- functions -----*/
function init() {
	// Initializes state variables at their starting value
	currentPlayer = PLAYERS.playerOne;
	winState = false;
	//fill the moves array initially with nine null values to represent the empty tic tac toe board
	// moves = []
	// moves = [null, null, null, etc.]
	moves = new Array(9).fill(null);
	render();
}

// Initialize the game by calling the init function
init();

function handleClick(event) {
	// grab the index of the box
	const boxIndex = event.target.id;
	// check the moves array to see if that index has already been taken
	if (moves[boxIndex]) return;
	// check to see if theres been a winner and return early
	if (winState) return;

	// add the player's color to the moves array in the right index
	moves[boxIndex] = currentPlayer;

	// check to see if there's a winner
	checkWinner();

	// toggle to the other player
	switchCurrentPlayer();

	// update dom
	render();
}

// The render function will hold all the logic for updating the VIEWS (DOM/HTML)
function render() {
	// update the board color
	//loop over the moves array
	for (let i = 0; i < moves.length; i++) {
		// grab each box in the grid
		const box = document.querySelector(`[id='${i}']`);
		// update each box's color with the value of the element in the moves array at index i
		box.style.backgroundColor = moves[i];
	}

	// change the message
	if (winState) {
		messageEl.innerText = `${
			winState === 'red' ? 'Player 1' : 'Player 2'
		} Won!`;
	} else if (!moves.includes(null)) {
		//theres been a tie if the moves array does NOT include null anymore
		messageEl.innerText = "There's been a tie!";
	} else {
		messageEl.innerText = `${
			currentPlayer === 'red' ? 'Player 1' : 'Player 2'
		}'s Turn`;
	}
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
	// loop through the winning combinations
	for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
		const boxOne = moves[WINNING_COMBINATIONS[i][0]];
		const boxTwo = moves[WINNING_COMBINATIONS[i][1]];
		const boxThree = moves[WINNING_COMBINATIONS[i][2]];

		if (boxOne && boxOne === boxTwo && boxTwo === boxThree) {
			winState = boxOne;
		}
	}
}
