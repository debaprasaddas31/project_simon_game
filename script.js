
var colors = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userPattern = [];

var flag = false;

var level = 0;

$(document).keypress(function(){
    if(!flag){
        flag = true;
        gamePattern = [];
        nextColor();
    }
});

function nextColor(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNum = Math.floor(Math.random() * 4);
    var randomColor = colors[randomNum];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var mySound = new Audio("./sounds/" + randomColor + ".mp3");
    mySound.play();
    userPattern = [];
}


$(".btn").click(function(){
    var selectedColor = $(this).attr("id");
    userPattern.push(selectedColor);
    $("#" + selectedColor).addClass("pressed");
    setTimeout(function(){
        $("#" + selectedColor).removeClass("pressed");
    }, 100);
    for(var i = 0; i < userPattern.length; i++){
        if(gamePattern[i] !== userPattern[i]){
            flag = false;
            level = 0;
            $("body").addClass("game-over");
            $("#level-title").text("GAME OVER!! Press Any Key To Restart...");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 100);
            var mySound = new Audio("./sounds/wrong.mp3");
            mySound.play();
            break;
        }
    }
    
    if(flag){
        var mySound = new Audio("./sounds/" + selectedColor + ".mp3");
        mySound.play();
    }

    if(flag && gamePattern.length === userPattern.length){
        setTimeout(function(){
            nextColor();
        }, 1000);
    }
});


