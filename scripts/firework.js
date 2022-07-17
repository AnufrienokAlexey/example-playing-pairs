//данный файл служит для отображения анимации фейерверка после выигрыша в игре

const FIREWORK_COUNT = 10;//количество фейерверков
const FIREWORK_FIRE_COUNT = 40;//количество огней в фейерверке

const wrap = document.createElement('div');
wrap.classList.add('wrap');
wrap.classList.add('display-none');
document.body.append(wrap);

for (i = 0; i < FIREWORK_COUNT; i++) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    wrap.append(firework);
    for (j = 0; j < FIREWORK_FIRE_COUNT; j++) {
        const c = document.createElement('div');
        c.classList.add('c');
        firework.append(c);
    }
}