// Tic-Tac-Toe
//0 1 2
//3 4 5
//6 7 8
const winarr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var gameover = false;
var move = 0;

// drow field of 9 blocks
function init() {
    for (let i = 0; i < 9; i++) {
        document.getElementById('game').innerHTML += '<div  id="b' + i +'" class="block"></div>';
    }
}

// computer moves
// algorytm of win tic-tac-toe game from:
// https://4brain.ru/blog/%D0%BA%D0%B0%D0%BA-%D0%B2%D1%8B%D0%B8%D0%B3%D1%80%D0%B0%D1%82%D1%8C-%D0%B2-%D0%BA%D1%80%D0%B5%D1%81%D1%82%D0%B8%D0%BA%D0%B8-%D0%BD%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/
// 
function compmove() {
    let emptyarr = [];
    let comparr = [];
    let playerarr = [];
    let firstarr = [4, 0, 2, 6, 8];
    let blocks = document.getElementsByClassName('block');
    let win;

    //first two mov 
    // random from 4,0,2,6,8 if empty
    if (move < 3) {
        for (let i = 0; i < firstarr.length; i++) {
            if (blocks[firstarr[i]].innerHTML != '')  firstarr.splice(i, 1);
        }
        compdrow(firstarr[Math.floor(Math.random() * firstarr.length)], blocks);
        return;
    } 
    // 3-d movies and others
    for (let j = 0; j < 9; j++) {
        if (blocks[j].innerHTML == '') emptyarr.push(j); // fill array empty blocks
        if (blocks[j].innerHTML == '0') playerarr.push(j); // fill array opponent blocks
        if (blocks[j].innerHTML == 'x') comparr.push(j); // fill array comp blocks
    }
    // comp - try to win - find two filled blocks
    win = findwin(comparr,emptyarr);
    if (win != -1) {
        compdrow(win, blocks); //comp win
        return;
    }
    // block possible win of opponent - find two filled blocks;
    win = findwin(playerarr, emptyarr);
    if (win != -1) {
        compdrow(win, blocks); //player can't win
        return;
    }
    compdrow(emptyarr[0], blocks); // if not two filled put x on first empty
}

function findwin(garr, earr) {
    for (let i = 0; i < winarr.length; i++) { // check all combinations with two filled blocks
        let a = []; //slice of winarr
        let pos = [];
        for (let n = 0; n < 3; n++) {//fill slice
            a.push(winarr[i][n]);
        }
        for (let j = 0; j < 3; j++) {
            if (garr.indexOf(a[j]) != -1) pos.push(a[j]);
        }
        if (pos.length == 2) { //  two filled blocks finds
            a.splice(a.indexOf(pos[0]), 1);
            a.splice(a.indexOf(pos[1]), 1);
            if (earr.indexOf(a[0]) != -1) { //check on empty if can, return position to drow
                return a[0];
            }
        }
    }
    return -1;
}

function compdrow(n, b) {
    b[n].innerHTML = 'x';
    move++;
}


// drow X or 0 if block empty and not end of the game
function turn() {
    
    document.getElementById('game').onclick = function (event) {
        if (event.target.className == "block" && event.target.innerHTML == '' && !gameover) {
            if (move % 2 == 0) {
                event.target.innerHTML = 'x';
            }
            else {
                event.target.innerHTML = '0';
            }
            move++;
            checkall(); 
            if (!gameover) {
                compmove();
                checkall();
            }
        }
    }
}


// all possible checks here
function checkall() {
    let blocks = document.getElementsByClassName('block');
    let full = true;

    //checkwin
    for (var i = 0; i < winarr.length; i++) {
        //check x-win
        if (blocks[winarr[i][0]].innerHTML == 'x' && blocks[winarr[i][1]].innerHTML == 'x' && blocks[winarr[i][2]].innerHTML == 'x') {
            //show winner X
            document.getElementById('h1').innerHTML = 'Game Over X WIN';
            for (let j = 0; j < 3; j++) {
                blocks[winarr[i][j]].style.color = 'red';
            }
            // stop game
            gameover = true;
            return;
        //check x-win
        } else if (blocks[winarr[i][0]].innerHTML == '0' && blocks[winarr[i][1]].innerHTML == '0' && blocks[winarr[i][2]].innerHTML == '0') {
            //show winner 0
            document.getElementById('h1').innerHTML = 'Game Over 0 WIN';
            for (let j = 0; j < 3; j++) {
                blocks[winarr[i][j]].style.color = 'lime';
            }
            // stop game
            gameover = true;
            return;
        }
    }

    // check full (no Winner)
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].innerHTML == '') full = false;
    }
    if (full) {
        // stop game - no winner
        document.getElementById('h1').innerHTML = 'Game Over No Winner';
        gameover = true;
    }
}

// begin programm on load 
window.onload = function () {

    init();

    compmove();

    turn();
    
}