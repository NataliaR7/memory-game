import leaderboard from '../components/leaderboard/leaderboard';
import statusBar from '../components/statusBar/statusBar';
import record from '../components/leaderboard/record';
import Cookies from 'js-cookie';
import {fillCardsCollection, resetParameters, flipCard} from './cardLogic.js';

let ws = null;

export default function startNewGame() {
    resetParameters();
    connectWebSocket();
    buildStatusBar();
    buildGameField();
    onEnterUpdate();
}

function buildStatusBar() {
    document.querySelector('#statusBar').insertAdjacentHTML('afterbegin', statusBar());
    const levelView = document.querySelector('.statusBar .gameLevel');
    levelView.textContent = 'Уровень ' + Cookies.get('CurrentLevel');
    const nameView = document.querySelector('.statusBar .playerName');
    nameView.textContent = Cookies.get('CurrentUser');
}

function buildGameField() {
    const cards = fillCardsCollection();
    let gameField = document.querySelector('#gameField');
    gameField.innerHTML = '';
    gameField.insertAdjacentHTML('beforeend', cards.join(''));
    gameField.addEventListener('click', flipCard);
}

function onEnterUpdate() {
    let response = fetch('/users');
    response.then((result) => result.json()).then((users) => fillLeaderboard(users));
}

function connectWebSocket() {
    if (!ws) {
        ws = new WebSocket('ws://localhost:9001');
    }
    ws.addEventListener('message', updateLeaderboard);
}

function updateLeaderboard(event) {
    console.log('Обновить на клиенте1111111');
    let users = JSON.parse(event.data);
    fillLeaderboard(users);
}

function fillLeaderboard(users) {
    console.log(users);
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

