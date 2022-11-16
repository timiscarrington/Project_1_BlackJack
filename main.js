const cards = {
    values: ['A', '2', '3', '4', '5', '6', '7','8','9','10','J','Q', 'K'],
    suits: ['C', 'D', 'H', 'S'],
    deck: [],
}

const playerOne = {
    sumCards: 0,
    cards: [],
    aceCount: 0,
    canHit: true
}
const dealer = {
    sumCards: 0,
    cards: [],
    aceCount: 0,
    canHit: true,
}

const buildDeck = () => {
    let values = cards.values;
    let suits = cards.suits;
    let deck = cards.deck;

    for (let i = 0; i < suits.length; i++) {
        for(let j= 0; j < values.length; j++){
            deck.push(values[j] +'-' +suits[i])
        }
    }
    return deck;
}
console.log(buildDeck());

 const shuffle = () => {

  for(let i = cards.deck.length; i >0; i--){ // interates through array of cards
    const j = Math.floor(Math.random() * (i +1));// will get a random number between 0- and 51.99
    let temp = cards.deck[j]; 
    cards.deck[j] = cards.deck[i];
    cards.deck[i] = temp 
   }
   return cards.deck
 }
 console.log(shuffle())

