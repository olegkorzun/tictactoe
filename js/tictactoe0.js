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
function compdrow(n,b) {
    b[n].innerHTML = 'x';
    move++;
}

// algorytm of win tic-tac-toe game from:
// https://4brain.ru/blog/%D0%BA%D0%B0%D0%BA-%D0%B2%D1%8B%D0%B8%D0%B3%D1%80%D0%B0%D1%82%D1%8C-%D0%B2-%D0%BA%D1%80%D0%B5%D1%81%D1%82%D0%B8%D0%BA%D0%B8-%D0%BD%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/
// 
function compmove() {
    let emptyarr = [];
    let comparr = [];
    let playerarr = [];
    let firstarr = [0, 2, 6, 8];
    let blocks = document.getElementsByClassName('block');

    //first two mov 
    // first try to put 4 
    if (move == 0) {
        compdrow(4, blocks);
        return;
    }
    // second random from 0,2,6,8 if empty
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
    // scomp try to win find two filled blocks
    for (let i = 0; i < winarr.length; i++) { // chexl all combination with two filled blocks
        let a = []; //slice of winarr
        let comppos = [];
        for (let n = 0; n < 3; n++) {//fill a
            a.push(winarr[i][n]);
        }
        for (let j = 0; j < 3; j++) {
            if (comparr.indexOf(a[j]) != -1) comppos.push(a[j]);
        }
        if (comppos.length == 2) { // success!!! - two filled blocks
            a.splice(a.indexOf(comppos[0]), 1);
            a.splice(a.indexOf(comppos[1]), 1);
            if (emptyarr.indexOf(a[0]) != -1) {
                compdrow(a[0], blocks); // comp win
                return;
            }
        }
    }
    // check 0 possible wins;
    for (let i = 0; i < winarr.length; i++) { // chexl all combination with two filled blocks
        let a = []; //slice of winarr
        let playerpos = []; 
        for (let n = 0; n < 3; n++) {//fill a
            a.push(winarr[i][n]);
        }
        for (let j = 0; j < 3; j++) {
            if (playerarr.indexOf(a[j]) != -1) playerpos.push(a[j]);
        }
        if (playerpos.length == 2) { // dangerous - two filled blocks
            a.splice(a.indexOf(playerpos[0]), 1);
            a.splice(a.indexOf(playerpos[1]), 1);
            if (emptyarr.indexOf(a[0]) != -1) {
                compdrow(a[0], blocks); //player can't win
                return;
            }
        }
    }
    compdrow(emptyarr[0], blocks); // if not two filled put x on first empty
}


// drow X or 0 if block empty and not end of the game
function turn() {
    //var move = 0;
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