//TODO: Stopped at: Defining a drawing loop
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const colours = {
    ball: "#CD3837",
    brick: "#0095DD",
    paddle: "#0095DD"
};

const ballProps = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,
    colour: colours.ball,
    dx: 2,
    dy: -2
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballProps.x, ballProps.y, ballProps.radius, 0, Math.PI*2);
    ctx.fillStyle = ballProps.colour;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if(ballProps.x + ballProps.dx > canvas.width - ballProps.radius || ballProps.x + ballProps.dx < ballProps.radius) {
        ballProps.dx = -ballProps.dx;
    }

    if(ballProps.y + ballProps.dy > canvas.height - ballProps.radius || ballProps.y + ballProps.dy < ballProps.radius) {
        ballProps.dy = -ballProps.dy;
    }

    ballProps.x += ballProps.dx;
    ballProps.y += ballProps.dy;
}

setInterval(draw, 10);