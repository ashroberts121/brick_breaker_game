/** @type {HTMLCanvasElement} */

//Import types
import type { ballType } from "./types";

const rulesBtn = document.getElementById('rules-btn') as HTMLButtonElement;
const closeBtn = document.getElementById('close-btn') as HTMLButtonElement;
const rules = document.getElementById('rules') as HTMLDivElement;

//Get canvas element and add "2D" rendering context
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

//Init canvas height and width values
const canvasWidth: number = canvas.width;
const canvasHeight: number = canvas.height;

//Create ball properties
const ball: ballType = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: 10,
    speed: 4,
    dx: 4,
    dy: -4
};

//Draw ball onto canvas
function drawBall() {
    ctx.beginPath();
    //Set ball dimensions
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    //Set and fill in ball styles
    ctx.fillStyle = '#21ebff';
    ctx.fill();
    //Close draw path
    ctx.closePath();
};

drawBall();

//Event Listeners
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
});
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
});