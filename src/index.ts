/** @type {HTMLCanvasElement} */

//Import types
import type { canvasPropsType } from "./types";

//Create new font face from google fonts to be used directly in canvas
const customFont: FontFace = new FontFace('Montserrat', 'url(../brick_breaker/resources/Montserrat/Montserrat-VariableFont_wght.ttf)');

const rulesBtn = document.getElementById('rules-btn') as HTMLButtonElement;
const closeBtn = document.getElementById('close-btn') as HTMLButtonElement;
const rules = document.getElementById('rules') as HTMLDivElement;

//Get canvas element and add "2D" rendering context
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

//Init canvas height and width values
const canvasWidth: number = canvas.width; //800
const canvasHeight: number = canvas.height; //600

//Init score variable
let score: number = 0;

//Create ball properties
const ball: canvasPropsType = {
    x: canvasWidth / 2, //400
    y: canvasHeight / 2, //300
    radius: 10,
    speed: 4,
    dx: 4,
    dy: -4
};

//Create paddle properties
const paddle: canvasPropsType = {
    x: canvasWidth / 2 - 40, //360
    y: canvasHeight - 20, //580
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
};

//Draw ball onto canvas
function drawBall() {
    ctx.beginPath();

    //Set ball dimensions (circle)
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    //Set and fill in ball styles
    ctx.fillStyle = '#21ebff';
    ctx.fill();
    
    ctx.closePath();
};

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

//Draw all items 
function drawGameCanvas() {
    drawBall();
    drawPaddle();
    drawScore();
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

drawGameCanvas();

//Event Listeners
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
});
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
});