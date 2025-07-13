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
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
};
console.log(ball);
//Event Listeners
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
});
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
});
export {};
