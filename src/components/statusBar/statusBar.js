export default function statusBar() {
    return `${getLevelComponent()}<div class='playerInfo'>${getNickNameComponent()}${getScoreComponent()}</div>${getRestartButtonComponent()}`;
}

function getLevelComponent(params) {
    return '<div id="gameLevel" class="gameLevel">Уровень 1</div>';
}

function getNickNameComponent(params) {
    return '<div id="playerName" class="playerName">User</div>';
}

function getScoreComponent(params) {
    return '<div class=score>0</div>';
}

function getRestartButtonComponent(params) {
    return `<div id="modalMenuButton"><svg class="restartIcon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width = 5px 
    viewBox="0 0 574.058 574.058" style="enable-background:new 0 0 574.058 574.058;" xml:space="preserve">
    <path style="fill:#434343;" d="M567.63,274.176c0,4.08-1.631,7.344-4.895,9.792c-3.672,2.448-7.549,3.06-11.629,1.836
    l-205.633-70.38c-4.896-1.632-7.754-4.896-8.566-9.792c-0.816-4.896,0.813-8.772,4.895-11.628l48.352-34.272l7.955-6.12
    c-14.279-11.424-30.293-20.298-48.041-26.622c-17.748-6.324-36.619-9.486-56.611-9.486c-23.255,0-45.186,4.488-65.79,13.464
    s-38.556,21.114-53.856,36.414c-15.3,15.3-27.438,33.252-36.414,53.856s-13.464,42.534-13.464,65.79
    c0,23.255,4.488,45.185,13.464,65.791c8.976,20.604,21.114,38.555,36.414,53.854c15.3,15.303,33.252,27.439,53.856,36.414
    c20.604,8.979,42.534,13.467,65.79,13.467c28.561,0,55.285-6.529,80.172-19.586c24.889-13.057,45.084-31.416,60.588-55.078
    c2.449-3.676,5.814-5.916,10.102-6.732c4.281-0.814,8.057,0,11.318,2.447l72.219,50.184c2.854,1.633,4.689,4.693,5.508,9.184
    c1.225,3.264,0.611,6.729-1.836,10.4c-13.465,19.992-28.969,37.842-46.514,53.551c-17.545,15.707-36.516,28.971-56.916,39.779
    c-20.398,10.813-42.021,19.074-64.871,24.787c-22.85,5.711-46.104,8.568-69.77,8.568c-39.575,0-76.805-7.551-111.689-22.646
    c-34.884-15.096-65.28-35.598-91.188-61.506s-46.41-56.305-61.506-91.189C13.976,363.834,6.428,326.604,6.428,287.028
    s7.548-76.806,22.644-111.69s35.598-65.28,61.506-91.188s56.304-46.41,91.188-61.506C216.65,7.548,253.88,0,293.455,0
    c39.576,0,76.602,7.548,111.078,22.644c34.477,15.096,64.77,35.7,90.883,61.812l3.672-3.06l48.35-34.272
    c3.672-2.856,7.953-3.264,12.852-1.224c4.488,2.856,6.732,6.528,6.732,11.016L567.63,274.176z"/>
    </svg>
    <div id="optionModal" class="modal">
    <div class ="stylizedModalForm modal_content">
    <div class="rightFlex"><span class="close_modal_window">×</span></div>
    <div class="container">
        <input class="submitButton" type="button" id="restartButton" value="Рестарт" />
        <input class="submitButton" type="button" id="settingsButton" value="Настройки" />
        <input class="submitButton" type="button" id="exitButton" value="Выйти" />
    </div>
</div>
    </div>
    </div>`;
}
