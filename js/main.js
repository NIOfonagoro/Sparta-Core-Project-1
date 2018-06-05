$(document).ready(function(){

  var $player1 = $(".player1");
  var interval;
  var timerRunning = false;
  var $container = $('.container');
  var $ball = $('.ball');
  var posX = 0;
  var posY = 0;
  var posX1 = 0;
  var posY1 = 0;

  var directionX = '+';
  var directionY = '+';

  $('.btn').click(function(){

    if (timerRunning) {
      clearInterval(interval);
      timerRunning = !timerRunning;
    } else {
      interval = setInterval(function(){

        var player1Left = $player1.offset().left;
        var player1Top = $player1.offset().top;
        var player1Right = player1Left + $player1.width();
        var player1Bottom = player1Top + $player1.height();
        // Check ball position
        var ballLeft = $ball.offset().left;
        var ballTop = $ball.offset().top;
        var ballRight = ballLeft + $ball.width();
        var ballBottom = ballTop + $ball.height();

        // Check container position
        var containerLeft = $container.offset().left;
        var containerTop = $container.offset().top;
        var containerRight = containerLeft + $container.width();
        var containerBottom = containerTop + $container.height();

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


        if (player1Right > containerRight || player1Left < containerLeft || player1Top < containerTop || player1Bottom > containerBottom){
          console.log('no');
        }
        else {
          movePlane();
        }

      },1);
      timerRunning = !timerRunning;
    }
  });

  setInterval(movePlane, 200);
  var keys = {}

  $(document).keydown(function(e) {
    keys[e.keyCode] = true;
  });

  $(document).keyup(function(e) {
    delete keys[e.keyCode];
  });

  function movePlane() {
    for (var direction in keys) {
      switch (true) {
        case !keys.hasOwnProperty(direction):
          break;
        case direction == 37:
            $player1.css('left', `${posX1}px`); //arrow left
            posX1--;
          break;
        case direction == 38:
          $player1.css('top', `${posY1}px`); //arrow up
          posY1--;
          break;
        case direction == 39:
          $player1.css('left', `${posX1}px`); //arrow right
          posX1++;
          break;
        case direction == 40:
          $player1.css('top',`${posY1}px`); //arrow down
          posY1++;
          break;
        default:
        // console.log('nada');
      }
    }
  }



});
