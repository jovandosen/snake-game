var x = 0;
var y = 0;

function drawBoxes() {
    for(var i = 1; i <= 50; i++) {
        for(var j = 1; j <= 40; j++) {
            var box = document.createElement("div");
            box.classList.add("box-style");
            box.style.top = x + "px";
            box.style.left = y + "px";
            snakeContainer.appendChild(box);
            x += 20;
            if(j == 40) {
                x = 0;
                y += 20;
            }
        }
    }
}

function fillBoxes() {
    var boxes = document.getElementsByClassName("box-style");
    for(var i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", function() {
            this.classList.add("box-color");
        });
        boxes[i].addEventListener("dblclick", function() {
            this.classList.remove("box-color");
        });
    }
}

function removeBoxes() {
    var boxes = document.getElementsByClassName("box-style");
    for(var i = 0; i < boxes.length; i++) {
        boxes[i].remove();
    }
}

function toggleDevTools(that) {
    if(that.checked) {
        localStorage.setItem("dev-tools-active", "yes");
        drawBoxes();
        fillBoxes();
    } else {
        localStorage.setItem("dev-tools-active", "no");
        removeBoxes();
    }
}

function checkDevTools() {
    if(localStorage.getItem("dev-tools-active") == "yes") {
        document.getElementById("dev-tools").click();
    }
}

checkDevTools();