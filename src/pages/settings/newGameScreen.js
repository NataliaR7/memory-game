import './newGameScreenStyle.less';

function getNewGameScreen(params) {
    return `<form id="newGameForm" class="stylizedForm">
    <div class='container'>
    <label for="difficulty">Сложность:</label>
    <select id="difficulty">
        <option selected>Легко</option>
        <option>Нормально</option>
        <option>Тяжело</option>
    </select>
    <p>Выбор шаблона карточек:</p>
    <div>
        <input type="radio" name="cardTemplate" id="standart" value="cardSet1" checked="checked" />
        <label for="standart">Милые</label>
    </div>
    <div>
        <input type="radio" name="cardTemplate" id="cute" value="cardSet2" />
        <label for="cute">Котэ</label>
    </div>
    <div>
        <input type="radio" name="cardTemplate" id="gradient" value="cardSet3" />
        <label for="gradient">Градиент</label>
    </div>
    <button type="button" class="submitButton">Начать новую игру</button>
</form>
</div>`
}

export default getNewGameScreen