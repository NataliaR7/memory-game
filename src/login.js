import './loginStyle.less';

function getLoginForm(params) {
    return `<form action="" method="post" class ="stylizedForm" id="loginForm">
    <div class="container">
        <label for="userName">Введите ваше имя пользователя</label>
        <input type="text" class="nameInput" name="" id="userName" />
        <input class="submitButton" type="button" value="Войти" />
    </div>
</form>`
}

export default getLoginForm