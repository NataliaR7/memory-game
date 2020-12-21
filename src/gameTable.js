import './style.less';
function getGameTable(params) {
    return `<div id="gameTable">
    <div id="leaderboard"></div>
    <div id="statusBar"></div>
    <div id="gameField" class="levelOne"></div> 
</div>`
}

export default getGameTable