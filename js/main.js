$(document).ready(function(){

  var $player1 = $(".player1");
  var interval;
  var timerRunning = false;
  var $container = $('.container');
  var $ball = $('.ball');
  var $goal1 = $('goal1');
  var $goal2 = $('.goal2');
  var $player1Score = $('.player1Score')
  var $player1Win = $('.player1Win')
  $player1Win.hide();
  let posX = 600;
  let posY = 325;
  let posX1 = 30;
  let posY1 = 325;
  var score1 = 0;

  var directionX = '+';
  var directionY = '+';

  var ballObject = {};
  var player1Object = {};


  // Check container position
  var containerLeft = $container.offset().left;
  var containerTop = $container.offset().top;
  var containerRight = containerLeft + $container.width();
  var containerBottom = containerTop + $container.height();

  var goal2Line = $goal2.offset().left;
  var goalTop = $goal2.offset().top;
  // var goal1Line = $goal1.offset().left + $goal.width();
  var goalBottom = goalTop + $goal2.height();


  $('.btn').click(function(){

    if (timerRunning) {
      clearInterval(interval);
      timerRunning = !timerRunning;
    } else {
      interval = setInterval(function(){

        //Check player position & assign to object
        var player1Left = $player1.offset().left;
        var player1Top = $player1.offset().top;
        var player1Right = player1Left + $player1.width();
        var player1Bottom = player1Top + $player1.height();


        player1Object.left = Math.ceil('player1Left');
        player1Object.top = Math.ceil('player1Top');
        player1Object.bottom = Math.ceil('player1Bottom');
        player1Object.right = Math.ceil('player1Right');

        // Check ball position
        var ballLeft = $ball.offset().left;
        var ballTop = $ball.offset().top;
        var ballRight = ballLeft + $ball.width();
        var ballBottom = ballTop + $ball.height();

        //Assign ball positions to an object for collision analysis
        ballObject.left = Math.ceil(ballLeft);
        ballObject.top = Math.ceil(ballTop);
        ballObject.bottom = Math.ceil(ballBottom);
        ballObject.right = Math.ceil(ballRight);

        // console.log(ballObject);

        // Move ball along X-Axis
        if (directionX === '+') {
          $ball.css({
            'left': `${posX}px`
          });
          posX++;
        }
        if (directionX === '-') {
          $ball.css({
            'left': `${posX}px`
          });
          posX--;
        }
        // Move ball along Y-Axis
        if (directionY === '+') {
          $ball.css({
            'top': `${posY}px`
          });
          posY++;
        }
        if (directionY === '-') {
          $ball.css({
            'top': `${posY}px`
          });
          posY--;
        }

        // When ballRight > containerRight
        if (ballRight > containerRight) {
          directionX = '-';
        }
        // When ballLeft < containerLeft
        if (ballLeft < containerLeft) {
          directionX = '+';
        }
        // When ballBottom > containerBottom
        if (ballBottom > containerBottom) {
          directionY = '-';
        }
        // When ballLeft < containerLeft
        if (ballTop < containerTop) {
          directionY = '+';
        }



        movePlayer();

        // player ball collisions
        if (player1Object.right === ballObject.left && ballObject.top < player1Object.bottom && ballObject.bottom > player1Object.top) {
          directionX = "+";
        }
        if (player1Object.left === ballObject.right && ballObject.top < player1Object.bottom && ballObject.bottom > player1Object.top) {
          directionX = "-";
        }
        if (player1Object.top === ballObject.bottom && ballObject.right > player1Object.left && ballObject.left < player1Object.right) {
          directionY = "-";
        }

        if (player1Object.bottom === ballObject.top && ballObject.right > player1Object.left && ballObject.left < player1Object.right) {
          directionY = "+";
        }

        // ball goal collisions

        if(goal2Line === ballRight && ballTop > goalTop && ballBottom < goalBottom) {
          console.log("issa goal");
          posX = 600;
          posY = 325;
          posX1 = 30;
          posY1 = 325;
          clearInterval(movePlayer);
          posX1--;
          posY1--;
          AddScore();

        }


      },1);
      timerRunning = !timerRunning;
    }
  });

  // If p1.top < pitch.top && p1.right < pitch.right && p1.left > pitch.left && p1.bottom > pitch.bottom
  // set interval movePlayer

  setInterval(movePlayer, 200);
  var keys = {}

  $(document).keydown(function(e) {
    event.preventDefault();
    keys[e.keyCode] = true;
  });

  $(document).keyup(function(e) {
    delete keys[e.keyCode];
  });

  function movePlayer() {

    //Check player position & assign to object
    var player1Left = $player1.offset().left;
    var player1Top = $player1.offset().top;
    var player1Right = player1Left + $player1.width();
    var player1Bottom = player1Top + $player1.height();

    player1Object.left = player1Left;
    player1Object.top = player1Top;
    player1Object.bottom = player1Bottom;
    player1Object.right = player1Right;

    //Only move the player if it satisfies the container conditions
    for (var direction in keys) {
      switch (true) {
        case !keys.hasOwnProperty(direction):
        break;
        case direction == 37:
        if (player1Object.left > containerLeft) {
          $player1.css('left', `${posX1}px`); //arrow left
          posX1--;
        }
        break;
        case direction == 38:
        if (player1Object.top > containerTop) {
          $player1.css('top', `${posY1}px`); //arrow up
          posY1--;
        }
        break;
        case direction == 39:
        if (player1Object.right < containerRight) {
          $player1.css('left', `${posX1}px`); //arrow right
          posX1++;
        }
        break;
        case direction == 40:
        if (player1Object.bottom < containerBottom) {
          $player1.css('top',`${posY1}px`); //arrow down
          posY1++;
        }
        break;
        default:
      }
    }
  }

  function AddScore(){

      score1++;
      console.log(score1);
      $player1Score.text(score1);

    if (score1 > 1) {
      endGame1();
    }
  }
function endGame1() {
  clearInterval(interval);
  clearInterval(movePlayer);
  $ball.hide();
  $player1Win.show();
}


});
