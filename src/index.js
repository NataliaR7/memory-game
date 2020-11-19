import './style.less';
import StatusBar from './components/js/statusBar';
import Leaderboard from './components/leaderboard/leaderboard';
import Card from './components/card/card';

function render(targetElemnt, element) {
  document
    .querySelector(targetElemnt)
    .insertAdjacentHTML('afterbegin', element());
}

render('#statusBar', StatusBar);
render('#leaderboard', Leaderboard);
render('#card', Card);

