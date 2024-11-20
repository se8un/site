// AudioContext в Web Audio API обеспечивает более точный контроль над звуками, так как он позволяет напрямую управлять временем их начала. Это улучшает отзывчивость.
const audioContext = new window.AudioContext();

// Объект для хранения аудиобуферов
const soundBuffers = {};

// Функция для загрузки аудиофайла и сохранения его в буфере
async function loadSound(key, url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  soundBuffers[key] = await audioContext.decodeAudioData(arrayBuffer);
}

// Загрузка всех звуков
async function loadAllSounds() {
  await loadSound('KeyQ', './sounds/1.wav');
  await loadSound('KeyW', './sounds/2.wav');
  await loadSound('KeyE', './sounds/3.wav');
  // остальные звуки...
}

// Воспроизведение звука из буфера
function playSound(key) {
  if (!soundBuffers[key]) return;
  const sound = audioContext.createBufferSource();
  sound.buffer = soundBuffers[key];
  sound.connect(audioContext.destination);
  sound.start();
}

// Инициализация звуков перед использованием
loadAllSounds();

// Обработчик событий для нажатия клавиш
window.addEventListener('keydown', (e) => {
  playSound(e.code);
});

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/ v2 _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

// // Создаем контекст аудио
// const audioContext = new AudioContext();

// // Функция для предварительной декодировки аудио данных
// function decodeAudio(url) {
//   return fetch(url)
//     .then((response) => response.arrayBuffer())
//     .then((buffer) => audioContext.decodeAudioData(buffer));
// }

// // Предварительная декодировка всех звуков
// const sounds = {
//   KeyQ: { url: './sounds/pianino/zvuk-notyi-do-rastyanutyiy.wav' },
//   KeyW: { url: './sounds/pianino/zvuk-notyi-re-rastyanutyiy.wav' },
//   KeyE: { url: './sounds/pianino/zvuk-notyi-mi-rastyanutyiy.wav' },
//   KeyA: { url: './sounds/pianino/zvuk-notyi-fa-rastyanutyiy.wav' },
//   KeyS: { url: './sounds/pianino/zvuk-notyi-sol-rastyanutyiy.wav' },
//   KeyD: { url: './sounds/pianino/zvuk-notyi-lya-rastyanutyiy.wav' },
//   KeyZ: { url: './sounds/pianino/zvuk-notyi-si-rastyanutyiy.wav' },
//   KeyX: { url: './sounds/pianino/zvuk-notyi-do-vo-vtoroy-oktave-rastyanutyiy.wav' },
//   KeyC: { url: './sounds/pianino/zvuk-notyi-do-rastyanutyiy.wav' },
// };

// const soundsLoop = {
//   Digit1: { url: './sounds/melody/under-a-blood-moon.wav' },
//   Digit2: { url: './sounds/melody/city-lights.wav' },
//   Digit3: { url: './sounds/melody/echoes-of-eternity.wav' },
//   Digit4: { url: './sounds/melody/echos-of-the-steppe.wav' },
//   Digit5: { url: './sounds/melody/floating-above.wav' },
//   Digit6: { url: './sounds/melody/moonlit-waters.wav' },
//   Digit7: { url: './sounds/melody/whispers-of-the-sakura.wav' },
//   Digit8: { url: './sounds/melody/gitara-bass-slep.wav' },
//   Digit9: { url: './sounds/melody/bass-gitara-myagkiy.wav' },
//   Digit0: { url: './sounds/melody/shake-the-city.wav' },
// };

// const soundsUtility = {
//   Minus: { url: './sounds/skratch/skratch-1.wav' },
//   Equal: { url: './sounds/skratch/skratch-4.wav' },
// };

// let decodedSounds = {};
// Object.entries(sounds).forEach(([key, sound]) => {
//   decodedSounds[key] = decodeAudio(sound.url);
// });

// Object.entries(soundsLoop).forEach(([key, sound]) => {
//   decodedSounds[key] = decodeAudio(sound.url);
// });

// Object.entries(soundsUtility).forEach(([key, sound]) => {
//   decodedSounds[key] = decodeAudio(sound.url);
// });

// class SoundPlayer {
//   constructor() {
//     this.audioContext = new AudioContext();
//     this.sourceNodes = [];
//   }

//   playSound(key) {
//     const buffer = decodedSounds[key];

//     if (!(buffer instanceof AudioBuffer)) {
//       console.error(`Звук для ключа ${key} не был правильно декодирован`);
//       return;
//     }

//     const source = this.audioContext.createBufferSource();
//     source.buffer = buffer;
//     source.connect(this.audioContext.destination);

//     this.sourceNodes.push(source);
//     source.start();

//     source.onended = () => {
//       const index = this.sourceNodes.indexOf(source);
//       if (index !== -1) {
//         this.sourceNodes.splice(index, 1);
//       }
//     };
//   }

//   stopAllSounds() {
//     this.sourceNodes.forEach((node) => node.stop());
//     this.sourceNodes.length = 0;
//   }
// }

// const soundPlayer = new SoundPlayer();

// // Переключатель для отслеживания состояния воспроизведения звука
// const isPlaying = {};

// // Устанавливаем цикличное воспроизведение для каждого звука в soundsLoop
// for (let music in soundsLoop) {
//   isPlaying[music] = false;
// }

// // Функция для создания кнопок клавиатуры
// function createKeyboardButtons() {
//   const keyboard = document.querySelector('.keyboard');
//   const keys = [
//     { key: 'KeyQ', text: 'DO' },
//     { key: 'KeyW', text: 'RE' },
//     { key: 'KeyE', text: 'MI' },
//     { key: 'KeyA', text: 'FA' },
//     { key: 'KeyS', text: 'SOL' },
//     { key: 'KeyD', text: 'LYA' },
//     { key: 'KeyZ', text: 'SI' },
//     { key: 'KeyX', text: 'DO' },
//     { key: 'KeyC', text: 'DO' },
//     { key: 'Digit1', text: '1' },
//     { key: 'Digit2', text: '2' },
//     { key: 'Digit3', text: '3' },
//     { key: 'Digit4', text: '4' },
//     { key: 'Digit5', text: '5' },
//     { key: 'Digit6', text: '6' },
//     { key: 'Digit7', text: '7' },
//     { key: 'Digit8', text: '8' },
//     { key: 'Digit9', text: '9' },
//     { key: 'Digit0', text: '0' },
//     { key: 'Minus', text: '-' },
//     { key: 'Equal', text: '=' },
//   ];

//   keys.forEach(({ key, text }) => {
//     const button = document.createElement('div');
//     button.className = 'key';
//     button.dataset.key = key;
//     button.textContent = text;
//     keyboard.appendChild(button);
//   });
// }

// // Обработчик событий с использованием делегирования
// document.body.addEventListener('click', handlePlaySound);
// window.addEventListener('keydown', handlePlaySound);

// function handlePlaySound(e) {
//   const key = e.code || e.target.dataset.key;
//   const keyElement = document.querySelector(`.key[data-key="${key}"]`);

//   if (!keyElement) return;

//   if (key in sounds) {
//     soundPlayer.stopAllSounds();
//     soundPlayer.playSound(key);
//   }

//   if (key in soundsLoop) {
//     if (isPlaying[key]) {
//       soundPlayer.stopAllSounds();
//       isPlaying[key] = false;
//     } else {
//       soundPlayer.playSound(key);
//       keyElement.classList.add('playing');
//       keyElement.classList.add('playingMusic');
//       isPlaying[key] = true;
//     }
//   }

//   if (key in soundsUtility) {
//     soundPlayer.stopAllSounds();
//     soundPlayer.playSound(key);
//     keyElement.classList.remove('playingMusic');
//   }

//   // Убираем класс 'playing' после окончания анимации
//   setTimeout(() => keyElement.classList.remove('playing'), 100);
// }

// // Обработчик для окончания анимации
// const keys = document.querySelectorAll('.key');
// keys.forEach((key) =>
//   key.addEventListener('transitionend', (e) => {
//     if (e.propertyName === 'transform') {
//       key.classList.remove('playing');
//     }
//   })
// );

// // Функция для декодировки всех звуков и запуска приложения
// async function initApp() {
//   try {
//     await Promise.all(Object.values(decodedSounds));
//     console.log('Все звуки успешно декодированы');

//     // Создаем кнопки клавиатуры
//     createKeyboardButtons();
//   } catch (error) {
//     console.error('Ошибка при декодировании звуков:', error);
//   }
// }

// initApp();
