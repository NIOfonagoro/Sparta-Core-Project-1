# Sparta-Core-Project-1  
## Sparta Tekkers

This project is a simple 1 vs 1 football game built in a web browser.

![Image](/Users/tech-a25/Desktop/Pitch-Screenshot.png "Sparta Tekkers")

## Objectives

This project is intended as a demonstration of technical capabilities rather than design or helpful data.  
The objective of this project is:

* To pull knowledge of HTML, CSS and JS together by building a small web application from the ground up, demonstrating mastery of topics covered during this course so far.
* To demonstrate the quality of communication around your decision-making. Technologies and solutions have been thought through thoroughly.
* To show ability to pick up new technologies, research, and leave comforts zones.

## Project Checklist

* Instruction section                                                           
* Appropriate use of styling                                               
* Game fully functional                                                        
* Implemented DRY Practices                                                
* Proper HTML/JS/CSS Code Standards (Indentation, spacing, naming conventions)
* Good Quality Markdown                                                    
* Fully Git Tracked/Synced with Github                             
* Fully prepared showcase

## Functionality

This project is a 2-player game where each player must defend their goal and try to score against their opposition. Inspired from games such as "Pong" and "BrickBreaker", a contantly moving ball bounces around the pitch, colliding with the boundaries and players alike. This changes it's directions (4 in total, each a diagonal) and the players must predict the trajectory of the ball to succeed.

This project uses Semantic HTML, plain CSS and JavaScript with jQuery. These languages made it possible to add style and interaction in the web browser. HTML and CSS we used to design all the visuals, from the pitch and players to the insturctions and title. JavaScript was used to add interactions in the game as well as aidng browser capabilities such as reload abilities and winning conditions.

## Challenges
As a first programming project, there were many new areas which had to be delved into, and with this new experience brought a few challenges.  
The method (a function that is attached to an object, in the case `window.setInterval(function, milliseconds) {}`) played a large part in this game. Player movements and all collisions were based on this method as a constantly updated information about position needed to be stored and manipulated and this method coupled with `clearInterval` were fundamental.  

The second challenge was making the character movement quite smooth. My first idea was, using the setInterval, to constantly check if the correct key was being pressed, and then react to it by targetting the css attribute to move it pixel by pixel. But this led to quite unstable movements and glitches.  
The better technique was to look for a 'keyDown' press and assign it to an array. Then as long as the code is in the array then the movement continues. Then one the 'keyUp' is registered, that key is then removed from the array and the movement is stopped.
    
```
  $(document).keydown(function(e) {
    event.preventDefault();
    keys[e.keyCode] = true;
  });

  $(document).keyup(function(e) {
    delete keys[e.keyCode];
``` 
This lead to much smoother movements and in turn a much more visually appealing game.

## Usage
### Acesss

1. Access to this repo:

```
https://github.com/NIOfonagoro/Sparta-Core-Project-1

```


2. Clone this repo from the "dev" branch. 

```
git clone git@github.com:NIOfonagoro/Sparta-Core-Project-1.git

```

## Future Work
Two Agile sprints have led to the production of this project. A future third spirnt would entail the following user stories.  

1. As a user, i want the ball the have a friction trait to more accurately resemble real-life.

2. As a user I want to be able to choose between dribbling with the ball or shooting

3. As a user, I want to be able to collide with the opposition.

4. As a user, I want to be able to customize my team name/appearance before the start of a match