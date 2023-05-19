function playgroundSize(selection) {

    var playgroundWidth;
    var playgroundHeight;
    var snakeGameTimer;

    if(selection === 1) {
        playgroundWidth = 600;
        playgroundHeight = 400;
        snakeGameTimer = 300;
    } else if(selection === 2) {
        playgroundWidth = 800;
        playgroundHeight = 600;
        snakeGameTimer = 600;
    } else {
        playgroundWidth = 1000;
        playgroundHeight = 800;
        snakeGameTimer = 900;
    }

    localStorage.setItem("playgroundWidth", playgroundWidth);
    localStorage.setItem("playgroundHeight", playgroundHeight);
    localStorage.setItem("snakeGameTimer", snakeGameTimer);

    window.location.href = "index.html";
}