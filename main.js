const startGameBtn = document.querySelector("#startGame");
const hitBtn = document.querySelector("#hit");
const standBtn = document.querySelector("#stand");
const resetBtn= document.querySelector('#reset');
const gameResultModal = document.querySelector('#result_modal');
const startGameModal = document.querySelector('.start_modal');


let cards = {
  deck: [],
  suits: ["C", "D", "H", "S"],
  values: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
};
const playerOne = {
  sumCards: 0,
  cards: [],
};

const dealer = {
  sumCards: 0,
  cards: [],
};

const startModal = () =>{
    startGameModal.classList.toggle('visible')
}

//calls all the functions needed to start game
const startGame = () => {
startModal();
buildDeck();
shuffle();
deal();
sumOfHand();
sumOfDealer();
displayPlayerTotal();
displayPlayerHands();
};

//calls all the functions to reset game
const playAgain= () =>{
buildDeck();
shuffle();
deal();
sumOfHand();
sumOfDealer();
displayPlayerTotal();
displayPlayerHands();
}

//loops through the two arrays and combines them and pushes them to the deck array
const buildDeck = () => {
  for (let i = 0; i < cards.suits.length; i++) {
    for (j = 0; j < cards.values.length; j++) {
      cards.deck.push(cards.values[j] + "-" + cards.suits[i]);
    }
  }
  return cards.deck;
};
//loops through the deck array, and grabs the [i] and swaps it with the random [j] 52 times to shuffle cards
const shuffle = () => {
  for (let i = cards.deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    let randoIndex = cards.deck[j]; 
    cards.deck[j] = cards.deck[i]; 
    cards.deck[i] = randoIndex; 
  }
  return cards.deck;
};

const deal = () => {
  playerOne.cards = [cards.deck.shift(), cards.deck.shift()];
  sumOfHand();
  dealer.cards = [cards.deck.shift(), cards.deck.shift()];
  sumOfDealer();
}
const displayPlayerTotal = () => {
    document.querySelector("#hand_total").textContent =
    "Hand Total:" + playerOne.sumCards;
}
//renders img to the DOM from the card file that matches the element in the array for player/dealer hands
const displayPlayerHands = () => {
  
  for (let i = 0; i <= playerOne.cards.length - 1; i++) {
    const cardValue = playerOne.cards[i].split("-"); 
    let img = document.createElement("img");
    img.src = `./cards/${cardValue[0]}-${cardValue[1]}.png`;
    let src = document.getElementById("player_hand");
    src.appendChild(img);
  }

  for (let i = 0; i <= dealer.cards.length - 1; i++) {
    const cardValue = dealer.cards[i].split("-");
    let img = document.createElement("img");
    img.src = `./cards/${cardValue[0]}-${cardValue[1]}.png`;
    let src = document.getElementById("dealer_hand");
    src.appendChild(img);
  }
};

// gives a numeric total to the hand of the player, to compare to in order to determine winning conditions
function sumOfHand() {
  let cardInfo = playerOne.cards;
  let sum = 0;
  for (let i = 0; i < cardInfo.length; i++) {
    if (
      cardInfo[i].includes("K") ||
      cardInfo[i].includes("Q") ||
      cardInfo[i].includes("J")
    ) {
      sum += 10;
    } else if (cardInfo[i].includes("A")) {
      sum += 11;
    } else {
      sum += parseInt(cardInfo[i]);
    }
    playerOne.sumCards = sum;
  }
  return playerOne.sumCards;
}

const sumOfDealer = () => {
  let card = dealer.cards;
  let sum = 0;
  for (let i = 0; i < card.length; i++) {
    if (
      card[i].includes("K") ||
      card[i].includes("Q") ||
      card[i].includes("J")
    ) {
      sum += 10;
    } else if (card[i].includes("A")) {
      sum += 11;
    } else {
      sum += parseInt(card[i]);
    }
    dealer.sumCards = sum;
  }
  return dealer.sumCards;
};
//adds card to player hand, and renders img to dom of the card
const playerHit = () => {
  playerOne.cards.push(cards.deck.shift());
  sumOfHand();
  let cardValue = playerOne.cards.slice(-1);
  let cardImg = document.createElement("img");
  cardImg.src = "./cards/" + cardValue + ".png";
  let src = document.getElementById("player_hand");
  src.appendChild(cardImg);
  displayPlayerTotal();
  bust();
};
//dealer will add cards if under 17, and then winning conditions are evaluated
const playerStand = () => {
  if (dealer.sumCards < 17) {
    dealer.cards.push(cards.deck.shift());
    let cardValue = dealer.cards.slice(-1);
    let cardImg = document.createElement("img");
    cardImg.src = "./cards/" + cardValue + ".png";
    let src = document.getElementById("dealer_hand");
    src.appendChild(cardImg);
    sumOfDealer();
  }
  if (dealer.sumCards < 17) {
    playerStand();
  } else if (dealer.sumCards === 21) {
    document.querySelector('#results').textContent= `Dealer Won! Dealer had: ${dealer.sumCards}`;
  } else if (dealer.sumCards > 21) {
    document.querySelector('#results').textContent= `Dealer Busts! Dealer had: ${dealer.sumCards}`;
  } else if (dealer.sumCards === playerOne.sumCards) {
    document.querySelector('#results').textContent= `Dealer Wins in a Draw! You both had: ${dealer.sumCards}`;
  } else if (dealer.sumCards > playerOne.sumCards) {
    document.querySelector('#results').textContent= `Dealer Won. You had: ${playerOne.sumCards} & Dealer had: ${dealer.sumCards}`;
  } else {
    document.querySelector('#results').textContent= `You Won! You had: ${playerOne.sumCards} & Dealer had: ${dealer.sumCards}`;
  }
  document.querySelector("#dealer_total").textContent =
    "Dealer Total:" + dealer.sumCards;
    toggleResultsModal();
};

const bust = () => {
  if (playerOne.sumCards > 21) {
    document.querySelector('#results').textContent= `You Bust! Your Hand is: ${playerOne.sumCards}`;
    toggleResultsModal();
  }
  
};
const toggleResultsModal = () => {
    gameResultModal.classList.toggle('visible');
};

//clears out arrays for player/dealer hands and clears img off of html page.
const reset = () => {
    playerOne.cards.splice(0,playerOne.cards.length);
    dealer.cards.splice(0, dealer.cards.length);
    playerOne.sumCards = 0;
    dealer.sumCards = 0;
    let cards = document.querySelectorAll('img');
    cards.forEach(hand => {
        let parent = hand.parentElement;
        parent.removeChild(hand);
    })
    toggleResultsModal();
    playAgain();
};

startGameModal.addEventListener("load", startModal);
startGameBtn.addEventListener("click", startGame);
hitBtn.addEventListener("click", playerHit);
standBtn.addEventListener("click", playerStand);
resetBtn.addEventListener('click', reset)