import './newGameScreenStyle.less';

function getNewGameScreen(params) {
    return `<form id="newGameForm" class="stylizedForm">
    <div class='container'>
    <label for="difficulty">Сложность:</label>
    <select id="difficulty">
        <option selected>Легкая</option>
        <option>Средняя</option>
        <option>Тяжелая</option>
    </select>
    <p>Выбор шаблона карточек:</p>
    <div>
        <input type="radio" name="cardTemplate" id="standart" selected value="Standart" />
        <label for="standart">Стандартный</label>
    </div>
    <div>
        <input type="radio" name="cardTemplate" id="cute" value="Cute" />
        <label for="cute">Милый</label>
    </div>
    <div>
        <input type="radio" name="cardTemplate" id="gradient" value="Gradient" />
        <label for="gradient">Градиентный</label>
    </div>
    <button type="button" class="submitButton">Начать новую игру</button>
</form>
</div>`
}

export default getNewGameScreen