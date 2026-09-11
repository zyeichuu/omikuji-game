const drawButton = document.getElementById("drawButton");
const playAgainButton = document.getElementById("playAgainButton");

const startScreen = document.getElementById("startScreen");
const resultScreen = document.getElementById("resultScreen");

const omikujiBox = document.getElementById("omikujiBox");
const fortuneImage = document.getElementById("fortuneImage");
const message = document.getElementById("message");


const fortunes = [

    "assets/Excellent Fortune.png",

    "assets/Fortune.png",

    "assets/Future Fortune.png",

    "assets/Good Fortune.png",

    "assets/Small Fortune.png"

];


drawButton.addEventListener("click", function () {

    message.textContent = "Drawing your fortune...";

    drawButton.disabled = true;

    omikujiBox.src = "assets/Omikuji Box and Stick Amended.png";
    
    omikujiBox.classList.add("shake");


    setTimeout(function () {

        const randomNumber = Math.floor(
            Math.random() * fortunes.length
        );

        const selectedFortune = fortunes[randomNumber];

        omikujiBox.classList.remove("shake");

        fortuneImage.src = selectedFortune;


        startScreen.classList.add("hidden");

        resultScreen.classList.remove("hidden");


        drawButton.disabled = false;

    }, 2000);

});


playAgainButton.addEventListener("click", function () {

    resultScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");


    omikujiBox.src = "assets/Omikuji Box Amended.png";

    message.textContent = "";

});