function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// switch (j) {
//     case 12:
//         j = 0;
//         break;
//     case -1:
//         j = 11;
//         break;
// }

// function makePassages(i, j) {
//     gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
//     // console.log(gGamerPos);
//     renderCell(gGamerPos, '');
//     gGamerPos.i = i;
//     gGamerPos.j = j;
//     gBoard[i][j].gameElement = GAMER;
//     // DOM:
//     renderCell(gGamerPos, GAMER_IMG);
// }
// function moveTo(i, j) {
//     // debugger
//     console.log(targetCell, i, j);
//     if (j === 12) {
//         j = 0;
//         makePassages(i, j)
//     }
//     else if (i === -1) {
//         i = 9;
//         makePassages(i, j)
//     }
//     else if (j === -1) {
//         j = 11
//         makePassages(i, j)
//     }
//     else if (i === 10) {
//         i = 0;
//         makePassages(i, j)
//     }

// // if (i === -1 || (i === 10) || (j === -1) || (j === 12)) {

//     if ((i === -1) || (i === 10) || (j === -1) || (j === 12)) {
// 		if (i === -1) i = 9;
// 		else if (i === 10) i = 0;
// 		else if (j === -1) j = 11;
// 		else if (j === 12) j = 0;
// 		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
// 		renderCell(gGamerPos, '');
// 		gGamerPos.i = i;
// 		gGamerPos.j = j;
// 		gBoard[i][j].gameElement = GAMER;
// 		renderCell(gGamerPos, GAMER_IMG);
// 	}