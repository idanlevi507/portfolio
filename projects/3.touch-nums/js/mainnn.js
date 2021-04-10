// 'use strict'
console.log('touch the numbers');

var gNums = [];
// var elTable = document.querySelector('.table').innerText;
var nextNum = 1;
var board;
var level;
var sqrt;
// console.log(sqrt,level);

function init(level) {
    sqrt = Math.sqrt(level)
    board = tableRender(level, sqrt);
    resetTimer()
}


function chooseLevel(clickedLevel) {
    sqrt = Math.sqrt(clickedLevel)
    return init(clickedLevel)

}

function tableRender(level, sqrt) {
    console.log(level, sqrt);
    makeNums(level)
    var strTable = '';
    var board = [];
    for (var i = 0; i < sqrt; i++) {
        board[i] = [];
        strTable += `\n <tr>  `;
        for (var j = 0; j < sqrt; j++) {
            board[i][j] = gNums.pop();
            strTable += `<td onclick="cellClicked(this)"> ${board[i][j]} </td>`
        }
        strTable += '  </tr>'
    }
    var elTable = document.querySelector('.table');
    elTable.innerHTML = strTable;
    return board
}


// function tableHTML() {
//     var strTable = '';
//     for (var i = 0; i < sqrt; i++) {
//         strTable += `\n <tr>  `;
//         for (var j = 0; j < sqrt; j++) {
//             strTable += `<td onclick="cellClicked(this)"> ${board[i][j]} </td>`
//         }
//         strTable += '  </tr>'
//     }
//     var elTable = document.querySelector('.table');
//     elTable.innerHTML = strTable;
// }

function cellClicked(elCell) {
    clickStart()
    var clickedNum = elCell.innerText
        if (+clickedNum === nextNum) {
        elCell.style.backgroundColor = 'rgb(58, 57, 56)';
        nextNum++;
        var elNextNum = document.querySelector('.next-number');
        elNextNum.innerText = `Next Number: \n ${nextNum}`;
        checkWin(clickedNum)
    } else return
}

function checkWin(clickedNum) {
    // console.log (clickedNum, gNums.length )
    if (+clickedNum === 16) {
        stopWatch()
        alert('victory!!')
    } else return
}

function resetGame() {
    nextNum = 1;
    init(16)
}


function makeNums(level) {
    gNums = [];
    for (var i = 1; i < level + 1; i++) {
        gNums.push(i);
    }
    shuffle(gNums);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



var milSec = 0;
var sec = 0;
var min = 0;
var looper;
var isOn = false;
var bestTime = 0;

// function getPlayerName

// function saveBestTime(){

//     if 
// }

function startWatch() {
    milSec++;
    if (milSec === 99) {
        sec++;
        milSec = 00
    }
    if (sec === 60) {
        min++;
        sec = 00
    }
    if (min < 10) {
        minDisplay = '0' + min.toString()
    } else {
        minDisplay = min
    }
    if (sec < 10) {
        secDisplay = '0' + sec.toString()
    } else {
        secDisplay = sec
    }

    milSecDisplay = milSec
    document.querySelector(".game-time").innerText = 'Timer: \n ' + minDisplay + ':' + secDisplay + ':' + milSecDisplay;
}

function resetTimer() {
    stopWatch();
    min = 0;
    sec = 0;
    milSec = 0;
    minDisplay = '00';
    secDisplay = '00';
    milSecDisplay = '00';
    document.querySelector(".game-time").innerText = 'Timer: \n' + minDisplay + ':' + secDisplay + ':' + milSecDisplay;
    nextNum = 1;
    var elNextNum = document.querySelector('.next-number');
        elNextNum.innerText = `Next Number: \n ${nextNum}`;    
}


function clickStart() {
    if (!isOn) {
        looper = setInterval(startWatch, 10);
        isOn = true;
    }
}

function stopWatch() {
    clearInterval(looper);
    isOn = false;
}







//לנסות לאחד בין 2 הפונקציות - 
//tableHTML  tableRender