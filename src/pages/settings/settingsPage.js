import './settingsPage.less';

function getSettingsPage() {
    return `<form id="settingsForm" class="stylizedForm">
    <div class='contentContainer'>
    <label for="difficulty">Сложность:</label>
    <select class="settingsFormSelect" id="difficulty">
        <option selected>Легко</option>
        <option>Нормально</option>
        <option>Тяжело</option>
    </select>
    <p>Шаблоны карточек:</p>
    <div class="templateContainer">
    <label class="pointerContainer">
        <input type="radio" name="cardTemplate" id="standart" value="cardSet1" checked="checked" />
        <img src="../img/cardTemplateLogo/set1.png">
    </label>
    <label class="pointerContainer">
        <input type="radio" name="cardTemplate" id="cute" value="cardSet2" />
        <img src="../img/cardTemplateLogo/set2.png">
    </label>
    <label class="pointerContainer">
        <input type="radio" name="cardTemplate" id="gradient" value="cardSet3" />
        <img src="../img/cardTemplateLogo/set3.png">
    </label>
    </div>
    <button type="button" class="submitButton">Начать</button>
</form>
</div>`
}

export default getSettingsPage