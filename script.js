let snokHead = document.getElementById("snokHead");
let game = document.getElementById("game");

let bodyPartId = 0;
let bottom = 0;
let left = 50;
let rotation = -45;
let speed = 2;
let length = 60;

document.addEventListener("keydown", (e) => {
    //console.log("e", e.key);

    switch (e.key) {
        case "d":
        case "ArrowRight":
            rotation += 5;
            break;

        case "a":
        case "ArrowLeft":
            rotation -= 5;
            break;

        case "s":
        case "ArrowDown":
            speed -= 1;
            break;

        case "w":
        case "ArrowUp":
            speed += 1;
            break;

    }
})

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
    if (frame > 10) {
        createBodyPart();
        frame = 0;
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
    let foodLeft = Math.round(Math.round(Math.random() * 500) / 10) * 10;
    let foodBottom = Math.round(Math.round(Math.random() * 500) / 10) * 10;

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
            for(i = 0; i < currentParts.length; i++){
                let newIntValue = parseInt(currentParts[i].style.zIndex) + addValue;
                currentParts[i].style.zIndex = newIntValue;
            }
            food.remove();
            createFood();
        }
    }, 16);


    // let move = setInterval(() => {
    //     foodLeft -= 50;
    //     food.style.left = foodLeft + "px";

    //     if (foodBottom > bottom && foodBottom < bottom + 150 && foodLeft === left) {
    //         console.log("HIT");

    //         let dead = setInterval(() => {
    //             hero.style.backgroundColor = "red";

    //             let resurect = setInterval(() => {
    //                 hero.style.backgroundColor = "purple"
    //                 clearInterval(dead)
    //             }, 100)

    //         }, 100)


    //     }

    //     if (foodLeft <= 0) {
    //         clearInterval(move);
    //         food.remove();
    //         createFood();
    //     }

    // }, 50)

    game.appendChild(food);
}

createFood();