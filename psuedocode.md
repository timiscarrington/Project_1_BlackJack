Two players - two variables indicating players
```js

```
cards need to be cantagorized into two arrays..
put the cards into an object
```js
const cards = {
    suits: ['S', 'C', 'H', 'D'],
    values: ['2', '3', '4', '5', '6', '7', '8', '9', '10','jack', 'queen', 'king', 'ace'],
    deck = [],
}
```
array of suites ['c','d','h','s']
array of cards [2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace]
Ace needs to be able to be a value of 2 and 11 dependent on conditions
jack, qeen and king also need a function to set value to 10
``` js
function getValue(card) {
    let data = card.split ("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if(isNan(value)){ // so if the value is not a number which would be any face card or ace. 
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}
```
variable for dealer cards
variable for player cards
varble for showing cards
variable for hidden cards

function to create the deck of cards using the arrays in the object of cards ... maybe create a method in the card object?
```js
function buildDeck() {
    suits = card.s
    let deck =card.deck
    for(let i=0; i < suits.length)
}
```

function to discard used cards *
function to deal cards* (* these could be in the same function)


function to build the decks would be combining the two arrays, by looping through all the values, and the suites. 

function to randomize (shuffleDeck)//
two arrays
for loop... nested for loop... something to do with math.random inside that to randomize the all the values of both i and j for instance...
so like

cards.values = cardValues
cards.type = cardSuits

let deck = []
for(let i=0; i<cardValues.length; i++){
    for(let j=0; j<cardTypes.length; i++){
        push.deck(cardVales[i] + cardtypes[j]) 
    }
}
... getting carried away gonna test that



function that adds the total of the value of both dealer and player cards

function for dealer that indicated they must hit until the sum of cards reaches 17

function to comparing the ending dealer hand to player hand, that also determines winning conditions

function that ties variables to dom elements

domelements will need to be two buttons for hit and stay

dom element to input the value of the sum of the cards


create a file of images for the dec, title each image to match the titles of the arrays... (2-C, 5-S, 10-H, K-D etc.)
create functions for the event listeners





