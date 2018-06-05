$(document).ready(function(){

  var $player1 = $(".player1");
  var interval;
  var timerRunning = false;
  var $pitch = $(".pitch")
  var $ball = $(".ball");
  var pos = 0;

  var directionX = "+";
  var directionY = "+";
  //pitch

  console.log(event);

  $(".btn").click(function(){

    if (timerRunning){
      clearInterval(interval);
      timerRunning = !timerRunning
    } else {
      //players - physical
      interval = setInterval(function(){
        //check ball Position
        var player1Left = $player1.offset().left;
        var player1Top = $player1.offset().top;
        var player1Right = player1Left + $player1.width();
        var player1Bottom = player1Top + $player1.height();

        // console.log(`${player1Right} ${player1Top}`);
        // Check container Position
        var pitchLeft = $pitch.offset().left;
        var pitchTop = $pitch.offset().top;
        var pitchRight = pitchLeft + $pitch.width();
        var pitchBottom = pitchTop + $pitch.height();

        console.log(`${pitchLeft} and ${player1Left} `);

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
            if (!keys.hasOwnProperty(direction)) continue;
            if (direction == 37 && player1Left > pitchLeft) {
              $player1.animate({left: "-=5"}, 0);
            } //arrow left
            if (direction == 38 && player1Top > pitchTop) {
              $player1.animate({top: "-=5"}, 0);
            } //arrow up
            if (direction == 39 && player1Right < pitchRight) {
              $player1.animate({left: "+=5"}, 0);
            } //arrow right
            if (direction == 40 && player1Bottom < pitchBottom) {
              $player1.animate({top: "+=5"}, 0);
            } //arrow down
          }
        }
      }, 500);
      timerRunning = !timerRunning;

    }
  });
    //ball

  //Timer

  //players - identity and scorecard

  //scoreboard

  //reset after goal


  //OOP

  // window.addEventListener('keydown', function(event){
  // console.log(event); //look for keyCode. keydown vs keypress will be quite useful to understand
  // })






});
