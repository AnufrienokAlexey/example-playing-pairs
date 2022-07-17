const TIME_OUT = 60;//время продолжительности игры в секундах
let cardArray = [];//массив для хранения значений карт
let arrCard = [];//массив карт
let arrTextContent = [];//массив для сравнения значений карт первого и второго клика игроком
let countCards = 0;//значение количества карт

//блок создания контейнера игры
const container = document.createElement('div');
container.classList.add('container');
document.body.append(container);

//блок создания кнопки старта игры
const startButton = document.createElement('button');
startButton.classList.add('startbutton');
startButton.textContent = 'Начать игру';
document.body.append(startButton);
startButton.addEventListener('click', startGame);

//функция создания игрового поля из карт по умолчанию (размером 4 на 4)
function createDefaultArray() {
    cardArray = create2DArray(4);
    for (i = 0; i < cardArray.length; i++) {
        cardArray[i] = [1, 2, 3, 4];
    }
    createCard();
}

//функция создания двухмерных массивов длиной rows
function create2DArray(rows) {
    let arr = [];
    for (i = 0; i < rows; i++) {
        arr[i] = [];         
    }
    return arr;
}

//функция изменения массива cardArray после изменения значения количества строк, взятых с ползунка
function rangeSlider(value) {
    range.innerHTML = value;
    range.value = value;
    rangeText.textContent = `Выберите количество строк: ${range.value}`;
    cardArray = create2DArray(range.value);
    for (i = 0; i < range.value; i++) {
        for (j = 0; j < rangeColumn.value; j++) {
            cardArray[i][j] = j + 1;
        }
    }
    return cardArray;
}

//функция изменения массива cardArray после изменения значения количества столбцов, взятых с ползунка
function rangeSliderColumn(value) {
    rangeColumn.innerHTML = value;
    rangeColumn.value = value;
    rangeTextColumn.textContent = `Выберите количество столбцов: ${rangeColumn.value}`;
    cardArray = create2DArray(range.value);
    for (i = 0; i < range.value; i++) {
        for (j = 0; j < rangeColumn.value; j++) {
            cardArray[i][j] = j + 1;
        }
    }
    return cardArray;
}

//функция перемешивания значений массива по алгоритму фишера-йетса
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        for (let k = array[i].length - 1; k > 0; k--) {
            let m = Math.floor(Math.random() * (k + 1));
            [array[i][k], array[i][m]] = [array[i][m], array[i][k]];
        }
    }
}

//функция запуска игры
function startGame() {
    wrap.classList.add('display-none');
    range.removeAttribute('onmousemove');
    range.removeAttribute('onChange');
    rangeColumn.removeAttribute('onmousemove');
    rangeColumn.removeAttribute('onChange');
    if (cardArray.length == 0) {
        createDefaultArray();
    } else {
        createCard();
    }
    cardEvents();
}

//функция создания карт
function createCard() {
    const countSort = 10;
    for (let i = 0; i < countSort; i++) {
        shuffle(cardArray);
    }    
    for (i in cardArray) {        
        const containerRow = document.createElement('div');
        containerRow.classList.add('container-row');
        container.append(containerRow);        
        for (j in cardArray[i]) {
            const card = document.createElement('div');
            const span = document.createElement('display-none');
            card.classList.add('card');
            span.classList.add('display-none');
            span.textContent = `${cardArray[i][j]}`;
            containerRow.append(card);
            card.append(span);            
        }
    }
}

//функция событий карт
const cardEvents = () => {
    let timeout;//переменнная для таймера
    let timeLeft;//переменная для остатка времени в таймере
    let timePassed = 0;//переменная на которую таймер будет увеличиваться (по умолчанию — 1 секунда)
    let cards = document.querySelectorAll('.card');//выбираем все карты в игровом поле

    startButton.classList.remove('retry');
    startButton.removeEventListener('click', startGame);

    //отсчет времени после начала игры
    timeout = setInterval(() => {
        timePassed++;
        timeLeft = TIME_OUT - timePassed;
        startButton.textContent = timeLeft;
        startButton.textContent = `До окончания игры осталось: ${timeLeft} секунд`;

        //блок проигрыша игроком, если время вышло
        if (timeLeft == 0) {
            clearInterval(timeout);
            startButton.textContent = 'Вы програли';
            startButton.classList.add('retry');
            startButton.addEventListener('click', startGame);
            range.setAttribute('onmousemove', 'rangeSlider(this.value)');
            range.setAttribute('onChange', 'rangeSlider(this.value)');
            rangeColumn.setAttribute('onmousemove', 'rangeSliderColumn(this.value)');
            rangeColumn.setAttribute('onChange', 'rangeSliderColumn(this.value)');
            cards.forEach(item => {
                item.remove();
            })
        }
    }, 1000);

    //вешаем события клика на каждую карту
    cards.forEach(item => {
        item.addEventListener('click', clickOnCard);
        function clickOnCard() {
            if (item.classList == 'card') {
                arrCard.push(item);
                arrTextContent.push(item.textContent);
                item.classList.add('card-clicked');
                item.children[0].classList.remove('display-none');

                //блок отображения карт вверх значением, если есть совпадение значений первой и второй карты
                if ((arrTextContent[0] == arrTextContent[1]) && (arrTextContent.length == 2)) {
                    arrCard.forEach(itemArr => {
                        itemArr.removeEventListener('click', clickOnCard);
                    });
                    arrCard = [];
                    arrTextContent = [];
                    countCards = countCards + 2;
                }

                //блок отображения карт вверх значением, если нет совпадения значений первой и второй карты
                if (arrTextContent.length == 2) {
                    arrCard.forEach(itemArr => {
                        let timeout;
                        clearTimeout(timeout);
                        timeout = setTimeout(() => {
                            itemArr.classList.remove('card-clicked');
                            itemArr.children[0].classList.add('display-none');
                        }, 500);
                    })
                    arrCard = [];
                    arrTextContent = [];
                }

                //блок выхода из игры, если все карты открыты
                const cardArrayLenght = [].concat(...cardArray);
                if (countCards == cardArrayLenght.length && countCards > 0) {
                    wrap.classList.remove('display-none');
                    clearInterval(timeout);
                    startButton.textContent = 'Вы выиграли';
                    startButton.classList.add('retry');
                    startButton.addEventListener('click', startGame);
                    range.setAttribute('onmousemove', 'rangeSlider(this.value)');
                    range.setAttribute('onChange', 'rangeSlider(this.value)');
                    rangeColumn.setAttribute('onmousemove', 'rangeSliderColumn(this.value)');
                    rangeColumn.setAttribute('onChange', 'rangeSliderColumn(this.value)');
                    cards.forEach(item => {
                        item.remove();
                    });
                    countCards = 0;
                }
            } 
        }
    })
}
