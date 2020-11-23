import './style.less';
import StatusBar from './components/statusBar/statusBar';
import Leaderboard from './components/leaderboard/leaderboard';
import GameField from './components/gameField/gamefield';
import Card from './components/card/card';
import Game from './game';

const componentList = new Map([
    ['#statusBar', StatusBar],
    ['#leaderboard', Leaderboard],
    // ['#gameField', GameField],
    ['#card', Card],
]);

function render(targetElement, element) {
    document.querySelector(targetElement).insertAdjacentHTML('afterbegin', element());
}

for (const targetElement of componentList.keys()) {
    render(targetElement, componentList.get(targetElement));
}

Game();

// let cardCollectioon = document.querySelectorAll('#gameField > .card');
// for (const cardItem of cardCollectioon) {
//     cardItem.addEventListener('click', turnOn);
// }

// function turnOn(evt) {
//     let target = evt.target;
//     let targetParent = evt.target.parentElement;
//     if (targetParent.className === 'card') {
//         console.log('pic');
//     } else {
//         if (target.className !== 'card') return;
//         else {
//             console.dir(evt);
//         }
//     }
// }

function turnOn(evt) {
    let target = evt.target;
    let targetParent = evt.target.parentElement;
    // if (target.className !== 'card') return;
    // else {
    //     console.dir(evt);
    // }
    console.dir(evt.currentTarget);
}
