import card from './components/card/card';
import leaderboard from './components/leaderboard/leaderboard';
import record from './components/leaderboard/record';
//import io from  'socket.io-client' ;

const cardCount = 20;
let points = 0;
let cards = [];
let timer = performance.now();
let flippedCards = [];
let activeTimer;
let ws = null;

const connect = () => {
    const url = `${location.origin.replace(/^http/, 'ws')}`;
    console.log(url);
    return new WebSocket('ws://localhost:9001');
};

function startGame() {
    fillCardsCollection();
    let gameField = document.querySelector('#gameField');
    gameField.innerHTML = '';
    gameField.insertAdjacentHTML('beforeend', cards.join(''));
    gameField.addEventListener('click', flipCard);
    let restartButton = document.querySelector('#restartButton');
    //restartButton.addEventListener('click', addUser/* restartGame */);
    //document.addEventListener('click', updateLeaderboard);
    if (!ws) {
        ws = connect();
    }
    ws.addEventListener('message', updateLeaderboard);
}

function updateLeaderboard(event) {
    let place = document.querySelector('#leaderboard');
    console.log('Обновить на клиенте1111111');
    let users = JSON.parse(event.data);

    let records = [];
    for (let i = 0; i < users.length; i++) {
        records.push(record(i + 1, users[i].username, users[i].max_score));
    }
    place.innerHTML = leaderboard(records);
}
//setInterval(() => updateLeaderboard(), 6000);

function addUser() {
    let place = document.querySelector('#leaderboard');
    let response = fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ username: '111TEST_User', password: '222' }),
    });
    // response
    //     .then((result) => result.json())
    //     .then((users) => {
    //         let records = [];
    //         for (let i = 0; i < users.length; i++) {
    //             records.push(record(i + 1, users[i].username, users[i].max_score));
    //         }
    //         console.log(records);
    //         place.innerHTML = leaderboard(records);
    //     });
}

function getUser() {
    let response = fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ name: 'POST_DIMA' }),
    });
    //let response = fetch('/api');
    response.then((result) => result.json()).then((res) => console.log(res));
}

function fillCardsCollection() {
    let cardIndex = 1;
    for (let i = 1; i <= cardCount / 2; i++) {
        cards.push(card('cardSet1', `${cardIndex}.png`));
        cards.push(card('cardSet1', `${cardIndex}.png`));
        cardIndex = cardIndex >= 10 ? 1 : cardIndex + 1;
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

function openCard(card) {
    card.classList.add('open');
}

function closeCard(card) {
    card.classList.remove('open');
}

function getImgSrc(card) {
    return card.querySelector('.back').src;
}

function flipCard(event) {
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
        openCard(target);
        flippedCards = [];
        changePoints('increase');
        return;
    }
    clearTimeout(activeTimer);

    if (flippedCards.length >= 2) {
        flippedCards.forEach(closeCard);
        flippedCards = [];
        changePoints('decrease');
    }
    openCard(target);
    flippedCards.push(target);

    activeTimer = setTimeout(() => {
        if (flippedCards.length === 2) {
            flippedCards.forEach(closeCard);
            flippedCards = [];
            changePoints('decrease');
        }
    }, 1000);
}

function isCardEquivalent(firstCard, secondCard) {
    return getImgSrc(firstCard) === getImgSrc(secondCard);
}

function changePoints(action) {
    let score = document.querySelector('.playerInfo .score');
    let minValue = 15;
    switch (action) {
        case 'increase': {
            let end = performance.now();
            let time = end - timer;
            console.log('time ' + time);
            let currentPoint = Math.ceil(minValue * (10000 / time));
            points += currentPoint > minValue ? currentPoint : minValue;
            timer = performance.now();
            break;
        }
        case 'decrease': {
            points -= points >= 1 ? 1 : points;
            break;
        }
    }
    console.log('aaaaa ' + points);
    score.textContent = points;
}

function restartGame() {
    // points = 0;
    // cards = [];
    // timer = performance.now();
    // flippedCards = [];
    // start();
}

export default function startNewGame(params) {
    points = 0;
    cards = [];
    timer = performance.now();
    flippedCards = [];
    startGame();
}
