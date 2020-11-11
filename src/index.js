import './style.less';
import StatusBar from './components/js/statusBar';
import Leaderboard from './components/leaderboard/leaderboard';

function render(targetElemnt, element) {
  document
    .querySelector(targetElemnt)
    .insertAdjacentHTML('afterbegin', element());
}

render('#statusBar', StatusBar);
render('#leaderboard', Leaderboard);

