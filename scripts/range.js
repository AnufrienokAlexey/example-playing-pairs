//данный файл служит для отображения ползунков, с помощью которых игрок выбирает количество строк и столбцов игры

const range = document.createElement('input');
range.setAttribute('type', 'range');
range.setAttribute('min', '2');
range.setAttribute('max', '10');
range.setAttribute('step', '2');
range.setAttribute('onmousemove', 'rangeSlider(this.value)');
range.setAttribute('onChange', 'rangeSlider(this.value)');
range.classList.add('range');
document.body.append(range);

const rangeText = document.createElement('p');
rangeText.classList.add('rangeText');
document.body.append(rangeText);
range.value = 4;
rangeText.textContent = `Выберите количество строк: ${range.value}`;

const rangeColumn = document.createElement('input');
rangeColumn.setAttribute('type', 'range');
rangeColumn.setAttribute('min', '2');
rangeColumn.setAttribute('max', '10');
rangeColumn.setAttribute('step', '1');
rangeColumn.setAttribute('onmousemove', 'rangeSliderColumn(this.value)');
rangeColumn.setAttribute('onChange', 'rangeSliderColumn(this.value)');
rangeColumn.classList.add('range');
document.body.append(rangeColumn);

const rangeTextColumn = document.createElement('p');
rangeTextColumn.classList.add('rangeText');
document.body.append(rangeTextColumn);
rangeColumn.value = 4;
rangeTextColumn.textContent = `Выберите количество столбцов: ${rangeColumn.value}`;