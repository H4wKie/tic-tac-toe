let playFieldArr = document.getElementsByClassName('playItem');
let winnerDisplay = document.getElementsByClassName('winner');
let cross = document.getElementsByClassName('cross');
let crossString = 'cross';
let circle = document.getElementsByClassName('circle');
let circleString = 'circle';
let statusList = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'];
let tempMemory = [];
let winningNumber;

function allwaysWin(inputString) {
    //check if the next move could be a winning move
    let a;
    tempMemory = statusList;

    for(a = 0; a <= 8; a++){
        if(tempMemory[a] === 'empty') {
            tempMemory[a] = inputString;
            if(checkWin(tempMemory)[0] === true && checkWin(tempMemory)[1] != 'draw') {
                // console.log(`Logging if win is true ${a}`);
                // console.log(tempMemory);
                winningNumber = a;
                return [winningNumber, tempMemory];
            }else {
                // console.log(`${inputString}: ${a}`);
                tempMemory[a] = 'empty';
            }
        }
    }
    // console.log(tempMemory);
}

allwaysWin(circleString);
checkWin(statusList);


function eventOnclick(e) {
    statusList[e] = 'circle';
    circle[e].classList.add('visible');
}

function removeListener() {
    for(let i = 0; i<playFieldArr.length; i++) { 
        playFieldArr[i].replaceWith(playFieldArr[i].cloneNode(true));
    }
}

function computerTurn() {
    let computerChoice;
    removeListener();
    setTimeout(() => {
        if(checkWin(statusList)[0] === false && statusList.includes('empty') === true) {
            if(allwaysWin(crossString) != undefined){
                statusList[winningNumber] = 'cross';
                cross[winningNumber].classList.add('visible');
                if(checkWin(statusList)[0] === true) {
                    gamesEnd();
                    console.log(checkWin(statusList)[1]);
                }else{
                    eventListener();
                    winningNumber = undefined;
                    return winningNumber;
                }                
            }else if(allwaysWin(circleString) != undefined) {
                // console.log('very winnable');
                // console.log(winningNumber);
                statusList[winningNumber] = 'cross';
                cross[winningNumber].classList.add('visible');
                if(checkWin(statusList)[0] === true) {
                    gamesEnd();
                    console.log(checkWin(statusList)[1]);
                }else{
                    eventListener();
                    winningNumber = undefined;
                    return winningNumber;
                }
            }else {           
                do{
                    computerChoice = Math.floor(Math.random()*9);
                }while(statusList[computerChoice] != 'empty');
                statusList[computerChoice] = 'cross';
                cross[computerChoice].classList.add('visible');
                eventListener();
            }
        }else if(checkWin(statusList)[0] === true){
            console.log(checkWin(statusList)[1]);
            gamesEnd();
        }else {
            gamesEnd();
            console.log('we have a draw!');
        }
    }, 500);
}

function winConditions(list) {
    for(let i = 0; i<3; i++){
        if(list[i*3+0] != 'empty' && list[i*3+0] === list[i*3+1]){
            if(list[i*3+1] === list[i*3+2]) {
                return [true, list[i*3+0]];
            }
        }else if(list[0+i] != 'empty' && list[0+i] === list[3+i]){
            if(list[3+i] === list[6+i]) {
                return [true, list[0+i]];
            }
        }else if(list[0] != 'empty' && list[0] === list[4]){
            if(list[4] === list[8]) {
                return [true, list[0]];
            }
        }
        if(list[2] != 'empty' && list[2] === list[4]) {
            if(list[4] === list[6]) {
                return [true, list[2]];
            }
        }
    }
    return [false];
}

function checkWin(list) {
    if(winConditions(list)[0] === false && list.includes('empty') === true) {
        // console.log('nobody won yet');
        return [false, 'no winner yet'];
    }else if(winConditions(list)[0] === false && list.includes('empty') === false){
        // console.log('its a draw');
        return [true, 'draw'];
    }else if(winConditions(list)[0] === true){
        // console.log('there is a winner');
        return [true, winConditions(list)[1]];
    }
}

function eventListener() {
    for(let i = 0; i<playFieldArr.length; i++) {
        playFieldArr[i].addEventListener('click', function makeClickable() {
            if(circle[i].classList.contains('visible') || cross[i].classList.contains('visible')){
                console.log('already something there mate');
            }else {
                eventOnclick(i);
                computerTurn();
            }
        });
    }
}

eventListener();

function gamesEnd() {
    const playAgainBtn = document.getElementById('playAgain');

    playAgainBtn.style.display = 'block';
    playAgainBtn.style.color = 'rgb(0, 0, 0, 0.7)';
    setTimeout(() => {
        document.querySelector('body').addEventListener('click', function replay() {playAgain()});
    }, 1000);
}

function playAgain() {
    const playAgainBtn = document.getElementById('playAgain');

    playAgainBtn.style.color = '#CECFC7';
    statusList = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'];
    for(let x = 0; x<9; x++) {
        if(cross[x].classList.contains('visible') === true) {
            cross[x].classList.remove('visible');
        }
        if(circle[x].classList.contains('visible') === true) {
            circle[x].classList.remove('visible');
        }
    }
    document.querySelector('body').replaceWith(document.querySelector('body').cloneNode(true));
    eventListener();
}