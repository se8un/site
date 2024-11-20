// металофон
const sounds = {
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

// пианино
const soundsLoop = {
  Digit1: new Audio('./sounds/pianino/zvuk-notyi-do-rastyanutyiy.wav'),
  Digit2: new Audio('./sounds/pianino/zvuk-notyi-re-rastyanutyiy.wav'),
  Digit3: new Audio('./sounds/pianino/zvuk-notyi-mi-rastyanutyiy.wav'),
  Digit4: new Audio('./sounds/pianino/zvuk-notyi-fa-rastyanutyiy.wav'),
  Digit5: new Audio('./sounds/pianino/zvuk-notyi-sol-rastyanutyiy.wav'),
  Digit6: new Audio('./sounds/pianino/zvuk-notyi-lya-rastyanutyiy.wav'),
  Digit7: new Audio('./sounds/pianino/zvuk-notyi-si-rastyanutyiy.wav'),
  Digit8: new Audio('./sounds/pianino/zvuk-notyi-do-vo-vtoroy-oktave-rastyanutyiy.wav'),
  Digit9: new Audio('./sounds/pianino/zvuk-notyi-do-rastyanutyiy.wav'),
  Digit0: new Audio('./sounds/pianino/zvuk-notyi-do-rastyanutyiy.wav'),
};

const soundsUtility = {
  Minus: new Audio('./sounds/pianino/zvuk-notyi-do-rastyanutyiy.wav'),
  Equal: new Audio('./sounds/pianino/zvuk-notyi-do-vo-vtoroy-oktave-rastyanutyiy.wav'),
};

// Переключатель для отслеживания состояния воспроизведения звука
const isPlaying = {};

// Устанавливаем preload="auto" для всех аудиофайлов
Object.values(sounds).forEach((audio) => (audio.preload = 'auto'));
Object.values(soundsLoop).forEach((audio) => (audio.preload = 'auto'));
Object.values(soundsUtility).forEach((audio) => (audio.preload = 'auto'));

// Установка цикличного воспроизведения для каждого звука
for (let music in soundsLoop) {
  soundsLoop[music].loop = true;
  isPlaying[music] = false;
}

function handlePlaySound(e) {
  // Берет `data-key` из элемента при клике или `code` при нажатии клавиши
  const key = e.code || e.target.dataset.key;
  let audio = null;
  const keyElement = document.querySelector(`.key[data-key="${key}"]`);

  if (key in sounds) {
    audio = sounds[key];
    stopSound();
    audio.play();
  }

  if (key in soundsLoop) {
    audio = soundsLoop[key];
    if (isPlaying[key]) {
      stopSound();
      isPlaying[key] = false;
    } else {
      audio.play();
      keyElement.classList.add('playing');
      keyElement.classList.add('playingMusic');
      isPlaying[key] = true;
    }
  }

  if (key in soundsUtility) {
    audio = soundsUtility[key];
    stopSound();
    audio.play();
    keyElement.classList.remove('playingMusic');
  }

  if (!audio || !keyElement) return;

  // Убираем класс 'playing' после окончания анимации
  setTimeout(() => keyElement.classList.remove('playing'), 100);

  function stopSound() {
    audio.pause();
    audio.currentTime = 0;
    keyElement.classList.add('playing');
    keyElement.classList.remove('playingMusic');
  }
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
