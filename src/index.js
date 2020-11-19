import './style.less';
import StatusBar from './components/statusBar/statusBar';
import Leaderboard from './components/leaderboard/leaderboard';
import GameField from './components/gameField/gamefield';

const componentList = new Map([
    ['#statusBar', StatusBar],
    ['#leaderboard', Leaderboard],
    ['#gameField', GameField],
]);

function render(targetElement, element) {
    document.querySelector(targetElement).insertAdjacentHTML('afterbegin', element());
}

for (const targetElement of componentList.keys()) {
    console.log(componentList);
    render(targetElement, componentList.get(targetElement));
}
