const startGameBtn = document.querySelector('#startGame')
const hitBtn = document.querySelector('#hit');
const standBtn = document.querySelector('#stand')


 
  
let cards={
    deck : [],
    suits: [],
    values: []
  }
const playerOne = {
    sumCards: 0,
    cards: [''],
   
   
}
const dealer = {
    sumCards: 0,
    cards: [''],
}

const startGame = () => {
    buildDeck();
    shuffle();
    deal();
    displayPlayerHands();
}


const buildDeck = () => {
    let values = ['A', '2', '3', '4', '5', '6', '7','8','9','10','J','Q', 'K']
    let suits = ['C','D','H','S']

    for(let i=0; i < suits.length; i++ ){
        for(j=0; j< values.length; j++) {
            cards.deck.push(values[j] + suits[i])
        }let cardValues = parseInt(values[j]);
         if(values[j]== 'K' || values[j] == 'Q' || values[j]== 'J'){
                cardValues = 10
        }if(values[j] == 'A'){
            cardValues = 11
            cards.suits.push( suits[i])
            cards.values.push(cardValues)
        }
    }
    return cards;
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

 
 const deal = () => {
   playerOne.cards= [cards.deck.shift(), cards.deck.shift()]
   dealer.cards = [cards.deck.shift(), cards.deck.shift()]
 }

 const displayPlayerHands = () => {
    document.querySelector('#player_hand').innerHTML = playerOne.cards
    document.querySelector('#dealer_hand').innerHTML = dealer.cards 

 }



 const PlayerHit = () => {
 playerOne.cards += [cards.deck.shift()]
 displayPlayerHands();
}
const sumCards = () => {

}
 


 


 startGameBtn.addEventListener('click', startGame);
 hitBtn.addEventListener('click', PlayerHit)
