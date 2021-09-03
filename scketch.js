let circleX = 300;
let circleY = 200;
let circleDiameter = 15;
let circleRadius = circleDiameter / 2;

let movingCircleX = 6;
let movingCircleY = 6;

let racketWidth = 10;
let racketHeight = 90;

let myRacketX = 5;
let myRacketY = 150;

let opponentX = 585;
let opponentY = 150;

let opponentMovement;
let opponentTired = 0;

let hit = false;

let myScore = 0;
let opponentScore = 0;

let racketSound;
let scoreSound;
let soundtrackSound;

function preload() {
  racketSound = loadSound("racket.mp3");
  scoreSound = loadSound("score.mp3");
  soundtrackSound = loadSound("soundtrack.mp3");
}

function setup() {
  createCanvas(600, 400);
  soundtrackSound.loop();
}

function draw() {
  background(0);
  drawCircle();
  moveCircle();
  verifyBorderCollision();
  drawRacket(myRacketX, myRacketY);
  moveRacket();
  verifyRacketCollision(myRacketX, myRacketY);
  drawRacket(opponentX, opponentY);
  moveOpponent();
  verifyRacketCollision(opponentX, opponentY);
  addScoreboard();
  addPoints();
}

function drawCircle() {
  circle(circleX, circleY, circleDiameter);
}

function moveCircle() {
  circleX += movingCircleX;
  circleY += movingCircleY;
}

function verifyBorderCollision() {
  if (circleX + circleRadius > width || circleX - circleRadius < 0) {
    movingCircleX *= -1;
  }
  if (circleY + circleRadius > height || circleY - circleRadius < 0) {
    movingCircleY *= -1;
  }
}

function drawRacket(x, y) {
  rect(x, y, racketWidth, racketHeight);
}

function moveRacket() {
  if (keyIsDown(UP_ARROW)) {
    myRacketY -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    myRacketY += 10;
  }
}

function verifyRacketCollision(x, y) {
  hit = collideRectCircle(
    x,
    y,
    racketWidth,
    racketHeight,
    circleX,
    circleY,
    circleRadius
  );

  if (hit) {
    movingCircleX *= -1;
    racketSound.play();
  }
}

function moveOpponent() {
  opponentMovement = circleY - opponentY - racketWidth / 2 - 30;
  opponentY += opponentMovement + opponentTired;
  makeOpponentTired();
}

function addScoreboard() {
  textSize(50);
  textFont("monospace");
  textAlign(CENTER);
  fill(255);
  text(myScore, 150, 50);
  text(opponentScore, 450, 50);
}

function addPoints() {
  if (circleX > 590) {
    myScore += 1;
    scoreSound.play();
  }
  if (circleX < 10) {
    opponentScore += 1;
    scoreSound.play();
  }
}

function makeOpponentTired() {
  if (opponentScore >= myScore) {
    opponentTired += 1;
    if (opponentTired >= 40) {
      opponentTired = 40;
    }
  } else {
    opponentTired -= 1;
    if (opponentTired <= 35) {
      opponentTired = 35;
    }
  }
}
