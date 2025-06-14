var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started=1;
var level=0;

document.addEventListener("keydown", function(){       
     if(started) {                                       //the game will start only from the first keypress
        $("#level-title").text("Level " + level);        //after the game starts h1 tag will change           
        nextSequence();
        started = 0;                                     //after the keypress, subsequent keypresses wont have any effect 
     }
    });


$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");     //get the ID of tnhe clicked buttons

    userClickedPattern.push(userChosenColour);          //add the IDs of clicked buttons to this array 
 
    playSound(userChosenColour);            //play the sound of the selected colour

    animatePress(userChosenColour);        //for animation on button whenever it's clicked

    checkAnswer(userClickedPattern.length-1);       //pass on the last index of (userClickedPattern)
});    
  

function nextSequence()
{ 
    userClickedPattern = [];        //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.

    level ++;
    $("#level-title").html("Level" + " " + level);
    
    
    var randomNumber = Math.floor(Math.random()*4);    // generate no. from 0 to 3 
    
    var randomChosenColour = buttonColours[randomNumber];    

    gamePattern.push(randomChosenColour);                   //add the colors of randomly chosen button to this array 
                                       
    playSound(randomChosenColour);    //play sound for randomly chosen button
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);     //flash animation for randomly chosen button   
}

 
function playSound(name){
 
    var audio = new Audio("sounds/" + name + ".mp3");       //play the sound of the selected colour
    audio.play(); 
} 
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");          //add the 'pressed' class on the clicked button 

    setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");         //remove the 'pressed' class from the clicked button after 100ms
    }, 100);
} 


function checkAnswer(currentLevel)
{ 
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    { 
        console.log("Success");

        if(gamePattern.length === userClickedPattern.length)      //If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
        {  
            setTimeout(function () {
          nextSequence();
        }, 1000);   
        }
    }
else { 
       console.log("Wrong"); 

       var audio = new Audio("./sounds/wrong.mp3");        //whenever user gets it wrong, play this sound         
       audio.play();

       $("body").addClass("game-over");

       setTimeout(function(){
       $("body").removeClass("game-over");              //this is for the backbground-animation when user gets it wrong
       },200); 
 
       $("h1").html("Game Over, Press Any Key to Restart"); 
       
       startOver();
    }
}


function startOver(){
    level = 0;
    gamePattern = [];      // make all these value as they were at the start
    started = 1;
}
 