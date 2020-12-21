import StatusBar from './components/statusBar/statusBar';
import Leaderboard from './components/leaderboard/leaderboard';
import GameField from './components/gameField/gamefield';
import Card from './components/card/card';
import Game from './game';
import getLoginForm from './login';
import getGameTable from './gameTable';
import getNewGameScreen from './newGameScreen';
import Cookies from 'js-cookie';

const componentList = new Map([
    ['#statusBar', StatusBar],
    // ['#leaderboard', Leaderboard],
]);

export default function render(targetElement, element) {
    document.querySelector(targetElement).insertAdjacentHTML('afterbegin', element());
}

let isLoggin = false;
let isGameWon = false;
let diffSelected = false;

function enterLogin() {
    let username = document.querySelector('#userName').value;
    let response = fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ username: username }),
    });
    response
        .then((result) => result.json())
        .then((res) => {
            console.log(res);
            if (res.length === 0) {
                alert('Игрока с таким имененм нет!');
                return;
            }
            isLoggin = true;
            renderPage();
        });
}

const difficulty = { 'Легко': 1, 'Нормально': 2, 'Тяжело': 3 };

function applyGameTemplate() {
    let selectedDifficulty = document.querySelector('#difficulty > option:checked').value;
    Cookies.set('CurrentLevel', difficulty[selectedDifficulty]);
    let cardTemplate = document.querySelector('input[name="cardTemplate"]:checked').value;
    Cookies.set('CurrentSet', cardTemplate);
    diffSelected = true;
    isGameWon = false;
    renderPage();
}

function restartGame() {
    isLoggin = true;
    diffSelected = true;
    isGameWon = false;
    renderPage();
}

function setLoginStage() {
    isLoggin = false;
    diffSelected = false;
    isGameWon = false;
    Cookies.remove('CurrentUser');
    Cookies.remove('CurrentLevel');
    Cookies.remove('CurrentSet');
    renderPage();
}

function setSelectTemplateStage() {
    isLoggin = true;
    diffSelected = false;
    isGameWon = false;
    renderPage();
}

function renderPage() {
    console.log(Cookies.get('CurrentUser'));
    if (Cookies.get('CurrentUser')) {
        isLoggin = true;
    }
    if (Cookies.get('CurrentLevel')) {
        diffSelected = true;
    }
    document.querySelector('#root').innerHTML = '';
    if (!isLoggin) {
        render('#root', getLoginForm);
        document.querySelector('.submitButton').addEventListener('click', enterLogin);
        return;
    }
    if (!diffSelected) {
        render('#root', getNewGameScreen);
        document.querySelector('.submitButton').addEventListener('click', applyGameTemplate);
        return;
    }
    if (!isGameWon) {
        render('#root', getGameTable);
        for (const targetElement of componentList.keys()) {
            render(targetElement, componentList.get(targetElement));
        }
        setModalEvents();
        document.querySelector('#restartButton').addEventListener('click', restartGame);
        document.querySelector('#settingsButton').addEventListener('click', setSelectTemplateStage);
        document.querySelector('#exitButton').addEventListener('click', setLoginStage);

        Game();
        return;
    }
}

function setModalEvents() {
    let modal = document.querySelector('#my_modal');
    let openModalButton = document.querySelector('#modalMenuButton');
    let closeModalButton = document.querySelector('.close_modal_window');
    openModalButton.onclick = function (event) {
        if (event.target.nodeName !== 'svg' && event.target.parentElement.nodeName !== 'svg') {
            return;
        }
        modal.style.display = 'block';
    };

    closeModalButton.onclick = function () {
        modal = document.querySelector('#my_modal');
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

renderPage();
