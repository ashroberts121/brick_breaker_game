/** @type {HTMLCanvasElement} */
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
//Get canvas element and add "2D" rendering context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//Init canvas height and width values
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
//Create ball properties
const ball = {
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
}
;
drawBall();
//Event Listeners
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
});
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
});
export {};
