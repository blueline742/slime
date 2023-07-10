const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const slimeWidth = 100;
const slimeHeight = 10;
const slimeSpeed = 2;
const ballSize = 40;
let slimeX = (canvas.width - slimeWidth) / 2;
let slimeY = canvas.height - slimeHeight / 2;
let leftArrowDown = false;
let rightArrowDown = false;
let spaceBarDown = false;

const jumpStrength = -70; // Increased jump strength
const gravity = 0.002; // Increased gravity
const slimeGravity = 0.002; gravity; // The strength of the gravity effect on the slime

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function handleKeyDown(event) {
if (event.key === "ArrowLeft") {
leftArrowDown = true;
} else if (event.key === "ArrowRight") {
rightArrowDown = true;
} else if (event.key === " ") {
spaceBarDown = true;
}
}

function handleKeyUp(event) {
if (event.key === "ArrowLeft") {
leftArrowDown = false;
} else if (event.key === "ArrowRight") {
rightArrowDown = false;
} else if (event.key === " ") {
spaceBarDown = false;
}
}

function moveSlimeLeft() {
if (slimeX > 0) {
slimeX -= slimeSpeed;
}
}

function moveSlimeRight() {
if (slimeX < canvas.width - slimeWidth) {
slimeX += slimeSpeed;
}
}

function updateSlime() {
    // Apply gravity to the slime
    slimeY += slimeGravity;
  
    // Check if the slime is on the ground
    const isSlimeOnGround = slimeY >= canvas.height - slimeHeight / 2;
  
    // Update slime position based on movement keys
    if (leftArrowDown && slimeX > 0) {
      slimeX -= slimeSpeed;
    } else if (rightArrowDown && slimeX < canvas.width - slimeWidth) {
      slimeX += slimeSpeed;
    }
  
    // Make the slime jump if the space bar is down and it’s on the ground
    if (spaceBarDown && isSlimeOnGround) {
      slimeY -= jumpStrength;
    }
  
    // Keep the slime on the ground if it’s below the ground level
    if (slimeY > canvas.height - slimeHeight / 2) {
      slimeY = canvas.height - slimeHeight / 2;
    }
  }

function drawSlime() {
context.beginPath();
context.arc(slimeX + slimeWidth / 2, slimeY, slimeWidth / 2, Math.PI, 0, true);
context.fillStyle = "green";
context.fill();
context.closePath();
}

let ballX = (canvas.width - ballSize) / 2;
let ballY = (canvas.height - ballSize) / 2;
let ballVx = Math.random() * 0.1 + 0.1; // Horizontal velocity
let ballVy = -Math.random() * 0.1 - 0.1; // Vertical velocity

function updateBall() {
// Move ball by adding velocity to position
ballX += ballVx;
ballY += ballVy;

// Apply gravity by adding it to vertical velocity
ballVy += gravity;

// Check if ball hits left or right wall
if (ballX < 0 || ballX > canvas.width - ballSize) {
// Reverse horizontal velocity
ballVx = -ballVx;
}

// Check if ball hits top wall
if (ballY < 0) {
// Reverse vertical velocity to move ball downward
ballVy = -ballVy;
}

// Check if ball hits slime
let distX = Math.abs(ballX - slimeX - slimeWidth / 2);
let distY = Math.abs(ballY - slimeY);

if (distX <= slimeWidth / 2 + ballSize / 2) {
if (distY <= slimeHeight / 2 + ballSize / 2) {
// Reverse vertical velocity to make ball bounce off of slime
ballVy *= -1;
let angle = Math.atan2(ballY - slimeY, ballX - (slimeX + slimeWidth / 2));
let speed = Math.sqrt(ballVx * ballVx + ballVy * ballVy);
ballVx = speed * Math.cos(angle);
ballVy = speed * Math.sin(angle);
}
}

// Check if ball falls below bottom edge
if (ballY > canvas.height) {
// Reset game by placing ball at center
ballX = (canvas.width - ballSize) / 2;
ballY = (canvas.height - ballSize) / 2;
// Reset velocities to initial values
ballVx = Math.random() * 0.1 + 0.1;
ballVy = -Math.random() * 0.1 - 0.1;
}
}

function drawBall() {
context.beginPath();
context.arc(ballX, ballY, ballSize / 2, 0, Math.PI * 2);
context.fillStyle = "red";
context.fill();
context.closePath();
}

const goalPostWidth = 10;
const goalPostHeight = 80;
const goalPostY = canvas.height - goalPostHeight;
const leftGoalPostX = 0;
const rightGoalPostX = canvas.width - goalPostWidth;

function drawGoalPosts() {
context.beginPath();
// Draw the left goal post
context.rect(leftGoalPostX, goalPostY, goalPostWidth, goalPostHeight);
// Draw the right goal post
context.rect(rightGoalPostX, goalPostY, goalPostWidth, goalPostHeight);
context.fillStyle = "white";
context.fill();
context.closePath();
}

function draw() {
context.clearRect(0, 0, canvas.width, canvas.height);

updateSlime();
updateBall();

drawSlime();
drawBall();
drawGoalPosts();

requestAnimationFrame(draw);
}

draw();