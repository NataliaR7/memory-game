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

function getControlWithTimer(control, timer) {
    return { control, stopTimer: () => clearTimeout(timer) };
}

function openCard(card) {
    card.classList.remove('closed');
}

function closeCard(card) {
    card.classList.add('closed');
}

function flipCard(event) {
    let target = event.target;
    let targetParent = event.target.parentElement;
    if (targetParent.className !== 'card') return;
    if (flippedCards.length >= 2) {
        return;
    }
    openCard(target);
    let timer = setTimeout(() => {
        closeCard(target);
        flippedCards.shift();
    }, 2000);

    flippedCards.push(getControlWithTimer(target, timer));
    if (flippedCards.length === 2) {
        if (flippedCards[0].control.src === flippedCards[1].control.src) {
            console.log(flippedCards);
            flippedCards[0].stopTimer();
            flippedCards[1].stopTimer();
            flippedCards = [];
        }
    }
}
