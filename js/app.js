
let cards = [];
let flippedCards = [];
let numOfMoves = 0;
let noOfMatchedCards = 0;
let sec = 0;
let min = 0;
let gameStart = true;
let endOfGame = false;
let gameTimer;

let timerContainer = document.querySelector(".timer");
let popup = document.querySelector(".popup");

//shuffle cards.
function shuffleCards(){
    let deck = document.querySelector('.deck');
    for (let i = deck.children.length; i >= 0; i--) {
        deck.appendChild(deck.children[Math.floor(Math.random() * i)]);
    }
    cards = document.querySelectorAll(".card");
}

// Function to update the rating 'stars' based on the moves made.
function rating(numOfMoves){
    let firstStar  = document.querySelector('.first-star');
    let secondStar = document.querySelector('.second-star');
    let thirdStar  = document.querySelector('.third-star');

    if(numOfMoves === 0){
        firstStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        secondStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        thirdStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        firstStar.classList.add("fa-star");
        secondStar.classList.add("fa-star");
        thirdStar.classList.add("fa-star");
    }else if (numOfMoves > 8 && numOfMoves < 12){
        firstStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        secondStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        thirdStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        firstStar.classList.add("fa-star");
        secondStar.classList.add("fa-star");
        thirdStar.classList.add("fa-star");
    }else if(numOfMoves > 12 && numOfMoves < 16){
        firstStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        secondStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        thirdStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        firstStar.classList.add("fa-star");
        secondStar.classList.add("fa-star");
        thirdStar.classList.add("fa-star-half-o");
    }else if(numOfMoves > 16 && numOfMoves < 20){
        firstStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        secondStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        thirdStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        firstStar.classList.add("fa-star");
        secondStar.classList.add("fa-star");
        thirdStar.classList.add("fa-star-o");
    }else if(numOfMoves > 20 && numOfMoves < 25){
        firstStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        secondStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        thirdStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
         firstStar.classList.add("fa-star");
        secondStar.classList.add("fa-star-half-o");
        thirdStar.classList.add("fa-star-o");
    } else if(numOfMoves > 25){
        firstStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        secondStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        thirdStar.classList.remove("fa-star-o", "fa-star-half-o", "fa-star");
        firstStar.classList.add("fa-star");
        secondStar.classList.add("fa-star-o");
        thirdStar.classList.add("fa-star-o");
    }
}

//Update number of pair of cards flipped.
function updateNoOfMoves() {
    document.getElementsByClassName("moves")[0].innerHTML = numOfMoves + " Moves";
}

//Check if player has matched all cards, if yes stop the timer and set a flag 
// to true
function checkAllCardsMatched(noOfMatchedCards){
    if ((noOfMatchedCards * 2) === cards.length){
        clearInterval (gameTimer);
        endOfGame = true;
    }
}

//Close unmatched cards if they do not match, with a timedelay of 5ms
// also lock the all cards during this duration so that user is unable to
//click on any cards.
function closeUnmatchedCards( prevCard, currentCard){
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add("lock-card");
    }

    setTimeout(function(){
        prevCard.classList.remove("open", "show");
        currentCard.classList.remove("open", "show");
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove("lock-card");
        }
    }, 500);
}

//Check if tow cards match
function compareCards(currentCard,prevCard) {
    if (currentCard.innerHTML === prevCard.innerHTML) {
        prevCard.classList.add("match");
        currentCard.classList.add("match");
        noOfMatchedCards++;
        checkAllCardsMatched(noOfMatchedCards);
    } else {
        closeUnmatchedCards(prevCard, currentCard);
    }
    numOfMoves++;
    updateNoOfMoves(numOfMoves);
    rating(numOfMoves);

    if(endOfGame){
        togglePopup();
    }
    //clear all cards flipped
    flippedCards = [];
}

//Update the Game timer and display it in score panel
function setGameTimer (){
    if(gameStart){
        gameTimer = setInterval(function(){
            sec++;
            if(sec === 60){
                min++;
                sec = 0;
            }
            timerContainer.innerHTML = " : " + min.toLocaleString(undefined,{minimumIntegerDigits: 2}) + ":" + sec.toLocaleString(undefined,{minimumIntegerDigits: 2});
        },1000);
    }
}

//Start the game with players first click on a card
function startGame(){
    shuffleCards();
    
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function(){
            let prevCard = flippedCards[0];
            let currentCard = this;

            if(gameStart){
                setGameTimer();
                gameStart = false;
            }

            if (flippedCards.length === 1) {
                cards[i].classList.add("open","show");
                flippedCards.push(this);
                compareCards(currentCard,prevCard);
            } else {
                cards[i].classList.add("open","show");
                flippedCards.push(this);
            }
        });
    }
}

// Reset all game parameters.
function resetGame(){
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("match", "open", "show");
    }

    flippedCards = [];
    noOfMatchedCards = 0;
    numOfMoves = 0;
    clearInterval (gameTimer);
    min = 0;
    sec = 0;
    timerContainer.innerHTML = " 00:00 ";
    updateNoOfMoves(numOfMoves);
    rating(numOfMoves);
    gameStart = true;
    endOfGame = false;
}

//Display a pop-up with score values i.e. time taken, moves made and stars earned
function togglePopup() {
    let stars  = document.querySelector('.stars');
    let movesMade = document.querySelector(".num-of-moves");
    let timeTaken = document.querySelector(".time-taken");
    let starsEarned = document.querySelector(".stars-earned");

    movesMade.innerHTML = "Moves made: " + numOfMoves;
    timeTaken.innerHTML = "Time taken: " + min.toLocaleString(undefined,{minimumIntegerDigits: 2}) +"mins " + sec.toLocaleString(undefined,{minimumIntegerDigits: 2}) + "secs";
    starsEarned.innerHTML = stars.innerHTML ;

    popup.classList.toggle("show-popup");
}

//remove popup and reset game once player clicks on "Play Again" button.
function playAgainBtnTrigger(){
    let playAgain = document.querySelector(".play-again-btn");

    playAgain.addEventListener("click",function(){
        togglePopup();
        resetGame();
    });
}

//function to implement pop-up controls i.e. close buttons and play again button
//aslo close pop-up when user clicks on the window outside the pop-up
function popUpControls(){
    let closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", togglePopup);

    playAgainBtnTrigger();

    function windowOnClick(event) {
        if (event.target === popup) {
            togglePopup();
        }
    }
    window.addEventListener("click", windowOnClick);
}

// Reset all game parameters when 'Reset' button is clicked by an user.
function resetBtnTrigger(){
    const resetBtn = document.querySelector(".restart");
    resetBtn.addEventListener("click", resetGame);
}

// Game starts
startGame();
resetBtnTrigger();
popUpControls();
