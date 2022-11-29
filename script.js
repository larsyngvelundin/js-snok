let snokHead = document.getElementById("snokHead");
let game = document.getElementById("game");
let score = document.getElementById("score");

let nextRotation = "";
let scoreValue = 0;
let bodyPartId = 0;
let bottom = 0;
let left = 50;
let rotation = -50;
let speed = 1;
let length = 60;

document.addEventListener("keypress", (e) => {
    //console.log("e", e.key);

    switch (e.key) {
        case "d":
        case "ArrowRight":
            nextRotation = "right";
            break;

        case "a":
        case "ArrowLeft":
            nextRotation = "left";
            break;

    }
});

function toRadians(angle) {
    return angle * (Math.PI / 180);
}
let frame = 0;
let snokMovement = setInterval(() => {
    frame++;
    snokHead.style.rotate = rotation + "deg";
    //console.log("rotation", rotation);
    //console.log("sin", Math.sin(toRadians(rotation)));
    //console.log("sin",Math.cos(rotation)));
    //console.log("sin",Math.tan(rotation)));
    let moveX = Math.cos(toRadians(rotation)) * speed;
    //console.log("move X", moveX)
    left += moveX;
    snokHead.style.left = left + "px";
    let moveY = Math.sin(toRadians(rotation)) * speed;
    //console.log("move Y", moveY)
    bottom -= moveY;
    snokHead.style.bottom = bottom + "px";

    //check if out of bounds
    let clientWidth = document.documentElement.clientWidth;
    let clientHeight = document.documentElement.clientHeight;
    let safeMargin = 15;
    let safeMarginExtra = 30;
    if (left > clientWidth + safeMargin) {
        left = 0 - safeMarginExtra;
    }
    if (left < 0 - safeMarginExtra) {
        left = clientWidth + safeMargin;
    }
    if (bottom > clientHeight + safeMargin) {
        bottom = 0 - safeMarginExtra;
    }
    if (bottom < 0 - safeMarginExtra) {
        bottom = clientHeight + safeMargin;
    }

    if (frame > 10) {
        createBodyPart();
        frame = 0;
        if (nextRotation != "") {
            if (nextRotation == "left") {
                rotation -= 10;
            }
            else if (nextRotation == "right") {
                rotation += 10;
            }
            nextRotation = "";
        }
    }


}, 16);

function createBodyPart() {
    bodyPartId++;
    let timeToLive = length;
    let bodyPart = document.createElement("div");
    bodyPart.id = bodyPartId;
    bodyPart.classList = "bodyPart snok";
    bodyPart.style.rotate = rotation + "deg";
    bodyPart.style.zIndex = timeToLive;
    bodyPart.style.left = left + "px";
    bodyPart.style.bottom = bottom + "px";
    //console.log("created?");
    game.appendChild(bodyPart);
    let snokBodyPart = setInterval(() => {
        //console.log("in interval?");
        bodyPart.style.zIndex -= 1;
        if (bodyPart.style.zIndex < 1) {
            clearInterval(snokBodyPart);
            bodyPart.remove();
        }
    }, 16);
}

function createFood() {
    let food = document.createElement("div");
    food.classList = "food";
    let clientWidth = document.documentElement.clientWidth - 30;
    let clientHeight = document.documentElement.clientHeight - 30;
    let foodLeft = Math.round(Math.round(Math.random() * clientWidth) / 10) * 10;
    foodLeft += 15;
    let foodBottom =
        Math.round(Math.round(Math.random() * clientHeight) / 10) * 10;
    foodBottom += 15;

    food.style.left = foodLeft + "px";
    food.style.bottom = foodBottom + "px";
    food.id = "food";

    let checkIfEaten = setInterval(() => {
        distX = Math.abs(left - foodLeft);
        distY = Math.abs(bottom - foodBottom);
        distance = Math.sqrt(Math.pow(distY, 2) + Math.pow(distX, 2));
        //console.log("distance", distance);
        if (distance < 15) {
            addValue = 30;
            clearInterval(checkIfEaten);
            length += addValue;
            let currentParts = document.getElementsByClassName("bodyPart");
            for (i = 0; i < currentParts.length; i++) {
                let newIntValue = parseInt(currentParts[i].style.zIndex) + addValue;
                currentParts[i].style.zIndex = newIntValue;
            }
            scoreValue++;
            score.innerHTML = "Score:" + scoreValue;
            food.remove();
            createFood();
        }
    }, 16);

    game.appendChild(food);
}

createFood();
