import './style.less';
import StatusBar from './components/statusBar/statusBar';
import Leaderboard from './components/leaderboard/leaderboard';
import GameField from './components/gameField/gamefield';
import Card from './components/card/card';

const componentList = new Map([
    ['#statusBar', StatusBar],
    ['#leaderboard', Leaderboard],
    // ['#gameField', GameField],
    ['#card', Card],
]);

function render(targetElement, element) {
    console.log(targetElement);
    document.querySelector(targetElement).insertAdjacentHTML('afterbegin', element());
}

for (const targetElement of componentList.keys()) {
    console.log(componentList);
    render(targetElement, componentList.get(targetElement));
}
