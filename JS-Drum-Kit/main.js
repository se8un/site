// счетчик
const countElement = document.querySelector('#count');
let counter = 0;

const matalofon = {
  KeyQ: new Audio('./sounds/metalofon/zvuk-notyi-do.wav'),
  KeyW: new Audio('./sounds/metalofon/zvuk-notyi-re.wav'),
  KeyE: new Audio('./sounds/metalofon/zvuk-notyi-mi.wav'),
  KeyA: new Audio('./sounds/metalofon/zvuk-notyi-fa.wav'),
  KeyS: new Audio('./sounds/metalofon/zvuk-notyi-sol.wav'),
  KeyD: new Audio('./sounds/metalofon/zvuk-notyi-lya.wav'),
  KeyZ: new Audio('./sounds/metalofon/zvuk-notyi-si.wav'),
  KeyX: new Audio('./sounds/metalofon/zvuk-notyi-do-vo-vtoroy-oktave.wav'),
  KeyC: new Audio('./sounds//metalofon/zvuk-notyi-do.wav'),
};

const pianino = {
  KeyQ: new Audio('./sounds/pianino/zvuk-notyi-do-rastyanutyiy.wav'),
  KeyW: new Audio('./sounds/pianino/zvuk-notyi-re-rastyanutyiy.wav'),
  KeyE: new Audio('./sounds/pianino/zvuk-notyi-mi-rastyanutyiy.wav'),
  KeyA: new Audio('./sounds/pianino/zvuk-notyi-fa-rastyanutyiy.wav'),
  KeyS: new Audio('./sounds/pianino/zvuk-notyi-sol-rastyanutyiy.wav'),
  KeyD: new Audio('./sounds/pianino/zvuk-notyi-lya-rastyanutyiy.wav'),
  KeyZ: new Audio('./sounds/pianino/zvuk-notyi-si-rastyanutyiy.wav'),
  KeyX: new Audio('./sounds/pianino/zvuk-notyi-do-vo-vtoroy-oktave-rastyanutyiy.wav'),
  KeyC: new Audio('./sounds/pianino/zvuk-notyi-do-rastyanutyiy.wav'),
};

const musics = {
  Digit1: new Audio('./sounds/melody/1.wav'),
  Digit2: new Audio('./sounds/melody/2.wav'),
  Digit3: new Audio('./sounds/melody/3.wav'),
  Digit4: new Audio('./sounds/melody/4.wav'),
  Digit5: new Audio('./sounds/melody/5.wav'),

  Digit6: new Audio('./sounds/melody/1.wav'),
  Digit7: new Audio('./sounds/melody/1.wav'),
  Digit8: new Audio('./sounds/melody/1.wav'),
};

let sounds = matalofon;

// Переключатель для отслеживания состояния воспроизведения звука
const isPlaying = {};

// Устанавливаем preload="auto" для всех аудиофайлов
Object.values(sounds).forEach((audio) => (audio.preload = 'auto'));
Object.values(musics).forEach((audio) => (audio.preload = 'auto'));

setLoop(musics);

function handlePlaySound(e) {
  // Берет `data-key` из элемента при клике или `code` при нажатии клавиши
  const key = e.code || e.target.dataset.key;
  let audio = null;
  const keyElement = document.querySelector(`.key[data-key="${key}"]`);

  if (key in sounds) {
    audio = sounds[key];
    stopSound(audio, keyElement);
    audio.play();

    counter++;
    countElement.innerText = counter;
    getRandomColor(countElement);
    getRandomColor(keyElement);
  }

  if (key in musics) {
    audio = musics[key];
    stopSound(audio, keyElement);
    if (isPlaying[key]) {
      isPlaying[key] = false;
    } else {
      audio.play();
      keyElement.classList.add('playing');
      keyElement.classList.add('invertColorPicture');
      isPlaying[key] = true;
    }
  }

  // Instruments
  if (key === 'Instruments') {
    if (sounds === matalofon) {
      sounds = pianino;
      keyElement.classList.add('changePianino');
    } else {
      sounds = matalofon;
      keyElement.classList.remove('changePianino');
    }
  }

  if (!audio || !keyElement) return;

  // Убираем класс 'playing' после окончания анимации
  setTimeout(() => keyElement.classList.remove('playing'), 100);
}

// Обработчики для нажатия клавиши и клике мыши
window.addEventListener('keydown', handlePlaySound);
window.addEventListener('click', handlePlaySound);

// Обработчик для окончания анимации
const keys = document.querySelectorAll('.key');
keys.forEach((key) =>
  key.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform') {
      key.classList.remove('playing');
    }
  })
);

// Установка цикличного воспроизведения для каждого звука
function setLoop(objSounds) {
  for (let sound in objSounds) {
    objSounds[sound].loop = true;
    isPlaying[sound] = false;
  }
}

// Остановка звука
function stopSound(audio, keyElement) {
  audio.pause();
  audio.currentTime = 0;
  keyElement.classList.add('playing');
  keyElement.classList.remove('invertColorPicture');
}

// Случайный цвет
function getRandomColor(element) {
  element.style.setProperty('--random-color-r', Math.max(64, Math.floor(Math.random() * 192) + 64));
  element.style.setProperty('--random-color-g', Math.max(64, Math.floor(Math.random() * 192) + 64));
  element.style.setProperty('--random-color-b', Math.max(64, Math.floor(Math.random() * 192) + 64));
}

// Показать модальное окно при загрузке
window.onload = function () {
  document.querySelector('#modal-title').innerText = '🔥 🙃 🎵 🎼 🦁';
  document.querySelector('#modal-description').innerText = `
  QWE  ASD ZXC - для воспроизведения звуков\n
  1 2 3 4 5 6 7 8 - для выбора музыки\n
  Справа вверху есть счетчик нажатий клавиш\n
  Внизу кнопка металофон/пианино\n
  Главное, не забывай пританцовывать!`;
  document.querySelector('#modal').style.display = 'flex'; // Показываем окно
};

// Закрыть модальное окно
function closeModal() {
  const modal = document.querySelector('#modal');
  modal.style.display = 'none';
}

// добавляем в sessionStorage, чтобы не показывать модальное окно повторно
if (!sessionStorage.getItem('modalShown')) {
  modal.style.display = 'flex';
  sessionStorage.setItem('modalShown', 'true');
}
