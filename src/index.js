import './style.less';
import startGame from './utils/game';
import getLoginForm from './pages/login/loginPage';
import getGameTablePage from './pages/gameTable/gameTablePage';
import getSettingsPage from './pages/settings/settingsPage';
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
    document.querySelector('#loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        enterLogin();
    });
}

function buildSettingsStage() {
    render('#root', getSettingsPage);
    document.querySelector('.submitButton').addEventListener('click', applyGameTemplate);
}

function buildPlayStage() {
    render('#root', getGameTablePage);
    startGame();
    setModalEvents();
    document.querySelector('#restartButton').addEventListener('click', restartGame);
    document.querySelector('#settingsButton').addEventListener('click', redirectToSelectTemplateStage);
    document.querySelector('#exitButton').addEventListener('click', redirectToLoginStage);
}

// user actions

function createUser() {
    let username = document.querySelector('#userNameInput').value;
    if (username.length === 0) {
        drawValidationWarning('Имя не может быть пустым');
        return;
    }
    let response = fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ username: username }),
    });
    response
        .then((result) => {
            return result.json();
        })
        .then((res) => {
            if (res.status === 409) {
                drawValidationWarning('Игрок с таким имененм уже есть!');
                return;
            }
            enterLogin();
        })
        .catch((err) => {
            console.log(err);
        });
}

function enterLogin() {
    let username = document.querySelector('#userNameInput').value;
    if (username.length === 0) {
        drawValidationWarning('Имя не может быть пустым');
        return;
    }
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
                drawValidationWarning('Игрока с таким именен нет!');
                // alert('Игрока с таким имененм нет!');
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

// validation

function drawValidationWarning(message) {
    let input = document.querySelector('#userNameInput');
    let validationWarningElem = document.querySelector('#ValidationWarning');
    if (validationWarningElem) {
        validationWarningElem.remove();
    }
    let warningText = `<span id="ValidationWarning" style="margin: 0 auto">${message}</span>`;
    input.insertAdjacentHTML('afterend', warningText);
    input.style.borderStyle = 'solid';
    input.style.borderColor = 'red';
}

getCurrentState();
