
let cards = [];
let flippedCards = [];
let numOfMoves = 0;
let noOfMatchedCards = 0;
let sec = 0;
let min = 0;
let timerContainer = document.querySelector(".timer");
let popup = document.querySelector(".popup");
let gameStart = true;
let gameTimer;

function shuffleCards(){
    let deck = document.querySelector('.deck');
    for (let i = deck.children.length; i >= 0; i--) {
        deck.appendChild(deck.children[Math.floor(Math.random() * i)]);
    }
    cards = document.querySelectorAll(".card");
}

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

function updateNoOfMoves() {
    document.getElementsByClassName("moves")[0].innerHTML = numOfMoves + " Moves";
}

function closeUnmatchedCards( prevCard, currentCard){
    setTimeout(function(){
        prevCard.classList.remove("open", "show");
        currentCard.classList.remove("open", "show");
    }, 600);
    return prevCard, currentCard;
}

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

function popUpControls(){
    let closeButton = document.querySelector(".close-button");
    let playAgain = document.querySelector(".play-again-btn");

    closeButton.addEventListener("click", togglePopup);

    function playGameAgain(){
        resetGame();
        togglePopup();
    }
    playAgain.addEventListener("click",playGameAgain);

    function windowOnClick(event) {
        if (event.target === popup) {
            togglePopup();
        }
    }
    window.addEventListener("click", windowOnClick);
}


function checkAllCardsMatched(noOfMatchedCards){
    if ((noOfMatchedCards * 2) === cards.length){
        clearInterval (gameTimer);
        togglePopup();
    }
}

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
    flippedCards = [];
}

function setGameTimer (){
    console.log("Gamestart" + gameStart);
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

function startGame(){
    shuffleCards();
    console.log("enter");
    
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
        })
    }
}

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
}

function resetBtnTrigger(){
    const resetBtn = document.querySelector(".restart");
    resetBtn.addEventListener("click", resetGame);
}

startGame();
resetBtnTrigger();
popUpControls();
