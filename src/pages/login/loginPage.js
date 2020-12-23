import './loginPage.less';

function getLoginForm() {
    return `<form action="" method="post" class ="stylizedForm" id="loginForm">
    <div class="container">
        <label for="userNameInput">Введите ваше имя</label>
        <input type="text" class="nameInput" name="" id="userNameInput" />
        <div class="remoteButtonsContainer">
        <input class="submitButton" id="enterLoginButton" type="button" value="Войти" />
        <input class="submitButton" id="createUserButton" type="button" value="Создать нового игрока" />
        </div>
    </div>
</form>`
}

export default getLoginForm