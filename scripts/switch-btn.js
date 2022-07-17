//данный файл служит для отображения кнопки-переключателя на темную и светлую тему оформления игры

const switchBtn = document.createElement('div');
switchBtn.classList.add('switch-btn');
document.body.append(switchBtn);

switchBtn.addEventListener('click', function () {
    if (!switchBtn.hasAttribute('.switch-on')) {
        switchBtn.classList.toggle('switch-on');
        document.body.classList.toggle('dark');
    }
})