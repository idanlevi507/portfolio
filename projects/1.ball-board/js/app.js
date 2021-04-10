var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE';


var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var GLUE_EMO = '❄️';
var ballsCounter = 0
var ballsAdded = 2
var gBoard;
var gGamerPos;
var ballMaker;
var glueMaker;
var glues = [];
var gameOn = true;
// const audioWin = new Audio('win.mp3');

function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	ballMaker = setInterval(addBallRandomly, 1500);
	glueMaker = setInterval(addGlue, 5000);
}

function restart() {
	initGame();
	ballsCounter = 0;
	ballsAdded = 2;
	clearInterval(ballMaker);
	clearInterval(glueMaker);
	document.querySelector('h3').innerText = `Balls Collected: ${ballsCounter}`;
}

function gameEnd() {
	clearInterval(ballMaker);
	clearInterval(glueMaker);
	var elAudio = document.querySelector('.audio');
	elAudio.play();
	alert('winner!');
	document.querySelector('.restart-game').style.display = 'block'

}

function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)


	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;

	board[0][5].type = 'FLOOR'
	board[4][0].type = 'FLOOR'
	board[9][5].type = 'FLOOR'
	board[4][11].type = 'FLOOR'

	console.log(board);
	return board;
}

function addGlue() {
	var randI = getRandomInt(1, 9);
	var randJ = getRandomInt(1, 11);
	if (!gBoard[randI][randJ].gameElement) {
		gBoard[randI][randJ].gameElement = GLUE;
		renderBoard(gBoard);
		glues.push({ randomI: randI, randomJ: randJ });
		setTimeout(function () {
			var glue = glues.shift();
			if (gameOn) {
				gBoard[glue.randomI][glue.randomJ].gameElement = null;
				renderBoard(gBoard);
			}
		}, 3000)
	} else addGlue()
}



function addBallRandomly() {
	var randomI = getRandomInt(1, 9);
	var randomJ = getRandomInt(1, 11)
	// console.log(gBoard[randomI][randomJ].gameElement);
	if (gBoard[randomI][randomJ].gameElement === null) {
		gBoard[randomI][randomJ].gameElement = BALL;
		renderBoard(gBoard);
		ballsAdded++
	} else {
		addBallRandomly();
	}
}

// Render the board to an HTML table
function renderBoard(board) {
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];
			var cellClass = getClassName({ i: i, j: j })

			// TODO - change to short if statement
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			//TODO - Change To template string
			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			// TODO - change to switch case statement
			if (currCell.gameElement === GAMER) strHTML += GAMER_IMG;
			else if (currCell.gameElement === BALL) strHTML += BALL_IMG;
			else if (currCell.gameElement === GLUE) strHTML += GLUE_EMO;

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	// console.log('strHTML is:');
	// console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

function makePassages(i, j) {
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
	// console.log(gGamerPos);
	renderCell(gGamerPos, '');
	gGamerPos.i = i;
	gGamerPos.j = j;
	gBoard[i][j].gameElement = GAMER;
	// DOM:
	renderCell(gGamerPos, GAMER_IMG);
}

// Move the player to a specific location
function moveTo(i, j) {
	if (!gameOn) return;

	if (j === 12) {
		j = 0;
		makePassages(i, j)
	}
	else if (i === -1) {
		i = 9;
		makePassages(i, j)
	}
	else if (j === -1) {
		j = 11
		makePassages(i, j)
	}
	else if (i === 10) {
		i = 0;
		makePassages(i, j)
	}

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
		// if (targetCell === )
		if (targetCell.gameElement === GLUE) {
			// setTimeout(,3000)
			gameOn = false;
			gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
			// DOM:
			renderCell(gGamerPos, GAMER_IMG);
			var elBoard = document.querySelector('.board')
			elBoard.classList.add('freeze');
			setTimeout(function () {
				var elBoard = document.querySelector('.board');
				elBoard.classList.remove('freeze');
				gameOn = true;
			}, 3000)
		}
		else if (targetCell.gameElement === BALL) {
			console.log('Collecting!');
			ballsCounter++
			document.querySelector('h3').innerText = `Balls Collected: ${ballsCounter}`;
			if (ballsCounter === ballsAdded) gameEnd();
		}


		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, GAMER_IMG);

	} //else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

