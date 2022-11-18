const startGameBtn = document.querySelector('#startGame')
const hitBtn = document.querySelector('#hit');
const standBtn = document.querySelector('#stand')
// const playerTotal = document.querySelector('#hand_total').textContent = "Hand Total:" + playerOne.sumCards;

 
  
let cards={
    deck : [],
    suits: ['C','D','H','S'],
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
    displayPlayerTotal();
}


const buildDeck = () => {
    
    for (let i = 0; i < cards.suits.length; i++ ){
        for (j = 0; j < cards.values.length; j++) {
            cards.deck.push(cards.values[j] + '-' + cards.suits[i])
        }
    }return cards.deck
}


const shuffle = () => {

    for(let i = cards.deck.length -1; i > 0; i--) { // interates through array of cards in a descending order from 51-1
      const j = Math.floor(Math.random() * (i +1)) //gives a random number between 1-52
      let randoIndex = cards.deck[j]; //takes the random number and gets the element in the array at the random numbers position 
      cards.deck[j] = cards.deck[i]; //the random number index position is now placed in the index of [i] (first one would be at 51)
     cards.deck[i] = randoIndex //sets the card that is iterated in the loop to the place of the random card, and continues to run through the loop 
     }
     return cards.deck;
   }


 
const deal = () => {
   playerOne.cards = [cards.deck.shift(), cards.deck.shift()]
   sumOfHand()
   dealer.cards = [cards.deck.shift(), cards.deck.shift()]
   sumOfDealer(dealer.sumCards)
}

const displayPlayerHands = () => {
    
   
    // document.querySelector('#dealer_total').textContent = "Dealer Total:" + dealer.sumCards;
    
    for (let i = 0; i <= playerOne.cards.length - 1; i++) {
        const cardValue = playerOne.cards[i].split('-');
        let img = document.createElement("img");
        img.src = `./cards/${cardValue[0]}-${cardValue[1]}.png`;
        let src = document.getElementById("player_hand");
        src.appendChild(img);
    }

    for (let i = 0; i <= dealer.cards.length - 1; i++) {
        const cardValue = dealer.cards[i].split('-');
        let img = document.createElement("img");
        img.src = `./cards/${cardValue[0]}-${cardValue[1]}.png`;
        let src = document.getElementById("dealer_hand");
        src.appendChild(img);
    }
}

const sumOfHand = () => {
    let cardInfo = playerOne.cards
    let sum = 0
        for(let i = 0; i<cardInfo.length; i++){
    if(cardInfo[i].includes('K')|| cardInfo[i].includes('Q')|| cardInfo[i].includes('J')){
        sum += 10;
            }else if (cardInfo[i].includes('A')){
        sum += 11;
            }else{
        sum += parseInt(cardInfo[i])
    
        }
        playerOne.sumCards= sum
    }   
    return playerOne.sumCards;
    
}

const sumOfDealer = () => {
    let cardInfo = dealer.cards
    let sum = 0
    for (let i = 0; i<cardInfo.length; i++){
        if(cardInfo[i].includes('K')|| cardInfo[i].includes('Q')|| cardInfo[i].includes('J')){
            sum += 10;
        } else if (cardInfo[i].includes('A')) {
            sum += 11;
        } else {
            sum += parseInt(cardInfo[i])
        }
        dealer.sumCards = sum
    }
    return dealer.sumCards;
}
const playerHit = () => {
    
    playerOne.cards.push(cards.deck.shift())
    sumOfHand();
   let cardValue= playerOne.cards.slice(-1)
   let cardImg = document.createElement("img")
   cardImg.src = './cards/'+ cardValue+ '.png';
   let src = document.getElementById("player_hand");
       src.appendChild(cardImg); 
      displayPlayerTotal();
       bust();
   }

   const playerStand = () => {
        
    if(dealer.sumCards < 17){
        dealer.cards.push(cards.deck.shift())
        let cardValue = dealer.cards.slice(-1)
        let cardImg = document.createElement("img")
        cardImg.src = './cards/'+ cardValue+ '.png';
        let src = document.getElementById("dealer_hand");
            src.appendChild(cardImg); 
            sumOfDealer();
    }
    if(dealer.sumCards < 17){
        playerStand();
    }
    else if(dealer.sumCards === 21){
        alert('dealer won!')
    }
    else if(dealer.sumCards > 21){
        alert('dealer busts! You win')
    }
        decideWinner();
    
}


const displayPlayerTotal= () => {
    document.querySelector('#hand_total').textContent = "Hand Total:" + playerOne.sumCards;
}

const decideWinner = () => {
    let player = playerOne.sumCards
    let dealer = dealer.sumCards

    if(player > dealer){
        document.querySelector('#display_results').textContent = 'You win!'
    }
    if( player === dealer) {
        document.querySelector(#'display_results').textContent = 'Dealer Wins in a draw'
    }
}

const bust = () =>{
    if (playerOne.sumCards > 21) {
        alert('You Busted')
        return true;
    }
    return false;
}

 startGameBtn.addEventListener('click', startGame);
 hitBtn.addEventListener('click', playerHit);
 standBtn.addEventListener('click', playerStand);
