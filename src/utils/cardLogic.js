import card from '../components/card/card';
import getRandomGradient from './gradientGenerator';
import Cookies from 'js-cookie';

let cards = [];
let cardCount = 20;
let openCardCount = 0;
let points = 0;
let timer = performance.now();
let flippedCards = [];
let activeTimer;
const cardSetCount = { cardSet1: 20, cardSet2: 15, cardSet3: 40 };
const shift = { increase: 0, decrease: 1 };

export function resetParameters() {
    cardCount = getCardCount(Cookies.get('CurrentLevel'));
    openCardCount = 0;
    points = 0;
    cards = [];
    timer = performance.now();
    flippedCards = [];
}

function getCardCount(level) {
    switch (level) {
        case '1':
            return 20;
        case '2':
            return 30;
        case '3':
            return 42;
        default:
            return 20;
    }
}

export function fillCardsCollection() {
    const cardSet = Cookies.get('CurrentSet');
    let set = fillSet(cardSet);
    set = randomSort(set);
    let cardIndex = 1;
    for (let i = 1; i <= cardCount / 2; i++) {
        cards.push(set[cardIndex - 1]);
        cards.push(set[cardIndex - 1]);
        cardIndex = cardIndex >= cardSetCount[cardSet] ? 1 : cardIndex + 1;
    }
    cards = randomSort(cards);
    return cards;
}

function fillSet(cardSetName) {
    let result = [];
    const count = cardSetCount[cardSetName];
    for (let i = 1; i <= count; i++) {
        if (cardSetName === 'cardSet3') {
            result.push(card(cardSetName, `${i}.png`, i, getRandomGradient()));
        } else {
            result.push(card(cardSetName, `${i}.png`, i));
        }
    }
    return result;
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

function openCard(card) {
    card.classList.add('open');
}

function closeCard(card) {
    card.classList.remove('open');
}

function getImgClass(card) {
    return card.querySelector('.back').className;
}

export function flipCard(event) {
    let target = event.target.parentElement;
    if (target.className !== 'card') {
        target = target.parentElement;
        if (target.className !== 'card') {
            return;
        }
    }
    if (flippedCards.includes(target)) {
        return;
    }

    if (flippedCards.length === 1 && isCardEquivalent(flippedCards[0], target)) {
        applyWinStep(target);
        return;
    }
    clearTimeout(activeTimer);

    if (flippedCards.length >= 2) {
        applyLoseStep();
    }
    openCard(target);
    flippedCards.push(target);

    activeTimer = setTimeout(() => {
        if (flippedCards.length === 2) {
            applyLoseStep();
        }
    }, 1000);
}

function applyWinStep(target) {
    openCard(target);
    flippedCards = [];
    changePoints(shift.increase);
    openCardCount += 2;
    checkOnEnd();
}

function applyLoseStep() {
    flippedCards.forEach(closeCard);
    flippedCards = [];
    changePoints(shift.decrease);
}

function checkOnEnd() {
    if (openCardCount !== cardCount) {
        return;
    }
    fetch('/users', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ username: Cookies.get('CurrentUser'), score: points }),
    });
}

function isCardEquivalent(firstCard, secondCard) {
    return getImgClass(firstCard) === getImgClass(secondCard);
}

function changePoints(action) {
    let score = document.querySelector('.playerInfo .score');
    let minValue = 15;
    switch (action) {
        case shift.increase: {
            let end = performance.now();
            let time = end - timer;
            let currentPoint = Math.ceil(minValue * (10000 / time));
            points += currentPoint > minValue ? currentPoint : minValue;
            timer = performance.now();
            break;
        }
        case shift.decrease: {
            points -= points >= 1 ? 1 : points;
            break;
        }
    }
    score.textContent = points;
}
