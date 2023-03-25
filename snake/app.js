// snake game main container
var snakeContainer = document.getElementById("snake-game-main-container");

// create snake and append to DOM
var snake = document.createElement("div");

snake.setAttribute("id", "snake");

snake.classList.add("snake-skin");

snake.innerHTML = '1';

snakeContainer.appendChild(snake);

var snakeFood;

/* Game total points */
var totalPoints = 0;

var snakeCloneStartingPoint = 0;

// Define starting position for snake
var leftPos = 0;
var topPos = 0;

// Define snake intervals
var rightInterval;
var leftInterval;
var downInterval;
var upInterval;

// Define main game timer
var mainTimerInterval;

var rightArrowClicked = false;
var leftArrowClicked = false;
var upArrowClicked = false;
var downArrowClicked = false;

var firstCollision = false;
var snakeTrail = [];
var snakeTrailId = 0;

var snakeCloneId = 0;

var cloneInterval;

var zzz = 100;

var snakeClone;

var xy = 0;

var previousArrow = '';

/* Check which key is pressed */
function checkKeyPressed(e) {
    if(e.keyCode === 32) {
        clearAllIntervals();
    }
    if(e.keyCode === 37) {
        if(checkIfClonesExist() && previousArrow == 'right') {
            return;
        }
        moveSnakeLeft();
        previousArrow = 'left';
    }
    if(e.keyCode === 38) {
        if(checkIfClonesExist() && previousArrow == 'down') {
            return;
        }
        moveSnakeUp();
        previousArrow = 'up';
    }
    if(e.keyCode === 39) {
        if(checkIfClonesExist() && previousArrow == 'left') {
            return;
        }
        moveSnakeRight();
        previousArrow = 'right';
    }
    if(e.keyCode === 40) {
        if(checkIfClonesExist() && previousArrow == 'up') {
            return;
        }
        moveSnakeDown();
        previousArrow = 'down';
    }
}

/* Move snake to the left */
function moveSnakeLeft() {
    if(leftArrowClicked) {
        return;
    }

    clearAllIntervals();

    triggerArrowClick('left');

    leftInterval = setInterval(function() {
        if(leftPos == 0) {
            clearInterval(leftInterval);
            gameOver();
            return;
        }
        leftPos -= 20;
        snake.style.left = leftPos + "px";
        checkCollision('left');
    }, zzz);

    if(firstCollision) {
        setSnakeCloneInterval();
    }
}

/* Move snake to the right */
function moveSnakeRight() {
    if(rightArrowClicked) {
        return;
    }

    clearAllIntervals();

    triggerArrowClick('right');

    rightInterval = setInterval(function() {
        if(leftPos == 980) {
            clearInterval(rightInterval);
            gameOver();
            return;
        }
        leftPos += 20;
        snake.style.left = leftPos + "px";
        checkCollision('right');
    }, zzz);

    if(firstCollision) {
        setSnakeCloneInterval();
    }
}

/* Move snake up */
function moveSnakeUp() {
    if(upArrowClicked) {
        return;
    }

    clearAllIntervals();

    triggerArrowClick('up');

    upInterval = setInterval(function() {
        if(topPos == 0) {
            clearInterval(upInterval);
            gameOver();
            return;
        }
        topPos -= 20;
        snake.style.top = topPos + "px";
        checkCollision('up');
    }, zzz);

    if(firstCollision) {
        setSnakeCloneInterval();
    }
}

/* Move snake down */
function moveSnakeDown() {
    if(downArrowClicked) {
        return;
    }

    clearAllIntervals();

    triggerArrowClick('down');

    downInterval = setInterval(function() {
        if(topPos == 780) {
            clearInterval(downInterval);
            gameOver();
            return;
        }
        topPos += 20;
        snake.style.top = topPos + "px";
        checkCollision('down');
    }, zzz);

    if(firstCollision) {
        setSnakeCloneInterval();
    }
}

/* Call checkKeyPressed function on keydown */
document.addEventListener("keydown", checkKeyPressed);

// Define game over function
function gameOver() {
    clearTimeout(mainTimerInterval);
    document.getElementById("game-main-timer").innerHTML = "GAME OVER";
    var gameOverContainer = document.createElement("div");
    gameOverContainer.setAttribute("id", "game-over-container");
    gameOverContainer.innerHTML = '<div>GAME OVER</div><div><a href="javascript:void(0)" onclick="location.reload();">Try again</a></div>';
    snakeContainer.innerHTML = '';
    snakeContainer.appendChild(gameOverContainer);
}

/* Game main timer */
function gameMainTimer(totalSeconds) {
    if(isNaN(totalSeconds)) {
        return;
    }

    var finalTimerData = "";

    var totalMin = Math.floor(totalSeconds / 60);

    var totalSec = totalSeconds - (totalMin * 60);

    if(totalMin < 10) {
        totalMin = "0" + totalMin;
    }

    if(totalSec < 10) {
        totalSec = "0" + totalSec;
    }

    finalTimerData = totalMin + ":" + totalSec;

    document.getElementById("game-main-timer").innerHTML = finalTimerData;

    totalSeconds--;

    if(totalSeconds < 0) {
        clearTimeout(mainTimerInterval);
        document.getElementById("game-main-timer").innerHTML = "GAME OVER";
        gameOver();
        return;
    }

    mainTimerInterval = setTimeout(function() {
        gameMainTimer(totalSeconds);
    }, 1000);
}

gameMainTimer(3000);

function clearAllIntervals() {
    clearInterval(leftInterval);
    clearInterval(rightInterval);
    clearInterval(downInterval);
    clearInterval(upInterval);
    clearInterval(cloneInterval);
}

function triggerArrowClick(position) {
    leftArrowClicked = false;
    rightArrowClicked = false;
    downArrowClicked = false;
    upArrowClicked = false;

    switch(position) {
        case 'left':
            leftArrowClicked = true;
            break;
        case 'right':
            rightArrowClicked = true;
            break;
        case 'up':
            upArrowClicked = true;
            break;
        case 'down':
            downArrowClicked = true;
            break;
    }
}

/* create a function to get a random number between two numbers */
function numberInRange(max, min) {
    var x = Math.floor(Math.random() * (max - min + 1) + min);
    if(x % 20 != 0) {
        x = numberInRange(max, min);
    } 
    return x;
}

function createFood() {
    snakeFood = document.createElement("div");

    snakeFood.classList.add("food");

    var foodTopPos = numberInRange(780, 0);
    var foodLeftPost = numberInRange(980, 0);

    snakeFood.style.top = foodTopPos + "px";
    snakeFood.style.left = foodLeftPost + "px";

    snakeContainer.appendChild(snakeFood);
}

createFood();

function checkCollision(direction) {
    var snakeLeftVal = parseInt(snake.style.left);
    var snakeTopVal = parseInt(snake.style.top);
    var snakeFoodLeftVal = parseInt(snakeFood.style.left);
    var snakeFoodTopVal = parseInt(snakeFood.style.top);

    if(isNaN(snakeTopVal)) {
        snakeTopVal = 0;
    }

    if(firstCollision) {
        trackSnakePath();
    }

    if((snakeLeftVal === snakeFoodLeftVal && snakeTopVal === snakeFoodTopVal)) {
        firstCollision = true;

        snakeFood.remove();
        updateTotalPoints();

        trackSnakePath();

        createSnakeClone();

        // createFood();
    }
}

/* Update total points */
function updateTotalPoints() {
    totalPoints += 1;
    document.getElementById("game-total-points").innerHTML = totalPoints;
}

function trackSnakePath() {
    snakeTrail.push({id: snakeTrailId += 1, top: (isNaN(parseInt(snake.style.top)) ? 0 : parseInt(snake.style.top)), left: parseInt(snake.style.left)});
}

function createSnakeClone() {
    snakeClone = document.createElement("div");
    snakeClone.setAttribute("id", "snake-clone-" + (snakeCloneId += 1));
    snakeClone.classList.add("snake-clone");
    setSnakeCloneInterval();
    snakeContainer.appendChild(snakeClone);
}

function setSnakeCloneInterval() {
    cloneInterval = setInterval(function() {
        snakeClone.style.top = snakeTrail[xy].top + "px";
        snakeClone.style.left = snakeTrail[xy].left + "px";
        xy += 1;
    }, zzz);
}

function checkIfClonesExist() {
    var result = false;

    var total = document.getElementsByClassName("snake-clone");
    
    if(total.length > 0){
        result = true;
    }

    return result;
}