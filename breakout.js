//TODO: Stopped at: Defining a paddle to hit the ball
//#region Variable Definition
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const constants = {
    gameStates: {playing: "PLAYING", gameOver: "GAME OVER"},
    canvas: {width: canvas.width, height: canvas.height},
    ballInitial: {
        position: {x: 240, y: 290},
        radius: 10,
        speed: 2
    },
    paddleInitial: {
        position: {x: 202.5, y: 310},
        dimension: {height: 10, width: 75},
        speed: 7
    }
};
const colours = {ball: "#CD3837", brick: "#0095DD", paddle: "#0095DD"};

const ball = {
    position: {x: constants.ballInitial.position.x, y: constants.ballInitial.position.y},
    delta: {x: constants.ballInitial.speed, y: -constants.ballInitial.speed},
    radius: constants.ballInitial.radius,
    speed: constants.ballInitial.speed,
    colour: colours.ball
};

const paddle = {
    dimension: {height: constants.paddleInitial.dimension.height, width: constants.paddleInitial.dimension.width},
    position: {x: constants.paddleInitial.position.x, y: constants.paddleInitial.position.y},
    speed: constants.paddleInitial.speed,
    colour: colours.paddle
};

const buttonPressed = {left: false, right: false};
let currentGameState = constants.gameStates.playing;
//#endregion

//#region Functions
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = ball.colour;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.position.x, paddle.position.y, paddle.dimension.width, paddle.dimension.height);
    ctx.fillStyle = paddle.colour;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    //#region Draw Graphics
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    //#endregion

    //#region Ball
    if(ball.position.x + ball.delta.x > canvas.width - ball.radius || ball.position.x + ball.delta.x < ball.radius) {
        ball.delta.x = -ball.delta.x;
    }

    if(ball.position.y + ball.delta.y < ball.radius) {
        ball.delta.y = -ball.delta.y;
    }
    else if(ball.position.y + ball.delta.y > canvas.height + ball.radius + 10) {
        if(ball.position.x > paddle.position.x && ball.position.x < paddle.position.x + paddle.dimension.width) {
            ball.delta.y = -ball.delta.y;
        }
        else {
            ball.delta = {x: 0, y: 0};
            currentGameState = constants.gameStates.gameOver;
            alert("GAME OVER");
            document.location.reload();
        }
    }

    ball.position.x += ball.delta.x;
    ball.position.y += ball.delta.y;
    //#endregion


    //#region Paddle
    if(buttonPressed.right && paddle.position.x < canvas.width - paddle.dimension.width) {
        paddle.position.x += paddle.speed;
    } else if(buttonPressed.left && paddle.position.x > 0) {
        paddle.position.x -= paddle.speed;
    }
    //#endregion
}

//#region Event Listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {
    switch(event.keyCode) {
        case 39:
        buttonPressed.right = true;
        break;

        case 37:
        buttonPressed.left = true;
        break;

        default:
        console.warn(`keyCode ${event.keyCode} not in use.`);
        break;
    }
}

function keyUpHandler(event) {
    switch(event.keyCode) {
        case 39:
        buttonPressed.right = false;
        break;

        case 37:
        buttonPressed.left = false;
        break;

        default:
        console.warn(`keyCode ${event.keyCode} not in use.`);
        break;
    }
}
//#endregion
if(currentGameState == constants.gameStates.playing) setInterval(draw, 10);
//#endregion