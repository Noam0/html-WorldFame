import Deck from "./Deck.js"
const gamePlate = document.getElementById('gamePlate');
gamePlate.style.display = 'none'
let placementArray = [0 , 0 , 0 , 0 , 0]
let valuesOfCardArray = [] 
let arrayOfCard = [];
let numOfCardsDrawn = 0;

const gamePlayButton1 = document.getElementById('gamePlayButton1');
const gamePlayButton2 = document.getElementById('gamePlayButton2');
const gamePlayButton3 = document.getElementById('gamePlayButton3');
const deckImage = document.getElementById('deck');
const errorTextVar = document.getElementById('errorText');

let numberOfStage = 1;

//var for first stage
let chosenColor = null;
let colorChosen = false;


//vars for second stage
let upperLowerButton = null;
let upperLowerButtonWasChosen = false;

//var for third stage
let upperLowerBetweenButton = null;
let upperLowerBetweenButtonWasChosen = false;

//vars for the fourth stage 
let suitButton = null;
let suitButtonWasChosen = false;

//vars for the fifth stage 
let currentNumber = 1;


//CREATE NEW DECK AND SHUFFLE IT:
const deck = new Deck();
deck.shuffle();

// Define the game stages as states
const STAGE_1 = 1;
const STAGE_2 = 2;
const STAGE_3 = 3;
const STAGE_4 = 4;
const STAGE_5 = 5;

// Initialize the game state to the first stage
let currentStage = STAGE_1;

// Event listener for the deckImage button
deckImage.addEventListener('click', handleDeckImageClick);

// Start the game

playGame();

function playGame() {
  // Call the first stage setup when the game starts
  firstStageSetup();
}

function handleDeckImageClick() {
  // Based on the current stage, call the corresponding stage handler
  switch (numberOfStage) {
    case STAGE_1:
      if(handleStageOneClick()){
        numberOfStage++;
        secondStageSetup();
      }else{
         if(chosenColor){
        wrongAnswerSetup();
         }
      }
      break;
    case STAGE_2:
      if(handleStageTwoClick()){
        numberOfStage++;
        console.log("Moved to stage:", numberOfStage);
        thirdStageSetup();
      }else{
        if(upperLowerButton){
        wrongAnswerSetup();
        }
      }
      break;
    case STAGE_3:
      if(handleStageThreeClick()){
        fourthStageSetup();
        numberOfStage++;
      }else{
        if(upperLowerBetweenButton){
          wrongAnswerSetup();
          }
      }
      break;
    case STAGE_4:
      if(handleStageFourClick()){
        numberOfStage++;
        fithStageSetup();
      }else{
        if(suitButton){
          wrongAnswerSetup();
          }
      }
     
      break;
    case STAGE_5:
      if(handleStageFiveClick()){
        //WinnerFunction
      }else{
          wrongAnswerSetup();
      }
      break;
    default:
      console.log("Invalid stage!");
  }
}


//-- draw card function -- 
function drawCard() {
    if (deck.cards.length === 0) {
      alert('The deck is empty. No more cards to draw.');
      return;
    }
  
    // Find the next available position to display the card
    const nextPosition = placementArray.indexOf(0);
    if (nextPosition === -1) {
      alert('All positions are filled. No more cards can be drawn.');
      return;
    }
  
    // Draw a card from the deck and remove it from the array
    const card = deck.cards.pop();
  
    // Display the card image
    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    cardImage.alt = `${card.value} of ${card.suit}`;
  
    // Clear the previous card if any, and append the new card image to the container
    const cardContainer = document.getElementById(`card${nextPosition + 1}`);
    cardContainer.innerHTML = '';
    cardContainer.appendChild(cardImage);
    // Update the placementArray to mark the current position as filled
    placementArray[nextPosition] = 1;
    numOfCardsDrawn++;
    arrayOfCard[numOfCardsDrawn] = card;
    console.log("the card that was draw:", arrayOfCard[numOfCardsDrawn])
   return card;

  }


  function showError(stage) {
    switch (stage) {
        case 1:
          errorTextVar.textContent = 'Please choose a color (Red or Black) before drawing a card.';
            break;
        case 2:
          errorTextVar.textContent = 'Please choose a upper or lower button before drawing a card.'; // Replace with specific error message
            break;
        case 3:
          errorTextVar.textContent = 'Please choose a upper/between/lower button before drawing a card.'; // Replace with specific error message
            break;
        case 4:
          errorTextVar.textContent = 'Please choose suit before drawing a card.'; // Replace with specific error message
            break;    
        // Add more cases for different stages if needed
        case 5:
          errorTextVar.textContent =  'make sure you choose one card value.'
            break; 
        default:
          errorTextVar.textContent = 'An error occurred. Please try again.';
    }
    errorTextVar.style.display = 'block'
}

//animation for the stage number popup
function animateStagePopup(stageNumber) {
  const stagePopup = document.getElementById('stagePopup');
  stagePopup.textContent = `STAGE ${stageNumber}`;
  stagePopup.style.opacity = 0; // Start with low opacity
  stagePopup.style.fontSize = '20px'; // Start with small font size
  stagePopup.style.display = 'block';

  // Animate fade-in and size increase
  let opacity = 0;
  let fontSize = 150;
  const animationInterval = setInterval(() => {
    opacity += 0.05;
    fontSize += 1;
    stagePopup.style.opacity = opacity;
    stagePopup.style.fontSize = `${fontSize}px`;

    if (opacity >= 1) {
      clearInterval(animationInterval);
      setTimeout(() => {
        stagePopup.style.display = 'none';
      }, 1000); // Display for 1 second after animation
    }
  }, 50); // Animation interval in milliseconds
}


//----restart function----- :
function restart(){
  firstStageSetup();
  unmarkButton(gamePlayButton1)
  unmarkButton(gamePlayButton3)
  const stageTextElement = document.querySelector('.stageText');
  stageTextElement.textContent = 'what is the next card color';


for (let i = 0; i < placementArray.length; i++) {
  const cardContainer = document.getElementById(`card${i + 1}`);
  cardContainer.innerHTML = ''; // Clear the card image
}

gamePlayButton4.style.display = 'none'


 placementArray = [0 , 0 , 0 , 0 , 0]
 valuesOfCardArray = [] 
 arrayOfCard = [];
 numOfCardsDrawn = 0;

   numberOfStage = 1;
  //var for first stage
   chosenColor = null;
   colorChosen = false;
  //vars for second stage
   upperLowerButton = null;
   upperLowerButtonWasChosen = false;
  
  //var for third stage
   upperLowerBetweenButton = null;
   upperLowerBetweenButtonWasChosen = false;
  
  //vars for the fourth stage 
   suitButton = null;
   suitButtonWasChosen = false;
  
  //vars for the fifth stage 
   currentNumber = 1;
   

  deck = new Deck();
  deck.shuffle();   


}


const restartImage = document.getElementById('restartButton');
restartImage.addEventListener('click', () =>{
  restart();
 
});



//-------when user guess wrong:-------------

function wrongAnswerSetup(){
  const wrongAnswerPopup = document.getElementById('wrongAnswerPopup');
  const popupClose = document.getElementById('popupClose');
  const restartButtonPopup = document.getElementById('restartButtonPopup');

  // Open the popup
  wrongAnswerPopup.style.opacity = 0;
  wrongAnswerPopup.style.display = 'block';
  
  // Set a timeout to trigger the animation after a short delay
  setTimeout(() => {
    wrongAnswerPopup.style.opacity = 1;
  }, 100); // Delay of 100 milliseconds


  
  restartButtonPopup.addEventListener('click', () => {
    wrongAnswerPopup.style.display = 'none';
    restart();
    
  });

}



  //--------- first stage -----------------

  //setting the view before the first stage begins
function firstStageSetup(){
  //animateStagePopup(1)
  gamePlayButton2.style.display = 'none'
  gamePlayButton1.textContent = 'Red'
  gamePlayButton3.textContent = 'Black'
  
  gamePlayButton1.addEventListener('click', () => {
    errorTextVar.style.display = 'none'
    chosenColor = 'red';
    colorChosen = true;
    markButton(gamePlayButton1);
    unmarkButton(gamePlayButton3);
});

gamePlayButton3.addEventListener('click', () => {
  errorTextVar.style.display = 'none'
  chosenColor = 'black';
  colorChosen = true;
  markButton(gamePlayButton3);
  unmarkButton(gamePlayButton1);


});

}




function markButton(button ){
  button.style.backgroundColor = 'Gold';

}

function  unmarkButton(button) {
  button.style.backgroundColor = '';
}

function handleStageOneClick() {
  if (!colorChosen) {
    showError(1);
  } else {
    const card = drawCard();
    if ((card.suit === 'hearts' || card.suit === 'diamonds') && (chosenColor === 'red')) {
      valuesOfCardArray[0] =card.value;
      //numberOfStage++;
      console.log("right in stage one");
      return true;
    } else if ((card.suit === 'clubs' || card.suit === 'spades') && (chosenColor === 'black')) {
      //numberOfStage++;
      valuesOfCardArray[0] =card.value; 
      console.log("right in stage one");
      return true;
    } else {
      console.log("wrong in stage one");
      return false;
    }
  }

}

  //--------- Second stage -----------------

  //----- Second stage  setup------
  function secondStageSetup(){

    const stageTextElement = document.querySelector('.stageText');
    stageTextElement.textContent = 'The next card value is upper or lower than the last card?';
    gamePlayButton2.style.display = 'none'
    gamePlayButton1.textContent = 'Upper'
    gamePlayButton3.textContent = 'Lower'
    errorTextVar.style.display = 'none'
    
    unmarkButtonStage2(gamePlayButton1)
    unmarkButtonStage2(gamePlayButton3);
  ;
  
    
    gamePlayButton1.addEventListener('click', () => {
      errorTextVar.style.display = 'none'
      upperLowerButton = 'upper';
      upperLowerButtonWasChosen = true;
      markButtonStage2(gamePlayButton1);
      unmarkButtonStage2(gamePlayButton3);
  });
  
  gamePlayButton3.addEventListener('click', () => {
    errorTextVar.style.display = 'none'
    upperLowerButton = 'lower';
    upperLowerButtonWasChosen = true;
    markButtonStage2(gamePlayButton3);
    unmarkButtonStage2(gamePlayButton1);
  });
  
  }
  
  function  markButtonStage2 (button) {
    button.style.backgroundColor = 'Gold';
  }

  function  unmarkButtonStage2 (button) {
    button.style.backgroundColor = 'black';
  }


  function handleStageTwoClick() {
    if (!upperLowerButtonWasChosen) {
      showError(2);
    } else {
      console.log("im in stage: ", numberOfStage)
      const card2 = drawCard();
      console.log("right now - upper lower button variable = ", upperLowerButton)
      console.log("the last value:", valuesOfCardArray[0], "the new card the was drawn : " , card2.value )
      valuesOfCardArray[1] = card2.value;

      const lastCardValue = parseInt(valuesOfCardArray[0]);
      const newCardValue = parseInt(valuesOfCardArray[1]);

      if(newCardValue> lastCardValue){
        console.log("the new card is bigger than last card");
      }else{
        console.log("the new card is smaller than last card");
      }


      if ((newCardValue > lastCardValue) && (upperLowerButton === 'upper')) {
        console.log(upperLowerButton)
        // If the card's value is greater than the first card and the user guessed 'upper'
        //numberOfStage++;
        console.log('right in stage two');
        return true;
      } else if ((newCardValue < lastCardValue) && (upperLowerButton === 'lower')) {
        console.log("the card in the array is : " , valuesOfCardArray[0])
        // If the card's value is less than the first card and the user guessed 'lower'
        //numberOfStage++;
        console.log('right in stage two');
        return true;
      } else {
        console.log('wrong in stage two');
        return false;
        
      }
     
    }
  } 


  //---- third stage setup ------
  function thirdStageSetup(){
    const stageTextElement = document.querySelector('.stageText');
    stageTextElement.textContent = 'The next card value is upper or lower than the two last card?, or between the last two cards';
    stageTextElement.style.fontSize = '35px';
    gamePlayButton2.style.display = 'inline-block'; // Set display to 'inline-block'
    gamePlayButton2.textContent = 'Between'
    gamePlayButton1.textContent = 'Upper'
    gamePlayButton3.textContent = 'Lower'
    errorTextVar.style.display = 'none'
    gamePlayButton1.style.backgroundColor = 'black';
    gamePlayButton2.style.backgroundColor = 'black';
    gamePlayButton3.style.backgroundColor = 'black';;
    unmarkButtonStage3(gamePlayButton1)
    unmarkButtonStage3(gamePlayButton2);
    unmarkButtonStage3(gamePlayButton3);
    

    



  gamePlayButton1.addEventListener('click', () => {
    errorTextVar.style.display = 'none'
    upperLowerBetweenButton = 'upper';
    upperLowerBetweenButtonWasChosen = true;
    markButtonStage3(gamePlayButton1);
    unmarkButtonStage3(gamePlayButton3);
    unmarkButtonStage3(gamePlayButton2);

  });


  gamePlayButton2.addEventListener('click', () => {
    errorTextVar.style.display = 'none'
      upperLowerBetweenButton = 'between';
      upperLowerBetweenButtonWasChosen = true;
      unmarkButtonStage3(gamePlayButton1);
      markButtonStage3(gamePlayButton2);
      unmarkButtonStage3(gamePlayButton3);

  });
  
  gamePlayButton3.addEventListener('click', () => {
    errorTextVar.style.display = 'none'
    upperLowerBetweenButton = 'lower';
    upperLowerBetweenButtonWasChosen = true;
    markButtonStage3(gamePlayButton3);
    unmarkButtonStage3(gamePlayButton1);
    unmarkButtonStage3(gamePlayButton2);
  
  });

  }

  function  markButtonStage3 (button) {
    button.style.backgroundColor = 'Gold';
  }

  function  unmarkButtonStage3 (button) {
    button.style.backgroundColor = 'black';
  }

  function setButtonColor(button) {
    button.style.backgroundColor = '#1A1A1A';
    button.style.color = 'white';
  }


  function handleStageThreeClick() {
    if (!upperLowerBetweenButtonWasChosen) {
      showError(3);
    } else {
     
      

      const card3 = drawCard();
      const firstCardValue = parseInt(valuesOfCardArray[0]);
      const secondCardValue = parseInt(valuesOfCardArray[1]);
      const thirdCardValue = card3.value
      valuesOfCardArray[2] = thirdCardValue

      console.log("the last value:", valuesOfCardArray[1], "the new card the was drawn : " , card3.value )
      if ((thirdCardValue > secondCardValue) && ( thirdCardValue > firstCardValue) && (upperLowerBetweenButton === 'upper')) {
        valuesOfCardArray[1] = card3.value;
        console.log('right in stage three');
        return true;
      } else if ((thirdCardValue < secondCardValue) && (thirdCardValue < firstCardValue) && (upperLowerBetweenButton === 'lower')) {
        console.log("the card in the array is : " , valuesOfCardArray[1])
        // If the card's value is less than the first card and the user guessed 'lower'
        valuesOfCardArray[1] = card3.value;
        console.log('right in stage three');
        return true;
      }else if (((thirdCardValue <secondCardValue)  && (thirdCardValue > firstCardValue )) && (upperLowerBetweenButton === 'between')) {
        valuesOfCardArray[1] = card3.value;
        console.log('right in stage three');
        return true;
      }else if (((thirdCardValue > secondCardValue)  && (thirdCardValue <firstCardValue )) && (upperLowerBetweenButton === 'between')) {       
        valuesOfCardArray[1] = thirdCardValue;
        console.log('right in stage three');
        return true;
      } else {
        console.log('wrong in stage three');
        return false;
      }
  
      // Update the first card value for the next comparison
      
    }
  } 



  //--------stage four setup ---------

  function fourthStageSetup(){

    const stageTextElement = document.querySelector('.stageText');
    stageTextElement.textContent = 'What is the symbol of the next card?';
    stageTextElement.style.fontSize = '38px';
    gamePlayButton2.style.display = 'inline-block'; // Set display to 'inline-block'
    gamePlayButton4.style.display = 'inline-block'; // Set display to 'inline-block'
    gamePlayButton1.textContent = '♣'; // Clubs symbol
    gamePlayButton2.textContent = '♦'; // Diamonds symbol
    gamePlayButton3.textContent = '♥'; // Hearts symbol
    gamePlayButton4.textContent = '♠'; // Spades symbol

    errorTextVar.style.display = 'none'
    gamePlayButton1.style.backgroundColor = 'black';
    gamePlayButton2.style.backgroundColor = 'black';
    gamePlayButton3.style.backgroundColor = 'black';
    gamePlayButton4.style.backgroundColor = 'black';
    unmarkButtonStage3(gamePlayButton1)
    unmarkButtonStage3(gamePlayButton2);
    unmarkButtonStage3(gamePlayButton3);
    unmarkButtonStage3(gamePlayButton4);
  
    
    gamePlayButton1.addEventListener('click', () => {
      errorTextVar.style.display = 'none'
      suitButton = 'clubs';
      suitButtonWasChosen = true;
      markButtonStage3(gamePlayButton1);
      unmarkButtonStage3(gamePlayButton3);
      unmarkButtonStage3(gamePlayButton2);
      unmarkButtonStage3(gamePlayButton4);
  
    });
  
  
    gamePlayButton2.addEventListener('click', () => {
      errorTextVar.style.display = 'none'
        suitButton = 'diamond';
        suitButtonWasChosen = true;
        unmarkButtonStage3(gamePlayButton1);
        markButtonStage3(gamePlayButton2);
        unmarkButtonStage3(gamePlayButton3);
        unmarkButtonStage3(gamePlayButton4);
  
    });
    
    gamePlayButton3.addEventListener('click', () => {
      errorTextVar.style.display = 'none'
      suitButton = 'hearts';
      suitButtonWasChosen = true;
      markButtonStage3(gamePlayButton3);
      unmarkButtonStage3(gamePlayButton1);
      unmarkButtonStage3(gamePlayButton2);
      unmarkButtonStage3(gamePlayButton4);
    
    });
 
    gamePlayButton4.addEventListener('click', () => {
      errorTextVar.style.display = 'none'
      suitButton = 'spades';
      suitButtonWasChosen = true;
      unmarkButtonStage3(gamePlayButton3);
      unmarkButtonStage3(gamePlayButton1);
      unmarkButtonStage3(gamePlayButton2);
      markButtonStage3(gamePlayButton4);


  });
}
  //--------stage four onClick ---------
 
  function handleStageFourClick() {
    if (!suitButtonWasChosen) {
      showError(4);
    } else {

      const card4 = drawCard();
      if(suitButton === 'hearts' && card4.suit === 'hearts' ){
        console.log("right in stage four")
        return true;
      }else if(suitButton === 'diamonds' && card4.suit === 'diamonds'){
        console.log("right in stage four")
        return true;
      }else if(suitButton === 'clubs' && card4.suit === 'clubs'){
        console.log("right in stage four")
        return true;
      }else if(suitButton === 'spades' && card4.suit === 'spades'){
        console.log("right in stage four")
        return true;
      }else{
        return false;
      }
     
    }
  } 


//--------stage five onClick ---------

  function fithStageSetup(){
    gamePlayButton1.style.display = 'none'; 
    gamePlayButton2.style.display = 'none'; 
    gamePlayButton3.style.display = 'none';
    gamePlayButton4.style.display = 'none'; 

    const stageTextElement = document.querySelector('.stageText');
  stageTextElement.textContent = 'What is the number of the next card?';
  stageTextElement.style.fontSize = '38px';

  const numberContainer = document.createElement('div');
  numberContainer.className = 'numberContainer';

  const decreaseButton = createArrowButton('decrease');
  const numberDisplay = document.createElement('div');
  numberDisplay.className = 'numberDisplay';
  numberDisplay.textContent = 'A'; // Initial value is set to 'A'
  const increaseButton = createArrowButton('increase');

  numberContainer.appendChild(decreaseButton);
  numberContainer.appendChild(numberDisplay);
  numberContainer.appendChild(increaseButton);

  const interactiveDiv = document.querySelector('.row.interactive');
  interactiveDiv.appendChild(numberContainer);

  currentNumber = 1;

  decreaseButton.addEventListener('click', () => {
    currentNumber = Math.max(1, currentNumber - 1); // Prevent going below 1
    numberDisplay.textContent = getNumberValue(currentNumber);
  });

  increaseButton.addEventListener('click', () => {
    currentNumber = Math.min(13, currentNumber + 1); // Prevent going above 13
    numberDisplay.textContent = getNumberValue(currentNumber);
  });

  function createArrowButton(direction) {
    const arrowButton = document.createElement('button');
    arrowButton.className = `arrowButton ${direction}`;
    arrowButton.textContent = direction === 'increase' ? '▲' : '▼';
    return arrowButton;
  }

  function getNumberValue(number) {
    switch (number) {
      case 1:
        return 'A';
      case 11:
        return 'J';
      case 12:
        return 'Q';
      case 13:
        return 'K';
      default:
        return number.toString();
    }
  }

}


function handleStageFiveClick(){
  const card5 = drawCard();
  const card5Value = parseInt(card5.value);


  if(card5Value === currentNumber){
    console.log("you have just won world fame my friend")
    return true;
    
  }else{
    return false;
  }

}