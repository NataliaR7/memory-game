import './gameTablePage.less';
import Cookies from 'js-cookie';

function getGameTablePage() {
    let level = 'levelOne';
    switch (Cookies.get('CurrentLevel')) {
        case '1':
            level = 'levelOne';
            break;
        case '2':
            level = 'levelTwo';
            break;
        case '3':
            level = 'levelThree';
            break;
    }
    return `<div id="gameTable">
    <div id="leaderboard" class="leaderboard"></div>
    <div id="statusBar" class="statusBar"></div>
    <div id="gameField" class="${level}"></div> 
</div>`;
}

export default getGameTablePage;
