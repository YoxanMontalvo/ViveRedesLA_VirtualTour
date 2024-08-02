const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 40; // Tamaño de la cuadrícula reducido para mejorar las colisiones
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 80; // Ajusta para considerar el header

let snake = [
    { x: gridSize * 5, y: gridSize * 5 },
    { x: gridSize * 4, y: gridSize * 5 },
    { x: gridSize * 3, y: gridSize * 5 }
];
let direction = { x: gridSize, y: 0 };
let food = getRandomFoodPosition();
let score = 0;
let images = {};

function loadImages() {
    const imageSources = {
        apple: '../../Snake/Image/appleAll.png',

        body_bottomleft: '../../Snake/Image/body_bottomleft.png',
        body_bottomright: '../../Snake/Image/body_bottomright.png',
        body_horizontal: '../../Snake/Image/body_horizontal.png',
        body_topleft: '../../Snake/Image/body_topleft.png',
        body_topright: '../../Snake/Image/body_topright.png',
        body_vertical: '../../Snake/Image/body_vertical.png',

        head_down: '../../Snake/Image/head_down.png',
        head_left: '../../Snake/Image/head_left.png',
        head_right: '../../Snake/Image/head_right.png',
        head_up: '../../Snake/Image/head_up.png',
        
        tail_down: '../../Snake/Image/tail_down.png',
        tail_left: '../../Snake/Image/tail_left.png',
        tail_right: '../../Snake/Image/tail_right.png',
        tail_up: '../../Snake/Image/tail_up.png'
    };

    for (const [key, src] of Object.entries(imageSources)) {
        images[key] = new Image();
        images[key].src = src;
    }
}

function getRandomFoodPosition() {
    let position;
    do {
        position = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
        };
    } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
    return position;
}

function drawGrid() {
    ctx.strokeStyle = "#ccc";
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid();

    // Draw food
    ctx.drawImage(images.apple, food.x, food.y, gridSize, gridSize);

    // Draw snake
    snake.forEach((segment, index) => {
        let img;
        if (index === 0) {
            img = getHeadImage();
        } else if (index === snake.length - 1) {
            img = getTailImage();
        } else {
            img = getBodyImage(index);
        }
        ctx.drawImage(img, segment.x, segment.y, gridSize, gridSize);
    });

    // Move snake
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);

    // Check for collisions
    if (newHead.x === food.x && newHead.y === food.y) {
        food = getRandomFoodPosition();
        score++;
        document.getElementById("score").textContent = score;
    } else {
        snake.pop();
    }

    // Check wall collisions
    if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height || snake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        alert(`Game over! Your score: ${score}`);
        resetGame();
    }
}

function getHeadImage() {
    if (direction.x === gridSize && direction.y === 0) return images.head_right;
    if (direction.x === -gridSize && direction.y === 0) return images.head_left;
    if (direction.x === 0 && direction.y === gridSize) return images.head_down;
    if (direction.x === 0 && direction.y === -gridSize) return images.head_up;
}

function getTailImage() {
    const tail = snake[snake.length - 1];
    const beforeTail = snake[snake.length - 2];

    if (tail.x === beforeTail.x && tail.y < beforeTail.y) return images.tail_up;
    if (tail.x === beforeTail.x && tail.y > beforeTail.y) return images.tail_down;
    if (tail.x < beforeTail.x && tail.y === beforeTail.y) return images.tail_left;
    if (tail.x > beforeTail.x && tail.y === beforeTail.y) return images.tail_right;
}

function getBodyImage(index) {
    const prev = snake[index - 1];
    const curr = snake[index];
    const next = snake[index + 1];

    if (prev.x < curr.x && next.x > curr.x || prev.x > curr.x && next.x < curr.x) return images.body_horizontal;
    if (prev.y < curr.y && next.y > curr.y || prev.y > curr.y && next.y < curr.y) return images.body_vertical;
    if (prev.x < curr.x && next.y < curr.y || prev.y < curr.y && next.x < curr.x) return images.body_topleft;
    if (prev.x > curr.x && next.y < curr.y || prev.y < curr.y && next.x > curr.x) return images.body_topright;
    if (prev.x < curr.x && next.y > curr.y || prev.y > curr.y && next.x < curr.x) return images.body_bottomleft;
    if (prev.x > curr.x && next.y > curr.y || prev.y > curr.y && next.x > curr.x) return images.body_bottomright;
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = direction.y === -gridSize;
    const goingDown = direction.y === gridSize;
    const goingRight = direction.x === gridSize;
    const goingLeft = direction.x === -gridSize;

    if (keyPressed === LEFT && !goingRight) {
        direction = { x: -gridSize, y: 0 };
    }
    if (keyPressed === UP && !goingDown) {
        direction = { x: 0, y: -gridSize };
    }
    if (keyPressed === RIGHT && !goingLeft) {
        direction = { x: gridSize, y: 0 };
    }
    if (keyPressed === DOWN && !goingUp) {
        direction = { x: 0, y: gridSize };
    }
}

function resetGame() {
    snake = [
        { x: gridSize * 5, y: gridSize * 5 },
        { x: gridSize * 4, y: gridSize * 5 },
        { x: gridSize * 3, y: gridSize * 5 }
    ];
    direction = { x: gridSize, y: 0 };
    food = getRandomFoodPosition();
    score = 0;
    document.getElementById("score").textContent = score;
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 80;
});

window.addEventListener('load', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 80;
    loadImages();
    setInterval(draw, 100);
    window.addEventListener("keydown", changeDirection);
});
