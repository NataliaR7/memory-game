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
            renderPage();
        });
}

const difficulty = { Легко: 1, Нормально: 2, Тяжело: 3 };

function applyGameTemplate() {
    let selectedDifficulty = document.querySelector('#difficulty > option:checked').value;
    Cookies.set('CurrentLevel', difficulty[selectedDifficulty]);
    let cardTemplate = document.querySelector('input[name="cardTemplate"]:checked').value;
    Cookies.set('CurrentSet', cardTemplate);
    renderPage();
}

function restartGame() {
    renderPage();
}

function setLoginStage() {
    Cookies.remove('CurrentUser');
    Cookies.remove('CurrentLevel');
    Cookies.remove('CurrentSet');
    renderPage();
}

function setSelectTemplateStage() {
    Cookies.remove('CurrentLevel');
    renderPage();
}

function renderPage() {
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

// function buildPrepareStage(params) {
//     if (Cookies.get('CurrentUser')) {
//         buildSettingsStage();
//     } else {
//         buildLoginStage();
//     }
// }

function buildLoginStage() {
    render('#root', getLoginForm);
    document.querySelector('#enterLoginButton').addEventListener('click', enterLogin);
    document.querySelector('#createUserButton').addEventListener('click', createUser);
}

function buildSettingsStage() {
    render('#root', getNewGameScreen);
    document.querySelector('.submitButton').addEventListener('click', applyGameTemplate);
}

function createUser(params) {
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

function buildPlayStage() {
    render('#root', getGameTable);
    for (const targetElement of componentList.keys()) {
        render(targetElement, componentList.get(targetElement));
    }
    setModalEvents();
    document.querySelector('#restartButton').addEventListener('click', restartGame);
    document.querySelector('#settingsButton').addEventListener('click', setSelectTemplateStage);
    document.querySelector('#exitButton').addEventListener('click', setLoginStage);
    Game();
}

function openSettingsModal() {
    let modal = document.querySelector('#optionModal');
    modal.innerHTML = getNewGameScreen();
    modal.classList.add('modal_content');
    console.log(1);
}

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

renderPage();
