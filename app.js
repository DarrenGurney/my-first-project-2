const wrapper = document.querySelector('.wrapper');
const grid = document.querySelectorAll('.card');
const tryAgain = document.querySelector('#try');

let pairs = 0;
let i = 0;
let selectedCards = [];

//reset array
const reset = function(cardArr){
    cardArr.forEach(item => {
        item.setAttribute('src', 'img/yellow.jpg'); // Hides the picture
        item.classList.remove('clicked'); // allows the card to be clicked again
    });
    selectedCards = [];
    tryAgain.style.visibility = 'hidden';
};

// set an array of objects to select images attributes from
const cardImg = [
    {img: 'img/elephant.png'},
    {img: 'img/elephant.png'},
    {img: 'img/frog.png'},
    {img: 'img/frog.png'},
    {img: 'img/tortoise.jpeg'},
    {img: 'img/tortoise.jpeg'}
];

//flip cards then check for match
const selectCard = function(card){
    card.className += 'clicked'; // append class so we know card has been clicked
    i = card.getAttribute('data-id');
    selectedCards.push(card);
    card.setAttribute('src', cardImg[i].img); // shows the image
    if(selectedCards.length === 2){ // when 2 cards have been selected
        if(selectedCards[0].getAttribute('src') === selectedCards[1].getAttribute('src')){
            if(pairs === 2){
                setTimeout(function(){window.alert('YOU WIN!!!!!!!!')},500); // if 2 pairs have already been matched we know this is final pair
            }
            else{
                setTimeout(function(){window.alert('Congratulations, you matched a pair!! Keep going!')},500);
                selectedCards = []; // clears the array to select 2 new cards
                pairs++; // records the quantity of pairs matched so far
            }    
        }
        else{
            tryAgain.style.visibility = 'visible';
            setTimeout(reset, 2500, selectedCards); // displays selected cards for 3 seconds then hides again(calls reset function)
        }
    }
};

//randomise card position by shuffling array
const shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

// create board
shuffleArray(cardImg);  // call function to shuffle array so card positions are random
grid.forEach(item => {
    let card = document.createElement('img');
    card.setAttribute('src', 'img/yellow.jpg');
    card.setAttribute('data-id', i);
    item.appendChild(card);
    i++;
});

alert('Welcome to my game. Match pairs to win!');

wrapper.addEventListener('click', e => {
    let selectedCard = e.target;
    if(selectedCard.className.includes('clicked')){
        return; // prevents the same card being clicked multiple times
    };
    selectCard(selectedCard);
});