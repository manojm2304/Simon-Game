var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;


$(document).keypress(function(){
    if(!started) {
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
    // starting condition code ka.
});

$(".btn").click(function(){
    // iss command se hume yeh pata chalega ki kaunsa button click kiya gaya hai.
    
    var userChosenColour = $(this).attr("id");
    /* so basically idhar click(function) main jaunsa button k upar click kiye 
    honge uske details ko "this" pointer point karega. So hum udhar se apna 
    attributes k detai  ls nikal rahe hai jo ki humare case main #id hai. Noice.*/
    
    userClickedPattern.push(userChosenColour);
   /*I think yeh array humare steps ko record karega taaki order of colours/pattern
    agar sahi se nai aaya user k next step main then game over ho jayega.*/
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
        /* Yaha pe humara gamePattern wale array ko userClickedPattern k saath match kiya
        ja raha hai. Agar match hua toh next random sequence generate karne k liye nextSequence 
        ko call kiya ja raha hai.*/ 
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press any key to restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
    /* yaha pe humara if case fail hone se/pattern mismatch hone k vajah se error ho 
    gaya hoga toh gameOver display hoga aur restart karne k liye game hum startOver() ka
    use kar rahe hai. */ 
}

function nextSequence(){
    userClickedPattern = [];
    // isme user ka clicking pattern save hoga 
    level++;
    // change in level ek ek click k baad
    $("#level-title").text("Level " + level);
    // yeh display main show karega ki kaunsa level chal raha ha

    var randomNumber = Math.floor(Math.random() * 4);
    /* idhar ek random number generate kar rahe hai between 0-3 jo ki buttonColours 
    main se colour choose karne main use hoga */
    
    var randomChosenColour = buttonColours[randomNumber];
    /* abhi buttonColours array main jo colors hai unme se hum koi ek colour 
    chose karenge jo ki randomNumber k position pe hoga */
    
    gamePattern.push(randomChosenColour);
    /*randomly jo generate ho raha hai woh he toh main pattern hai jisko ki
    user follow karega. Woh actual pattern yaha pe store ho raha hai.*/ 
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // so yeh woh animation hai jo ki show karega kaunsa block user ko click karna hai.
    
    playSound(randomChosenColour);
    // isse humare randomly chosen colour k against jo humne audio rakha hai woh bajega.
}

function startOver() {
    /* yeh wh function hai jo tab trigger hoga jab userClickedPattern aur gamePattern
    mismatch hoga */ 
    level = 0;
    // level reset hoke 0 pe aa jayega
    gamePattern = [];
    // pattern reset ho k phirse emmpty array ho jayega
    started = false;
    // started ka status false ho jayega yaani game start he nua hua hai show karega.
}

function playSound(name) {
    // iss function se hum humare desired clicks/actions ko audio de rahe hai.
     var audio = new Audio("sounds/"+ name + ".mp3");
     //customising the audio format humare audio k saved name k hisab se.
     audio.play();
    // selected audio play karne k liye command.
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    /* colour id k hisab se hum additional class "pressed" add kar rahe hai
    jo ki block ko click karne par ek boxy animation dega. */ 
    
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
    /*iss wale jagah pe humne yeh kiya hai ki currentColour wale id main jaha sab
    humne class add kiya tha usko remove karenge after 100 milliseconds jo ki humko
    ek chota sa animation jaisa output dega.*/ 
}