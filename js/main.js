$(document).ready(function(){
  var gameDone = false;
  var $player1 = $(".player1");
  var $player2 = $(".player2");
  var interval;
  var timerRunning = false;
  var $container = $('.container');
  let $ball = $('.ball');
  var $goal1 = $('.goal1');
  var $goal2 = $('.goal2');
  var $player1Score = $('.player1Score');
  var $player2Score = $('.player2Score');
  var $playerDraw = $('.playerDraw');
  $playerDraw.hide();
  var $player1Win = $('.player1Win');
  $player1Win.hide();
  var $player2Win = $('.player2Win');
  $player2Win.hide();

  let posX = 490;
  let posY = 275;
  let posX1 = 0;
  let posY1 = 275;
  let posX2 = 970;
  let posY2 = 275;
  var score1 = 0;
  var score2 = 0;

  var directionX = '+';
  var directionY = '+';

  var ballObject = {};
  var player1Object = {};
  var player2Object = {};


  // $(document).keydown(function(e) {
  //   console.log(e.keyCode);
  // });

  // Check container position
  var containerLeft = $container.offset().left;
  var containerTop = $container.offset().top;
  var containerRight = containerLeft + $container.width();
  var containerBottom = containerTop + $container.height();

  var goal2Line = $goal2.offset().left;
  var goal1Line = containerLeft;
  var goalTop = $goal2.offset().top;
  var goalBottom = goalTop + $goal2.height();

  // var goal1Line = $goal1.offset().left + $goal.width();


  $('.btn').click(function(){

    if (timerRunning) {
      clearInterval(interval);
      timerRunning = !timerRunning;
    }
    else if (gameDone === true) {
      location.reload();
    }
    else {
      timer();
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

        var player2Left = $player2.offset().left;
        var player2Top = $player2.offset().top;
        var player2Right = player2Left + $player2.width();
        var player2Bottom = player2Top + $player2.height();


        player2Object.left = Math.ceil('player2Left');
        player2Object.top = Math.ceil('player2Top');
        player2Object.bottom = Math.ceil('player2Bottom');
        player2Object.right = Math.ceil('player2Right');

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
        // --------------------------------------------
        if (player2Object.right === ballObject.left && ballObject.top < player2Object.bottom && ballObject.bottom > player2Object.top) {
          directionX = "+";
        }
        if (player2Object.left === ballObject.right && ballObject.top < player2Object.bottom && ballObject.bottom > player2Object.top) {
          directionX = "-";
        }
        if (player2Object.top === ballObject.bottom && ballObject.right > player2Object.left && ballObject.left < player2Object.right) {
          directionY = "-";
        }

        if (player2Object.bottom === ballObject.top && ballObject.right > player2Object.left && ballObject.left < player2Object.right) {
          directionY = "+";
        }

        // goals

        if(goal2Line === ballRight && ballTop > goalTop && ballBottom < goalBottom) {
          console.log("issa goal");

          posX = 490;
          posY = 275;
          posX1 = 0;
          posY1 = 275;
          posX2 = 970;
          posY2 = 275;
          clearInterval(movePlayer);
          posX1++;
          posY1++;
          posX2--;
          posY2--;
          AddScore1();
        }

        if(goal1Line === ballLeft && ballTop > goalTop && ballBottom < goalBottom) {
          console.log("issa goal");
          posX = 490;
          posY = 275;
          posX1 = 0;
          posY1 = 275;
          posX2 = 970;
          posY2 = 275;
          clearInterval(movePlayer);
          posX1++;
          posY1++;
          posX2--;
          posY2--;
          AddScore2();
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

    var player2Left = $player2.offset().left;
    var player2Top = $player2.offset().top;
    var player2Right = player2Left + $player2.width();
    var player2Bottom = player2Top + $player2.height();

    player2Object.left = player2Left;
    player2Object.top = player2Top;
    player2Object.bottom = player2Bottom;
    player2Object.right = player2Right;

    //Only move the player if it satisfies the container conditions
    for (var direction in keys) {
      switch (true) {
        case !keys.hasOwnProperty(direction):
        break;
        case direction == 65:
        if (player1Object.left > containerLeft) {
          $player1.css('left', `${posX1}px`); //arrow left
          posX1--;
        }
        break;
        case direction == 87:
        if (player1Object.top > containerTop) {
          $player1.css('top', `${posY1}px`); //arrow up
          posY1--;
        }
        break;
        case direction == 68:
        if (player1Object.right < containerRight) {
          $player1.css('left', `${posX1}px`); //arrow right
          posX1++;
        }
        break;
        case direction == 83:
        if (player1Object.bottom < containerBottom) {
          $player1.css('top',`${posY1}px`); //arrow down
          posY1++;
        }
        break;

        case direction == 37:
        if (player2Object.left > containerLeft) {
          $player2.css('left', `${posX2}px`); //arrow left
          posX2--;
        }
        break;
        case direction == 38:
        if (player2Object.top > containerTop) {
          $player2.css('top', `${posY2}px`); //arrow up
          posY2--;
        }
        break;
        case direction == 39:
        if (player2Object.right < containerRight) {
          $player2.css('left', `${posX2}px`); //arrow right
          posX2++;
        }
        break;
        case direction == 40:
        if (player2Object.bottom < containerBottom) {
          $player2.css('top',`${posY2}px`); //arrow down
          posY2++;
        }
        break;
        default:
      }
    }
  }

  function AddScore1(){
    score1++;
    $player1Score.text(score1);

    if (score1 > 1) {
      endGame1();
    }
  }
  function AddScore2(){
    score2++;
    $player2Score.text(score2);

    if (score2 > 1) {
      endGame2();
    }
  }

  function endGame1() {
    clearInterval(interval);
    $ball.hide();
    $player1Win.show();
    gameDone = true;
    timerRunning = !timerRunning;
  }
  function endGame2() {
    clearInterval(interval);
    $ball.hide();
    $player2Win.show();
    gameDone = true;
    timerRunning = !timerRunning;
  }
  function endGame3() {
    clearInterval(interval);
    $ball.hide();
    $playerDraw.show();
    gameDone = true;
    timerRunning = !timerRunning;
  }

  var time = 10, elapsed;

  function timer(){
    var x = window.setInterval(function()
    {
      if (timerRunning === true) {
        time -= 1;

        elapsed = Math.floor(time);

        $('.time').text(`Time Left: ${elapsed} seconds`);

      }

      if (time === 0) {
        switch (true) {
          case score1 > score2:
            endGame1();
            clearInterval(x);
            break;
          case score1 < score2:
            endGame2();
            clearInterval(x);
            break;
          case score2 === score1:
            endGame3();
            clearInterval(x);
            break;
          default:

        }
      }

    }, 1000);
  }

});
