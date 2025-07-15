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
const ball = {
    x: canvasWidth / 2, //400
    y: canvasHeight / 2, //300
    radius: 10,
    speed: 4,
    dx: 4,
    dy: -4
};
//Create paddle properties
const paddle = {
    x: canvasWidth / 2 - 40, //360
    y: canvasHeight - 20, //580
    w: 80,
    h: 10,
    speed: 8,
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
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
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
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
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
//Draw all items 
function drawGameCanvas() {
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}
;
drawGameCanvas();
//Event Listeners
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
});
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
});
export {};
