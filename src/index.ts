/** @type {HTMLCanvasElement} */

//Import types
import type { canvasPropsType } from "./types";

//Create new font face from google fonts to be used directly in canvas
const customFont: FontFace = new FontFace('Montserrat', 'url(../brick_breaker/resources/Montserrat/Montserrat-VariableFont_wght.ttf)');

//Fetch DOM elements
const rulesBtn = document.getElementById('rules-btn') as HTMLButtonElement;
const closeBtn = document.getElementById('close-btn') as HTMLButtonElement;
const rules = document.getElementById('rules') as HTMLDivElement;
const redTheme = document.getElementById('red-theme') as HTMLButtonElement;
const yellowTheme = document.getElementById('yellow-theme') as HTMLButtonElement;
const greenTheme = document.getElementById('green-theme') as HTMLButtonElement;
const blueTheme = document.getElementById('blue-theme') as HTMLButtonElement;
const pinkTheme = document.getElementById('pink-theme') as HTMLButtonElement;

//Assign HTML root element for css variables + extract properties to be able to change
const cssRoot = document.querySelector(':root') as HTMLElement;
const cssRootProperties: CSSStyleDeclaration = getComputedStyle(cssRoot);

//Get canvas element and add "2D" rendering context
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

//Init canvas height and width values
const canvasWidth: number = canvas.width; //800
const canvasHeight: number = canvas.height; //600

//Theme colour
let themeColour: string = '#21ebff';

//Init score variable
let score: number = 0;

//Init high score variable (Set to 0 if no stored highscore is available in local storage)
let highScore: number = localStorage.getItem("highScore") === null ? 0 : JSON.parse(localStorage.getItem("highScore") || "''");


//Init bricks columns and rows
const brickRows: number = 5;
const brickColumns: number = 9; 

//Create ball properties
const ballProperties: canvasPropsType = {
    x: canvasWidth / 2, //400
    y: canvasHeight / 2, //300
    radius: 10,
    speed: 1,
    dx: 1,
    dy: -1
};

//Create paddle properties
const paddleProperties: canvasPropsType = {
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
}

//Draw bricks
const bricks: any[] = [];

//Create bricks within rows and columns
for (let r: number = 0; r < brickRows; r++) {
    //Create array inside bricks[] for each row
    bricks[r] = [];

    for (let c: number = 0; c < brickColumns; c++) {
        //Set x and y values for each brick
        const x: number = (c * (brickProperties.w + brickProperties.padding)) + brickProperties.offsetX;
        const y: number = (r * (brickProperties.h + brickProperties.padding)) + brickProperties.offsetY;

        //Assign axis values along with all brick object values dependent on row and column
        bricks[r][c] = { x, y, ...brickProperties };
        
    };
};

//Draw ball onto canvas
function drawBall() {
    ctx.beginPath();

    //Set ball dimensions (circle)
    ctx.arc(ballProperties.x, ballProperties.y, ballProperties.radius, 0, Math.PI * 2);
    //Set and fill in ball styles
    ctx.fillStyle = themeColour;
    ctx.fill();
    
    ctx.closePath();
};

//Draw paddle onto canvas
function drawPaddle() {
    ctx.beginPath();
    
    //Set paddle dimensions (rectangle)
    ctx.rect(paddleProperties.x, paddleProperties.y, paddleProperties.w, paddleProperties.h);
    //Set and fill in paddle styles
    ctx.fillStyle = themeColour;
    ctx.fill();

    ctx.closePath();
};

//Draw high score text
function drawHighScore() {
    //load custom font to use for the score counter
    customFont.load().then((f) => {
        //Add to fonts list
        document.fonts.add(f);

        //Set text properties and positioning
        ctx.font = `20px Montserrat`;
        ctx.fillText(`Highscore: ${highScore}`, 60, 30);
    });
};

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
    
};

//Draw bricks on canvas
function drawBricks() {
    bricks.forEach((row: any ) => {
        row.forEach((brick: any) => {
            ctx.beginPath();

            //Create each brick and only show when visible property is set to true
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? themeColour : 'transparent';
            ctx.fill();

            ctx.closePath();
        });
    });
};

//Paddle movement on canvas
function movePaddle() {
    //Append paddle x-axis directional value onto actual x-axis value
    paddleProperties.x += paddleProperties.dx;
    //Detect sides of game window
    if(paddleProperties.x + paddleProperties.w > canvas.width) {
        //Check right wall collision
        paddleProperties.x = canvas.width - paddleProperties.w;
    };
    if(paddleProperties.x < 0) {
        //Check left wall collision
        paddleProperties.x = 0;
    };
};

//Ball movement
function moveBall() {
    //Append movement values onto axis position values
    ballProperties.x += ballProperties.dx;
    ballProperties.y += ballProperties.dy;

    //Wall collision
     //Check left and right wall
    if(ballProperties.x + ballProperties.radius > canvasWidth || ballProperties.x - ballProperties.radius < 0) {
        //Reverse direction along x axis
        ballProperties.dx *= -1;
    };
     //Check top wall
    if(ballProperties.y + ballProperties.radius > canvasHeight || ballProperties.y - ballProperties.radius < 0) {
        //Reverse direction along y axis
        ballProperties.dy *= -1;
    };

    //Paddle collision
    if(
        ballProperties.x + ballProperties.radius > paddleProperties.x && //Check left side of paddle
        ballProperties.x - ballProperties.radius < paddleProperties.x + paddleProperties.w && //Check right side of paddle
        ballProperties.y + ballProperties.radius > paddleProperties.y // Check y axis value against paddle
    ) {
        //Reverse ball direction on the y axis
        ballProperties.dy = -ballProperties.speed;
    };

    //Brick collision
    bricks.forEach(column => {
        column.forEach((brick: { visible:boolean; x:number; y:number; }) => {
            if(brick.visible) {
                if(
                    ballProperties.x - ballProperties.radius > brick.x && //Check left side of brick
                    ballProperties.x + ballProperties.radius < brick.x + brickProperties.w && //Check right side of brick
                    ballProperties.y + ballProperties.radius > brick.y && //Check top of brick
                    ballProperties.y - ballProperties.radius < brick.y + brickProperties.h //Check bottom of brick
                ) {
                    ballProperties.dy *= -1; //Reverse direction ball is travelling on collision
                    brick.visible = false; //Set visibility to false so bricks disappear on contact
                    addToScore();
                };
            };
        });
    });

    //Game over on hitting bottom wall
    if (ballProperties.y + ballProperties.radius > canvasHeight) {
        resetBricks();
        //Update highscore locally and in localstorage, and redraw it on screen
        if(score > highScore){
            localStorage.setItem("highScore", score.toString());
            highScore = score;
            drawHighScore();
        };
        score = 0;
    };

};

//Increase score
function addToScore() {
    score++;
    //If no bricks are left redraw them all
    if(score % (brickRows * brickColumns) === 0) {
        resetBricks();
    };
};
//Reset all bricks on screen
function resetBricks() {
    bricks.forEach(column => {
        column.forEach((brick: { visible:boolean }) => {
            brick.visible = true;
        });
    });
};

//Draw all items 
function drawGameCanvas() {
    //Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    drawHighScore();
    drawScore();
    drawBricks();
    drawBall();
    drawPaddle();
};

//Update game canvas - drawing and animations
function updateGame() {
    movePaddle();
    moveBall();

    //Draw all starting elements
    drawGameCanvas();

    //Call this function everytime an animation is performed
    requestAnimationFrame(updateGame);
};

updateGame();

//Keydown event
function keyDown(e: KeyboardEvent) {
    //Set x-axis movement speed on keydown (negative speed value for left movement)
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        paddleProperties.dx = paddleProperties.speed;
    } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        paddleProperties.dx  = -paddleProperties.speed;
    };
};
//Keyup event
function keyUp(e: KeyboardEvent) {
    if(e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
        paddleProperties.dx = 0;
    };
};

//Change theme colours
function changeTheme(color: string) {
    let theme: string = color;
    //themeColour changes canvas colours, root styles change the rest of page
    switch(theme) {
        case 'red':
            themeColour = '#ff0000';
            cssRoot.style.setProperty('--theme', '#ff0000');
            cssRoot.style.setProperty('--theme-shadow-base', 'rgba(194, 24, 24, 0.9) 70%');
            break;
        case 'yellow':
            themeColour = '#fffc2f';
            cssRoot.style.setProperty('--theme', '#fffc2f');
            cssRoot.style.setProperty('--theme-shadow-base', 'rgba(215, 226, 117, 0.9) 70%');
            break;
        case 'green':
            themeColour = '#5dff1c';
            cssRoot.style.setProperty('--theme', '#5dff1c');
            cssRoot.style.setProperty('--theme-shadow-base', 'rgba(38, 245, 31, 0.9) 70%');
            break;
        case 'blue':
            themeColour = '#21ebff';
            cssRoot.style.setProperty('--theme', '#21ebff');
            cssRoot.style.setProperty('--theme-shadow-base', 'rgba(28, 180, 194, 0.9) 70%');
            break;
        case 'pink':
            themeColour = '#fd2efd';
            cssRoot.style.setProperty('--theme', '#fd2efd');
            cssRoot.style.setProperty('--theme-shadow-base', 'rgba(226, 75, 231, 0.9) 70%');
    };
};

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

redTheme.addEventListener('click', () => changeTheme('red'));
yellowTheme.addEventListener('click', () => changeTheme('yellow'));
greenTheme.addEventListener('click', () => changeTheme('green'));
blueTheme.addEventListener('click', () => changeTheme('blue'));
pinkTheme.addEventListener('click', () => changeTheme('pink'));