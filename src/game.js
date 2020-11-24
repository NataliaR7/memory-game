import card from './components/card/card';

const cardCount = 20;
let cards = [];

export default function start() {
    fillCardsCollection();
    let gameField = document.querySelector('#gameField');
    gameField.insertAdjacentHTML('beforeend', cards.join(''));
    gameField.addEventListener('click', flipCard);
}

function fillCardsCollection() {
    for (let i = 1; i <= cardCount / 2; i++) {
        cards.push(card(false, 'cardSet1', `${i}.png`));
        cards.push(card(false, 'cardSet1', `${i}.png`));
    }
    cards = randomSort(cards);
}

function randomSort(source) {
    let j,
        temp = 0;
    let result = source.slice();
    for (let i = result.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = result[j];
        result[j] = result[i];
        result[i] = temp;
    }
    return result;
}

let flippedCards = [];

function openCard(card) {
    card.classList.add('open');
}

function closeCard(card) {
    card.classList.remove('open');
}

function getImgSrc(card){
    return card.querySelector('.back').src;
}

function flipCard(event) {
    let target = event.target.parentElement;
    if (target.className !== 'card') return;
    if (flippedCards.length >= 2) {
        flippedCards.forEach(closeCard);
        flippedCards = [];
    }
    openCard(target);
    flippedCards.push(target);
    setTimeout(() => {
        if (flippedCards.length === 2) {
            if (!isCardEquivalent(flippedCards[0], flippedCards[1])) {
                flippedCards.forEach(closeCard);
            }
            flippedCards = [];
        }
    }, 1500);
}

function isCardEquivalent(firstCard, secondCard) {
    return getImgSrc(firstCard) === getImgSrc(secondCard);
}