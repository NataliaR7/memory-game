import card from './components/card/card';
import leaderboard from './components/leaderboard/leaderboard';
import record from './components/leaderboard/record';
import Cookies from 'js-cookie';
//import io from  'socket.io-client' ;

let cardCount = 20;
let openCardCount = 0;
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
    //let restartButton = document.querySelector('#restartButton');
    //restartButton.addEventListener('click', addUser/* restartGame */);
    //document.addEventListener('click', updateLeaderboard);
    if (!ws) {
        ws = connect();
    }
    ws.addEventListener('message', updateLeaderboard);
    
    let response = fetch('/users');
    response.then((result) => result.json()).then((users) => fillLeaderboard(users));

}

function updateLeaderboard(event) {
    console.log('Обновить на клиенте1111111');
    let users = JSON.parse(event.data);
    fillLeaderboard(users);
}

function fillLeaderboard(users) {
    let place = document.querySelector('#leaderboard');
    let records = [];
    for (let i = 0; i < users.length; i++) {
        records.push(record(i + 1, users[i].username, getScore(users[i])));
    }
    place.innerHTML = leaderboard(records);
}

function getScore(user) {
    const level = Cookies.get('CurrentLevel');
    switch (level) {
        case '1':
            return user.max_score_level1;
        case '2':
            return user.max_score_level2;
        case '3':
            return user.max_score_level3;
        default:
            return user.max_score_level1;
    }
}

function addUser() {
    let place = document.querySelector('#leaderboard');
    let response = fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ username: '111TEST_User' }),
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

const cardsCount = { 'cardSet1': 20, 'cardSet2': 15, 'cardSet3': 0 };
function fillCardsCollection() {
    const cardSet = Cookies.get('CurrentSet');
    let set = fillSet(cardSet);
    set = randomSort(set);
    let cardIndex = 1;
    for (let i = 1; i <= cardCount / 2; i++) {
        cards.push(set[cardIndex - 1]);
        cards.push(set[cardIndex - 1]);
        cardIndex = cardIndex >= cardsCount[cardSet] ? 1 : cardIndex + 1;
    }
    var shuffledArr = cards.sort(function(){
        return Math.random() - 0.5;
      });
    cards = randomSort(shuffledArr);
}

function fillSet(cardSetName) {
    let result = [];
    const count = cardsCount[cardSetName];
    for(let i = 1; i <= count; i++) {
        result.push(card(cardSetName, `${i}.png`))
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
        openCardCount += 2;
        checkOnEnd();
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

function checkOnEnd() {
    if (openCardCount !== cardCount) {
        return;
    }
    let response = fetch('/users', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ username: Cookies.get('CurrentUser'), score: points }),
    });
    //let response = fetch('/api');
    //response.then((result) => result.json()).then((res) => console.log(res));
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

export default function startNewGame() {
    const currentLevel = Cookies.get('CurrentLevel');
    cardCount = getCardCount(currentLevel);
    openCardCount = 0;
    points = 0;
    cards = [];
    timer = performance.now();
    flippedCards = [];
    const levelView = document.querySelector('.statusBar .gameLevel');
    
    levelView.textContent = 'Уровень ' + currentLevel;
    const nameView = document.querySelector('.statusBar .playerName');
    nameView.textContent = Cookies.get('CurrentUser');
    startGame();
}
