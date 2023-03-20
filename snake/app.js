// snake game main container
var snakeContainer = document.getElementById("snake-game-main-container");

// create snake and append to DOM
var snake = document.createElement("div");

snake.setAttribute("id", "snake");

snake.classList.add("snake-skin");

snakeContainer.appendChild(snake);

// Define starting position for snake
var leftPos = 0;
var topPos = 0;

// Define snake intervals
var rightInterval;

// Define main game timer
var mainTimerInterval;

/* Check which key is pressed */
function checkKeyPressed(e) {
    if(e.keyCode === 37) {
        moveSnakeLeft();
    }
    if(e.keyCode === 38) {
        moveSnakeUp();
    }
    if(e.keyCode === 39) {
        moveSnakeRight();
    }
    if(e.keyCode === 40) {
        moveSnakeDown();
    }
}

/* Move snake to the left */
function moveSnakeLeft() {
    console.log('left');
}

/* Move snake to the right */
function moveSnakeRight() {
    rightInterval = setInterval(function() {
        if(leftPos == 980) {
            clearInterval(rightInterval);
            gameOver();
            return;
        }
        leftPos += 20;
        snake.style.left = leftPos + "px";
    }, 100);
}

/* Move snake up */
function moveSnakeUp() {
    console.log('up');
}

/* Move snake down */
function moveSnakeDown() {
    console.log('down');
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

gameMainTimer(300);