const cards = document.querySelectorAll(".media"); //grabbing cards container.
const startButton = document.querySelector(".start"); //grabbing start button to start game.
const resetButton = document.querySelector(".restart");
const modalContainer = document.querySelector(".modal");
const loserModal = document.querySelector(".loser-modal")
const playAgain = document.querySelector(".play-again");
const loserButton = document.querySelector(".play-again-loser")
const modalTime = document.querySelector(".modal-timer");
let firstFlip;
let secondFlip;
let cardHasFlipped = false; 
let boardLock = false;
let first = false;
let second = false;
let matchedCards = [];
let num = 0;
const timer = document.querySelector("#timer");
let ms = 0;
let sec = 0;
let min =0;
let countItUp;
let timerOn = false;
let flipNums = 0;
isModal = false;

// --------------------------------------------------------------------------------------------------------
//this will shuffle upon page loading
window.onload = shuffle(); 
function shuffle(){
    cards.forEach(card=>{
        let shuffleBoard = Math.floor(Math.random() * 12);
        card.style.order = shuffleBoard;
    })
}
// --------------------------------------------------------------------------------------------------------

//function call to start playing the game. 
function flip(){
    if (timerOn === false) return; //if timer is false than the board is unplayable and will exit the function 
    if (boardLock === true) return;
    if (isModal === true) return;
    timerOn === true; //the timer has started game is unlocked.
    this.classList.add('flip'); 
    //first flip
     if (!cardHasFlipped){
        cardHasFlipped = true;
        firstFlip = this;  
    }
    //second flip
    else {
    cardHasFlipped = false;
    secondFlip = this;
    checkForMatch(); 
    }
    //checking flips for a match
  
}

//checking for match function
function checkForMatch(){
if (firstFlip.dataset.name === secondFlip.dataset.name){
matchedCards.push(firstFlip);
matchedCards.push(secondFlip); 
match(); //sent to match funciton
}else 
noMatch(); //sent to no match function
}

function match(){
    firstFlip.removeEventListener('click', flip); //this card can no longer flip
    secondFlip.removeEventListener('click', flip);
    if (matchedCards.length === 12) // checks to see if new array is filled with amount of cards. If yes, game is over. 
    {
        
        gameOverMenu();
        pauseIt(); // this will stop timer once game is over. Modal will appear with score.

    }
    
}
function noMatch(){
    boardLock = true; //board is unclickable until cards are flipped back over
    setTimeout(()=>{
        firstFlip.classList.remove('flip'); //flip is rmoved from class list so that the card will flip back over
        secondFlip.classList.remove('flip'); 
    boardLock = false; //board is unlocked now that cards have been flipped back over. 
    }, 1000);  
   
}

// modal will pop up
function gameOverMenu(){
    isModal = true;
modalContainer.classList.add('show');
startNew(); //this function is necessary to allow the modal button to work in order for user to restart game and exit screen.
}
//Function below will allow user to begin a new game and modal will fade out.
function startNew(){
    playAgain.addEventListener('click', () =>{
        modalContainer.classList.remove('show')
        isModal = false;
        resetMe();
        });    
}

function loser(){
    isModal = true;
    loserModal.classList.add('pop');
    startNewGame();
}
function startNewGame(){
    loserButton.addEventListener('click', () =>{
        loserModal.classList.remove('pop');
        isModal = false;
        resetMe();
        });    
}

//starts the very first game
cards.forEach(card => card.addEventListener('click', flip))
//starts new game
function newGame(){
    cards.forEach(card => card.addEventListener('click', flip));
}

// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// Below is the programming required for the stopwatch to run

function runTime(){
    if (timerOn === true) return;
    timerOn = true;
countItUp = setInterval(stopWatch, 10); //sets the speed at which we want to call the stopwatch function
}

function stopWatch(){
    if (min === 1)
    {
        pauseIt();
        loser();
        return;
    }
    ms++;
   if (sec < 10)
   {
    timer.innerHTML = "0" + min + ":" + "0" + sec; 
   }
   else if(min < 10)
   {
    timer.innerHTML = "0" + min + ":" + sec; 
   }
   else
    timer.innerHTML = min + ":" + sec + ":" + ms; //I only want to count seconds as i will add make the game only go to 1 minute
    modalTime.innerHTML = sec;
    if (ms / 100=== 1) 
    {
       
        sec++;
        ms = 0;
        
        if (sec / 60 === 1)
        {    
            min++;
            sec = 0;
           
        }
    }

   }

   function pauseIt() {
       clearInterval(countItUp);
       timerOn = false;
       
   }

   function resetMe() {
       if(isModal === true) return;
    boardLock = false;
    timerOn = false;
    clearInterval(countItUp);
       ms = 0;
       sec = 0;
       min = 0;
       modalTime.innerHTML = min + ":" + sec;
       timer.innerHTML = "0" + min + ":" + "0" + sec; 
       cards.forEach(card => card.classList.remove('flip'));
       matchedCards = [];
       firstFlip = null;
       secondFlip = null;
       shuffle();
       newGame();
  }

  startButton.addEventListener('click', runTime);
  resetButton.addEventListener('click', resetMe);

  
    