/** @type {HTMLCanvasElement} */
//Create new font face from google fonts to be used directly in canvas
const customFont = new FontFace('Montserrat', 'url(../brick_breaker/resources/Montserrat/Montserrat-VariableFont_wght.ttf)');
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
//Get canvas element and add "2D" rendering context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//Init canvas height and width values
const canvasWidth = canvas.width; //800
const canvasHeight = canvas.height; //600
//Init score variable
let score = 0;
//Init bricks columns and rows
const brickRows = 5;
const brickColumns = 9;
//Create ball properties
const ballProperties = {
    x: canvasWidth / 2, //400
    y: canvasHeight / 2, //300
    radius: 10,
    speed: 1,
    dx: 1,
    dy: -1
};
//Create paddle properties
const paddleProperties = {
    x: canvasWidth / 2 - 40, //360
    y: canvasHeight - 20, //580
    w: 80,
    h: 10,
    speed: 4,
    dx: 0
};
//Create brick properties
const brickProperties = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};
//Draw bricks
const bricks = [];
//Create bricks within rows and columns
for (let r = 0; r < brickRows; r++) {
    //Create array inside bricks[] for each row
    bricks[r] = [];
    for (let c = 0; c < brickColumns; c++) {
        //Set x and y values for each brick
        const x = (c * (brickProperties.w + brickProperties.padding)) + brickProperties.offsetX;
        const y = (r * (brickProperties.h + brickProperties.padding)) + brickProperties.offsetY;
        //Assign axis values along with all brick object values dependent on row and column
        bricks[r][c] = Object.assign({ x, y }, brickProperties);
    }
    ;
}
;
//Draw ball onto canvas
function drawBall() {
    ctx.beginPath();
    //Set ball dimensions (circle)
    ctx.arc(ballProperties.x, ballProperties.y, ballProperties.radius, 0, Math.PI * 2);
    //Set and fill in ball styles
    ctx.fillStyle = '#21ebff';
    ctx.fill();
    ctx.closePath();
}
;
//Draw paddle onto canvas
function drawPaddle() {
    ctx.beginPath();
    //Set paddle dimensions (rectangle)
    ctx.rect(paddleProperties.x, paddleProperties.y, paddleProperties.w, paddleProperties.h);
    //Set and fill in paddle styles
    ctx.fillStyle = '#21ebff';
    ctx.fill();
    ctx.closePath();
}
;
//Draw score text
function drawScore() {
    //load custom font to use for the score counter
    customFont.load().then((f) => {
        //Add to fonts list
        document.fonts.add(f);
        //Set text properties and positioning
        ctx.font = `20px Montserrat`;
        ctx.fillText(`Score: ${score}`, canvasWidth - 100, 30);
    });
}
;
//Draw bricks on canvas
function drawBricks() {
    bricks.forEach((row) => {
        row.forEach((brick) => {
            ctx.beginPath();
            //Create each brick and only show when visible property is set to true
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#21ebff' : 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}
;
//Paddle movement on canvas
function movePaddle() {
    //Append paddle x-axis directional value onto actual x-axis value
    paddleProperties.x += paddleProperties.dx;
    //Detect sides of game window
    if (paddleProperties.x + paddleProperties.w > canvas.width) {
        //Check right wall collision
        paddleProperties.x = canvas.width - paddleProperties.w;
    }
    ;
    if (paddleProperties.x < 0) {
        //Check left wall collision
        paddleProperties.x = 0;
    }
    ;
}
;
//Ball movement
function moveBall() {
    //Append movement values onto axis position values
    ballProperties.x += ballProperties.dx;
    ballProperties.y += ballProperties.dy;
    //Wall collision
    //Check left and right wall
    if (ballProperties.x + ballProperties.radius > canvasWidth || ballProperties.x - ballProperties.radius < 0) {
        //Reverse direction along x axis
        ballProperties.dx *= -1;
    }
    ;
    //Check top wall
    if (ballProperties.y + ballProperties.radius > canvasHeight || ballProperties.y - ballProperties.radius < 0) {
        //Reverse direction along y axis
        ballProperties.dy *= -1;
    }
    ;
    //Paddle collision
    if (ballProperties.x + ballProperties.radius > paddleProperties.x && //Check left side of paddle
        ballProperties.x - ballProperties.radius < paddleProperties.x + paddleProperties.w && //Check right side of paddle
        ballProperties.y + ballProperties.radius > paddleProperties.y // Check y axis value against paddle
    ) {
        //Reverse ball direction on the y axis
        ballProperties.dy = -ballProperties.speed;
    }
    ;
    //Brick collision
    bricks.forEach(column => {
        column.forEach((brick) => {
            if (brick.visible) {
                if (ballProperties.x - ballProperties.radius > brick.x && //Check left side of brick
                    ballProperties.x + ballProperties.radius < brick.x + brick.w && //Check right side of brick
                    ballProperties.y + ballProperties.radius > brick.y && //Check top of brick
                    ballProperties.y - ballProperties.radius < brick.y + brick.h //Check bottom of brick
                ) {
                    ballProperties.dy *= -1; //Reverse direction ball is travelling on collision
                    brick.visible = false; //Set visibility to false so bricks disappear on contact
                    score++; //Increase score when brick is hit
                }
            }
        });
    });
}
;
//Draw all items 
function drawGameCanvas() {
    //Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}
;
//Update game canvas - drawing and animations
function updateGame() {
    movePaddle();
    moveBall();
    //Draw all starting elements
    drawGameCanvas();
    //Call this function everytime an animation is performed
    requestAnimationFrame(updateGame);
}
;
updateGame();
//Keydown event
function keyDown(e) {
    //Set x-axis movement speed on keydown (negative speed value for left movement)
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddleProperties.dx = paddleProperties.speed;
    }
    else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddleProperties.dx = -paddleProperties.speed;
    }
    ;
}
;
//Keyup event
function keyUp(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
        paddleProperties.dx = 0;
    }
    ;
}
;
//Arrow key event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
//Event Listeners
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
});
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
});
export {};
