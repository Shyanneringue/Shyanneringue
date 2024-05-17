/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();    // x position of the right side of the board
  const BOARD_HEIGHT = $("#board").height();  // y position of the bottom side of the board

  // Game Item Objects
  var ball = {
    x: parseFloat($("#ball").css("left")),
    y: parseFloat($("#ball").css("top")),
    width: $("#ball").width(),
    height: $("#ball").height(),
    speedX: 1,
    speedY: 1,
    id: "#ball",

  };
  var leftPaddle = {
    x: parseFloat($("#leftPaddle").css("left")),
    y: parseFloat($("#leftPaddle").css("top")),
    width: $("#leftPaddle").width(),
    height: $("#leftPaddle").height(),
    speedX: 1,
    speedY: 1,
    id: "#leftPaddle",
  };
  var rightPaddle = {
    x: parseFloat($("#rightPaddle").css("left")),
    y: parseFloat($("#rightPaddle").css("top")),
    width: $("#rightPaddle").width(),
    height: $("#rightPaddle").height(),
    speedX: 1,
    speedY: 1,
    id: "#rightPaddle",
  };

  var score1 = 0;
  var score2 = 0;
  var updatedScore1 = $("#score1");
  var updatedScore2 = $("#score2");

  var KEY = {
    ENTER: 13,
    UP: 38,
    DOWN: 40,
    W: 87, // up
    S: 83, // down
  };

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  startBall();
  endGame();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(ball);
    repositionPaddle(leftPaddle);
    repositionPaddle(rightPaddle);
    wallCollision(ball);
    paddleWallCollision(leftPaddle);
    paddleWallCollision(rightPaddle);
    doCollide(ball, leftPaddle);
    doCollide(ball, rightPaddle);
  }


  // Key logic
  function handleKeyDown(event) {
    // rightPaddle
    if (event.which === KEY.ENTER) {
      console.log("enter pressed");
    }
    else if (event.which === KEY.UP) {
      console.log("up pressed");
      rightPaddle.speedY = -5;
    }
    else if (event.which === KEY.DOWN) {
      console.log("down pressed");
      rightPaddle.speedY = 5;
    }

    // leftPaddle
    if (event.which === KEY.ENTER) {
      console.log("enter pressed");
    }
    else if (event.which === KEY.W) {
      console.log("W pressed");
      leftPaddle.speedY = -5;
    }
    else if (event.which === KEY.S) {
      console.log("S pressed");
      leftPaddle.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    // rightPaddle
    if (event.which === KEY.ENTER) {
      console.log("enter pressed");
    }
    else if (event.which === KEY.UP) {
      console.log("up pressed");
      rightPaddle.speedY = 0;
      rightPaddle.speedX = 0;
    }
    else if (event.which === KEY.DOWN) {
      console.log("down pressed");
      rightPaddle.speedY = 0;
      rightPaddle.speedX = 0;
    }

    // leftPaddle
    if (event.which === KEY.ENTER) {
      console.log("enter pressed");
    }
    else if (event.which === KEY.W) {
      console.log("W pressed");
      leftPaddle.speedY = 0;
      leftPaddle.speedX = 0;
    }
    else if (event.which === KEY.S) {
      console.log("S pressed");
      leftPaddle.speedY = 0;
      leftPaddle.speedX = 0;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function moveObject(object) {
    object.x += object.speedX;
    $(object.id).css("left", object.x);
    object.y += object.speedY;
    $(object.id).css("top", object.y);

    $('#object').css('top', object.y)
    $('#object').css('left', object.x)
  }

  function repositionPaddle(paddle) {
    paddle.y += paddle.speedY;
    $(paddle.id).css("top", paddle.y); 
    $('#paddle').css('top', paddle.y)
  }

  function wallCollision(object) {
    if (object.x < 0) { // left wall
      object.speedX = object.speedX * -1;
      score2++;
      updatedScore2.text("Player 2 Score: " + score2);
      startBall();
    }
    if (object.y < 0) { // top wall
      object.speedY = object.speedY * -1;
    }
    if (object.y >= BOARD_HEIGHT - object.height) { // bottom wall
      object.speedY = object.speedY * -1;
    }
    if (object.x >= BOARD_WIDTH - object.width) { // right wall
      object.speedX = object.speedX * -1;
      score1++;
      updatedScore1.text("Player 1 Score: " + score1);
      startBall();
    }
  }

  function paddleWallCollision(object) {
    if (object.y <= 6) { // top wall
      object.y = 6;
    }
    if (object.y + object.height >= (BOARD_HEIGHT - 6)) { // bottom wall
      object.y = (BOARD_HEIGHT - 6) - object.height;
    }
  }

  // x: left    y: top    y + height: right    x + width: bottom

  function doCollide(ballA, paddleB) {
    // ball
    ballA.left = ballA.x;
    ballA.top = ballA.y;
    ballA.right = ballA.x + ballA.width;
    ballA.bottom = ballA.y + ballA.height;

    // paddles
    paddleB.left = paddleB.x;
    paddleB.top = paddleB.y;
    paddleB.right = paddleB.x + paddleB.width;
    paddleB.bottom = paddleB.y + paddleB.height;

    if (ballA.left < paddleB.right &&
      ballA.right > paddleB.left &&
      ballA.top < paddleB.bottom &&
      ballA.bottom > paddleB.top) {
      ballA.speedX = ballA.speedX * -1;
      ballA.speedY = ballA.speedY * -1;
      return true;
    }
    else {
      return false;
    }
  }

  function startBall() {
    ball.x = BOARD_WIDTH / 2;
    ball.y = BOARD_HEIGHT / 2;
    var randomNum1 = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    var randomNum2 = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedX = randomNum1;
    ball.speedY = randomNum2;
  }

  function endGame() {
    if (score1 >= 11 || score2 >= 11) {
      // stop the interval timer
      clearInterval(interval);
      // turn off event handlers
      $(document).off();
    }

    if (score1 >= 11) {
      alert("Player 1 Won!")
    }
    if (score2 >= 11) {
      alert("Player 2 Won!")
    }
  }

}
