var clones = [];

// snake game main container
var snakeContainer = document.getElementById("snake-game-main-container");

// create snake and append to DOM
var snake = document.createElement("div");

snake.setAttribute("id", "0-clone");

snake.classList.add("snake-skin");

snake.setAttribute('data-prev-top', 0);
snake.setAttribute('data-prev-left', 0);
snake.setAttribute('data-current-top', 0);
snake.setAttribute('data-current-left', 0);

snakeContainer.appendChild(snake);

clones.push(snake);

var snakeFood;

/* Game total points */
var totalPoints = 0;

var snakeCloneStartingPoint = 0;
var snakeCloneStartingId = 0;

// Define starting position for snake
var leftPos = 0;
var topPos = 0;

var moveInterval;

// Define main game timer
var mainTimerInterval;

/* Check which key is pressed */
function checkKeyPressed(e) {
    if(e.keyCode === 37) {
        moveSnake('left');
    }
    if(e.keyCode === 38) {
        moveSnake('up');
    }
    if(e.keyCode === 39) {
        moveSnake('right');
    }
    if(e.keyCode === 40) {
        moveSnake('down');
    }
}

function moveSnake(position) {
    clearInterval(moveInterval);

    var t = 0;
    var l = 0;

    moveInterval = setInterval(function() {

        switch(position) {
            case 'left':
                if(leftPos == 0) {
                    clearMoveInterval();
                }
                l = -20;
                break;
            case 'right':
                if(leftPos == 980) {
                    clearMoveInterval();
                }
                l = 20;
                break;
            case 'up':
                if(topPos == 0) {
                    clearMoveInterval();
                }
                t = -20;
                break;
            case 'down':
                if(topPos == 780) {
                    clearMoveInterval();
                }
                t = 20;
                break;
        }

        topPos += t;
        leftPos += l;

        snake.style.top = topPos + "px";
        snake.style.left = leftPos + "px";

        checkCollision();

    }, 100);
}

function clearMoveInterval() {
    clearInterval(moveInterval);
    gameOver();
    return;
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

function createClone() {
    var clone = document.createElement("div");

    snakeCloneStartingId += 1;

    var cloneId = snakeCloneStartingId;

    clone.setAttribute("id", cloneId + "-clone");

    clone.classList.add("snake-clone");

    trackClonePath(clone);

    snakeContainer.appendChild(clone);

    clones.push(clone);
}

function checkCollision() {
    var snakeLeftVal = parseInt(snake.style.left);
    var snakeTopVal = parseInt(snake.style.top);
    var snakeFoodLeftVal = parseInt(snakeFood.style.left);
    var snakeFoodTopVal = parseInt(snakeFood.style.top);

    if(isNaN(snakeTopVal)) {
        snakeTopVal = 0;
    }

    trackSnakePath(snakeTopVal, snakeLeftVal);

    if((snakeLeftVal === snakeFoodLeftVal && snakeTopVal === snakeFoodTopVal)) {
        snakeFood.remove();
        updateTotalPoints();
        createFood();
        createClone();
        // console.log(clones);
    }
}

/* Update total points */
function updateTotalPoints() {
    totalPoints += 1;
    document.getElementById("game-total-points").innerHTML = totalPoints;
}

function trackSnakePath(x, y) {
    snake.setAttribute("data-prev-top", snake.getAttribute("data-current-top"));
    snake.setAttribute("data-prev-left", snake.getAttribute("data-current-left"));
    snake.setAttribute("data-current-top", x);
    snake.setAttribute("data-current-left", y);

    var totalClones = clones.length;

    if(totalClones > 1) {
        for(var i = 1; i < totalClones; i++) {
            trackClonePath(clones[i]);
            // console.log(clones[i]);
        }
    }
}

function trackClonePath(clone) {
    var currentCloneId = parseInt(clone.getAttribute("id"));
    var docElId = currentCloneId - 1;

    docElId = document.getElementById(docElId + "-clone");

    // console.log(docElId);

    // clone.setAttribute("data-prev-top", docElId.getAttribute("data-current-top"));
    // clone.setAttribute("data-prev-left", docElId.getAttribute("data-current-left"));

    clone.setAttribute("data-current-top", docElId.getAttribute("data-prev-top"));
    clone.setAttribute("data-current-left", docElId.getAttribute("data-prev-left"));

    clone.style.top = clone.getAttribute("data-current-top") + "px";
    clone.style.left = clone.getAttribute("data-current-left") + "px";
}