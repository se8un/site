const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Массив для хранения капель дождя
let raindrops = [];

// Функция для создания новой капли
function createRaindrop() {
  raindrops.push({
    x: Math.random() * canvas.width, // случайная позиция по ширине
    y: 0, // начинает с верхней части экрана
    speed: Math.random() * 5 + 2, // случайная скорость падения
    length: 10,
    opacity: 0.2,
    // length: Math.random() * 20 + 10, // случайная длина капли
    // opacity: Math.random() * 0.5 + 0.2, // случайная прозрачность капли
  });
}

// Функция для анимации капель
function animateRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Создаем новые капли со временем
  if (raindrops.length < 100) {
    createRaindrop();
  }

  // Рисуем и обновляем каждую каплю
  raindrops.forEach((drop, index) => {
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x, drop.y + drop.length);
    ctx.strokeStyle = `rgba(173, 216, 230, ${drop.opacity})`; // Цвет капли
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Обновляем позицию капли
    drop.y += drop.speed;

    // Удаляем капли, которые вышли за нижний край экрана
    if (drop.y > canvas.height) {
      raindrops.splice(index, 1);
    }
  });

  requestAnimationFrame(animateRain);
}

// Запуск анимации
animateRain();

// Обновляем размер canvas при изменении размеров окна
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
