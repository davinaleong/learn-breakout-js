//TODO: Stopped at: Defining a paddle to hit the ball
//#region Variable Definition
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const colours = {ball: "#CD3837", brick: "#0095DD", paddle: "#0095DD"};

const ball = {x: canvas.width / 2, y: canvas.height - 30, radius: 10,
    colour: colours.ball, speed: 2};
ball.dx = ball.speed;
ball.dy = -ball.speed;

const paddle = {height: 10, width: 75, speed: 7, colour: colours.paddle};
paddle.x = (canvas.width - paddle.width) / 2;
paddle.y = canvas.height - paddle.height;

const buttonPressed = {left: false, right: false};
//#endregion

//#region Functions
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = ball.colour;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
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
    if(ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }

    if(ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }
    else if(ball.y + ball.dy > canvas.height + ball.radius) {
        if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
        }
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
    //#endregion


    //#region Paddle
    if(buttonPressed.right && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.speed;
    } else if(buttonPressed.left && paddle.x > 0) {
        paddle.x -= paddle.speed;
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
setInterval(draw, 10);
//#endregion