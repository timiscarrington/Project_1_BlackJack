const startGameBtn = document.querySelector('#startGame')
const hitBtn = document.querySelector('#hit');
const standBtn = document.querySelector('#stand')


 
  
let cards={
    deck : [],
    suits: ['Clubs','Diamonds','Hearts','Spades'],
    values: ['A', '2', '3', '4', '5', '6', '7','8','9','10','J','Q', 'K'],
    
  }
const playerOne = {
    sumCards: 0,
    cards:[],
    
   
}
const dealer = {
    sumCards: 0,
    cards: [],
}

const startGame = () => {
    buildDeck();
    shuffle();
    deal();
    sumOfHand();
    sumOfDealer();
    displayPlayerHands();
}


const buildDeck = () => {
    
    for(let i=0; i < cards.suits.length; i++ ){
        for(j=0; j< cards.values.length; j++) {
            cards.deck.push(cards.values[j] + '-' + cards.suits[i])
        }
    }return cards.deck
}


const shuffle = () => {

    for(let i = cards.deck.length -1; i >0; i--){ // interates through array of cards in a descending order from 51-1
      const j = Math.floor(Math.random() * (i +1)) //gives a random number between 1-52
      let randoIndex = cards.deck[j]; //takes the random number and gets the element in the array at the random numbers position 
      cards.deck[j] = cards.deck[i]; //the random number index position is now placed in the index of [i] (first one would be at 51)
     cards.deck[i] = randoIndex //sets the card that is iterated in the loop to the place of the random card, and continues to run through the loop 
     }
     return cards.deck;
   }

   const renderDeck = () =>{
    document.getElementById("deck").innerHTML="";

    for(let i=0; i<cards.deck.length; i++){
    let card = document.createElement('div');
    let value = document.createElement('div');
    let suit = document.createElement('div');
    card.className = 'card';
    value.className = 'value';
    suit.className = 'suit' + cards.deck[i].suits
    }
   }
 
 const deal = () => {
   playerOne.cards= [cards.deck.shift(), cards.deck.shift()]
   dealer.cards = [cards.deck.shift(),cards.deck.shift()]
 }

 const displayPlayerHands = () => {
    document.querySelector('#player_hand').textContent = playerOne.cards;
    document.querySelector('#dealer_hand').textContent = dealer.cards;
    document.querySelector('#hand_total').textContent = "Hand Total:" + playerOne.sumCards;
    document.querySelector('#dealer_total').textContent = "Dealer Total:" + dealer.sumCards;
 }


const playerStand = () =>{
    while(dealer.sumCards < 17){
    dealer.cards.push(cards.deck.shift())
    }
    sumOfDealer();
    displayPlayerHands();

    if(dealer.sumCards >= 17){
        sumOfDealer();
        displayPlayerHands();
        endOfHand()
    }
}
 const playerHit = () => {
    
 playerOne.cards.push(cards.deck.shift()) 
 sumOfHand();
 bust();
 displayPlayerHands();
}

const endOfHand = ()=>{
    if(playerOne.sumCards <= dealer.sumCards){
        alert('You lost the hand!')
    }if(playerOne.sumCards > dealer.sumCards){
        alert('You Win!')
    }if(playerOne.sumCards === dealer.sumCards){
        alert('You lose in a tie')
    }
}


const sumOfHand = () => {
    let cardInfo = playerOne.cards
    let sum = 0
    for(i = 0; i<cardInfo.length; i++){
    if(cardInfo[i].includes('K')|| cardInfo[i].includes('Q')|| cardInfo[i].includes('J')){
        sum += 10;
    }else if (cardInfo[i].includes('A')){
        sum += 11;
        }else{
        sum += parseInt(cardInfo[i])
    
        }
            playerOne.sumCards = sum
    }   
        return playerOne.sumCards;
}

const sumOfDealer = () => {
    let cardInfo = dealer.cards
    let sum = 0
    for(i = 0; i<cardInfo.length; i++){
    if(cardInfo[i].includes('K')|| cardInfo[i].includes('Q')|| cardInfo[i].includes('J')){
        sum += 10;
    }else if (cardInfo[i].includes('A')){
        sum += 11;
        }else{
        sum += parseInt(cardInfo[i])
        }
            dealer.sumCards = sum
    }
        return dealer.sumCards;
}


 
const bust = () =>{
    if(playerOne.sumCards > 21){
        alert('You Busted')
        return true;
     }
    return false;
}

 


 startGameBtn.addEventListener('click', startGame);
 hitBtn.addEventListener('click', playerHit);
 standBtn.addEventListener('click', playerStand);
