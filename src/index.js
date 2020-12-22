import startGame from './Utils/game';
import getLoginForm from './pages/login/login';
import getGameTable from './pages/gameTable/gameTable';
import getNewGameScreen from './pages/settings/newGameScreen';
import Cookies from 'js-cookie';

const difficulty = { Легко: 1, Нормально: 2, Тяжело: 3 };

function applyGameTemplate() {
    let selectedDifficulty = document.querySelector('#difficulty > option:checked').value;
    Cookies.set('CurrentLevel', difficulty[selectedDifficulty]);
    let cardTemplate = document.querySelector('input[name="cardTemplate"]:checked').value;
    Cookies.set('CurrentSet', cardTemplate);
    getCurrentState();
}

export default function render(targetElement, element) {
    document.querySelector(targetElement).insertAdjacentHTML('afterbegin', element());
}

function restartGame() {
    getCurrentState();
}

// redirect

function redirectToLoginStage() {
    Cookies.remove('CurrentUser');
    Cookies.remove('CurrentLevel');
    Cookies.remove('CurrentSet');
    getCurrentState();
}

function redirectToSelectTemplateStage() {
    Cookies.remove('CurrentLevel');
    getCurrentState();
}

// state machine

function getCurrentState() {
    document.querySelector('#root').innerHTML = '';
    console.log(Cookies.get('CurrentUser'));
    if (!Cookies.get('CurrentUser')) {
        buildLoginStage();
        return;
    }
    if (!Cookies.get('CurrentLevel')) {
        buildSettingsStage();
        return;
    }
    buildPlayStage();
}

// build

function buildLoginStage() {
    render('#root', getLoginForm);
    document.querySelector('#enterLoginButton').addEventListener('click', enterLogin);
    document.querySelector('#createUserButton').addEventListener('click', createUser);
}

function buildSettingsStage() {
    render('#root', getNewGameScreen);
    document.querySelector('.submitButton').addEventListener('click', applyGameTemplate);
}

function buildPlayStage() {
    render('#root', getGameTable);
    startGame();
    setModalEvents();
    document.querySelector('#restartButton').addEventListener('click', restartGame);
    document.querySelector('#settingsButton').addEventListener('click', redirectToSelectTemplateStage);
    document.querySelector('#exitButton').addEventListener('click', redirectToLoginStage);
}

// user actions

function createUser() {
    let username = document.querySelector('#userName').value;
    let response = fetch('/users', {
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
        });
    enterLogin();
}

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
            getCurrentState();
        });
}

// modal

function setModalEvents() {
    let modal = document.querySelector('#optionModal');
    let openModalButton = document.querySelector('#modalMenuButton');
    let closeModalButton = document.querySelector('.close_modal_window');
    openModalButton.onclick = function (event) {
        if (event.target.nodeName !== 'svg' && event.target.parentElement.nodeName !== 'svg') {
            return;
        }
        modal.style.display = 'block';
    };

    closeModalButton.onclick = function () {
        modal = document.querySelector('#optionModal');
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

getCurrentState();
