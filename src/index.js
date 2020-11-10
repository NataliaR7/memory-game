import style from './style.css';
import StatusBar from './components/js/statusBar';

function render(targetElemnt, element) {
  document
    .querySelector(targetElemnt)
    .insertAdjacentHTML('afterbegin', element());
}

render('#statusBar', StatusBar);
